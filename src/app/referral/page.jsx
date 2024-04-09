"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import retrieveReferralData from "../../../lib/backend/referral/retrieveReferralData";
import ReferralList from "./components/referralList";
import { getMessages, getMessagesAndSubscribe } from "../../../lib/backend/referral/referralMessages";

export default function Referral() {
	const router = useRouter();
	const [otp, setOtp] = React.useState(null);
	const [showOTP, setShowOTP] = React.useState(false);
	const [otpInput, setOTPInput] = React.useState("");
	const user = currentUser.getState().user;

	const [changeUser, setChangeUser] = React.useState(false);
	const [newMessage, setNewMessage] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [chatId, setChatId] = React.useState("");
	const [chats, setChats] = React.useState([{ id: "", doctor: "", doctor_full_name: "" }]);
	const [messageInfo, setMessageInfo] = React.useState({
		messages: [
			{
				message: "No Messages Yet",
				created_at: "2024-03-17T09:20:29.080437+00:00",
				message_status: "received",
			},
		],
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const message = formData.get("message");
		console.log(message);
		setMessage("");
		if (chatId) {
			getMessages.insertMessage(chatId, message, "sent");
		}
	};

	const [currentInfo, setCurrentInfo] = React.useState({});

	const [referralsList, setList] = React.useState([]);

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleInserts = (payload) => {
		setNewMessage(!newMessage);
	};

	getMessagesAndSubscribe(handleInserts);

	React.useEffect(() => {
		const importMessage = async () => {
			const chatList = await getMessages.getChats();
			console.log(chatList);
			setChats(chatList);
			setChatId(chatList[0]?.id || ""); // Set the initial patient ID
		};

		importMessage();
	}, [newMessage]);

	React.useEffect(() => {
		const importMessage = async () => {
			const chatList = await getMessages.getChats();
			console.log(chatList);
			setChats(chatList);
			setChatId(chatList[0]?.id || "");

			if (chatList[0]?.id) {
				const messages = await getMessages.getMessage(chatList[0]?.id);
				// update to read
				await getMessages.updateRead(chatList[0]?.id, "received", "read");
				console.log(messages);

				console.log("set");
				console.log(messageInfo);
				setMessageInfo(messages);
			} // Set the initial patient ID
		};

		importMessage();
	}, []);

	React.useEffect(() => {
		console.log(chatId);
		const importMessage = async () => {
			const messages = await getMessages.getMessage(chatId);
			// update to read
			await getMessages.updateRead(chatId, "received", "read");
			console.log(messages);

			console.log("set");
			console.log(messageInfo);
			setMessageInfo(messages);
		};

		importMessage();
	}, [changeUser, newMessage]);

	function getUser(chatId) {
		setChatId(chatId);
		setChangeUser(!changeUser);
	}

	const handleApproval = async (value, id) => {
		const response = await fetch(
			(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") +
				"/updateRequestStatus",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
					status: value,
					patient_id: currentInfo.patient_id,
				}),
			}
		);

		console.log(response);
	};

	const generateRequest = async () => {
		const response = await fetch(
			(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") + "/requestApproval",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					api_key: "6d5d2d80-b0c7-4e3a-8622-65813c693d96",
					requested_from: `${currentInfo.email}`,
					patient_id: currentInfo.patient_id,
				}),
			}
		);
		const r = await response.json();
		console.log(r);
		return r[0].id;
	};

	const generateOTP = () => {
		return Math.floor(1000 + Math.random() * 9000);
	};

	const handlePullRecords = async () => {
		setShowOTP(true);
	};

	const handleOTPSubmit = async (status) => {
		if (parseInt(otpInput) === otp) {
			const requ = await generateRequest();
			console.log("requ");
			console.log(requ);

			handleApproval(status, requ);
			toast.success("OTP Verified", {
				position: "top-left",
				theme: "colored",
				autoClose: 2000,
			});
		} else {
			toast.error("Invalid OTP. Please try again.", {
				position: "top-left",
				theme: "colored",
				autoClose: 2000,
			});
			// prompt("Invalid OTP. Please try again.");
		}
		//  add logic to verify the OTP
		// just closes the OTP pop-up for now
		setShowOTP(false);
	};

	React.useEffect(() => {
		setOtp(generateOTP());
	}, []);

	React.useEffect(() => {
		console.log(otp);
	}, [otp]);
	React.useEffect(() => {
		console.log(otpInput);
	}, [otpInput]);

	React.useEffect(() => {
		const fetchData = async () => {
			const referrals = await retrieveReferralData.getReferrals();
			console.log(referrals);
			setList(referrals);
			setCurrentInfo(referrals[0]);
		};
		fetchData();
	}, []);

	React.useEffect(() => {
		console.log(referralsList);
	}, [referralsList]);

	const sendOTP = () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "App 1c555aeb51d4f3953c1d244e01d6c279-2d95a385-8a6c-46b5-825a-c69929c14808");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		console.log(otp);
		const raw = JSON.stringify({
			messages: [
				{
					destinations: [{ to: `639999951973` }], // replace with patient data
					from: "ServiceSMS",
					text: `Hello! Your OTP is  ${otp}
					
					By providing this pin to your healthcare provider, you are authorizing EndoTracker and [NAME OF DOCTOR], to access your health information, particularly the following:

					- SAMPLE DATA PULL 1
					- SAMPLE DATA PULL 2
					
					EndoTracker respects the privacy of personal data, and are committed to handling your personal data with care. It is your right to be informed of how EndoTracker collects your data, including the purposes of how we collect, use, and disclose. 
					
					For more information on how EndoTracker handles and makes use of your data, please refer to the Privacy Policy full text which can be found in the system https://capstone-cap2224.vercel.app/legal/privacy_policy.`,
				},
			],
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("https://y36nrg.api.infobip.com/sms/2/text/advanced", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.then(() => {
				toast.success(
					`OTP Requested. Kindly Wait for the message on the patient's number, +639999951973`, // replace wth patient data
					{ position: "top-left", theme: "colored", autoClose: 2000 }
				);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="bg-white h-screen flex">
			<div className="flex flex-col ml-5 w-full max-w-screen-xl mx-auto">
				<div className="flex gap-5 justify-between px-5 md:px-14 py-9 w-full">
					<div className="text-xl font-semibold text-black">Referral</div>
					<div className="flex gap-3.5 justify-between text-xs">
						<div className="flex gap-2 border-gray-300 border-[1px] rounded-lg">
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
								className="aspect-square fill-stone-300 w-[13px] ml-4"
							/>
							<input type="text" placeholder="Search..." />
						</div>
						<button
							onClick={() => {
								router.push("referral/send_referral");
							}}
							className="text-white text-xs font-semibold bg-sky-900 px-4 py-1.5 rounded mr-2"
						>
							Refer a Patient
						</button>
						<button
							onClick={() => {
								router.push("referral/write_referral");
							}}
							className="text-black text-xs font-semibold bg-[#98c3ff] px-4 py-1.5 rounded mr-2"
						>
							Write a Referral
						</button>
					</div>
				</div>

				<div className="flex">
					{/* Left side tabs */}
					<div className="flex flex-col w-1/2 max-w-[50%] md:w-full px-5 mt-9">
						{referralsList.map((referral) => {
							return (
								<div
									key={referral.id}
									onClick={() => {
										getUser(referral.chat_id);
										console.log(referral);
									}}
								>
									<ReferralList
										setCurrentInfo={setCurrentInfo}
										referral={referral}
										retrieveReferralData={retrieveReferralData}
									/>
								</div>
							);
						})}

						{/* Another left side tab with bg-orange-500 */}
					</div>

					{/* Right side tabs */}
					<div className="flex flex-col w-1/2 max-w-[50%] md:order-last px-5">
						<div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
							<div className="pt-12 pr-20 pb-5 pl-6 bg-white shadow-sm max-md:px-5 max-md:max-w-full">
								<div className="flex max-md">
									<div className="flex flex-col">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/39731ee2758b1eb02660dc6f2d0e828ff80ed03d23c48b7c7070fb88d8da4492?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
											className="mt-4 aspect-square w-[43px]"
										/>
									</div>
									<div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
										<div className="mt-2 text-lg font-semibold text-black">
											{currentInfo?.name ? currentInfo.name : ""}

											<div className="mr-5 text-m text-zinc-600">
												<span className="text-black font-medium">{currentInfo?.specialty ?? ""}</span>
											</div>
											<div className="text-m text-zinc-600">
												<span className="text-black text-sm">PATIENT: {currentInfo?.patient ?? ""}</span>
											</div>
											<div className="text-xs text-zinc-600">
												<span className="text-black text-sm">
													Referral Note: <span className="font-normal">{currentInfo?.notes ?? ""}</span>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							{currentInfo?.name && (
								<>
									<div className="bg-stone-50 self-center flex w-full max-w-full flex-col-reverse items-stretch pt-6 pb-12 max-md:max-w-full max-h-80 h-80 px-7 overflow-y-auto gap-3">
										{/* Start Message */}
										{messageInfo.messages_referral &&
											messageInfo.messages_referral?.map((item, index) => {
												if (item.message_status === "received" || item.message_status === "read") {
													return (
														<div
															key={index}
															className="flex gap-4 items-start max-md:max-w-full max-md:flex-wrap max-w-[50%]"
														>
															<Image
																alt="picture"
																height={0}
																width={0}
																loading="lazy"
																src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
																className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
															/>
															<span className="text-zinc-600 text-xs font-medium leading-5 shadow-sm bg-white self-stretch justify-center items-stretch px-5 py-4 rounded">
																{item.message}
															</span>
														</div>
													);
												} else if (item.message_status === "sent" || item.message_status === "seen") {
													return (
														<div
															key={index}
															className="flex gap-4 justify-end items-start max-md:max-w-full max-md:flex-wrap self-end max-w-[50%]"
														>
															<span className="text-white text-xs font-medium leading-5 shadow-sm bg-blue-500 self-stretch justify-center items-stretch px-5 py-4 rounded">
																{item.message}
															</span>
															<Image
																alt="picture"
																height={0}
																width={0}
																loading="lazy"
																src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
																className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
															/>
														</div>
													);
												}
											})}
									</div>

									<form
										className="shadow-sm bg-white self-center flex w-full max-w-full flex-col items-stretch px-12 py-3.5 max-md:max-w-full max-md:px-5"
										onSubmit={handleSubmit}
									>
										<textarea
											className="text-zinc-500 text-base leading-6 bg-stone-50 pl-5 pr-5 pt-3.5 pb-14 rounded-lg items-start max-w-full max-w-180px max-md:pr-5"
											placeholder=" Message..."
											name="message"
											onChange={handleMessageChange}
											value={message}
											required
											style={{ overflow: "hidden", resize: "none" }}
										/>
										<div className="flex w-full items-center justify-between gap-5 mt-2.5 pr-4 max-md:max-w-full max-md:flex-wrap">
											{/* <span className="flex items-stretch gap-2 my-auto"></span> */}
											<div className="flex gap-2">
												{" "}
												<Image
													alt="picture"
													height={0}
													width={0}
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/8392d4615ad6aedcb4840fcdc0ef1e57e16e40d09018c4aa7cc6e8dce68babb9?"
													className="aspect-square object-contain object-center w-4 fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
												/>
												<button
													type="button"
													className="text-zinc-500 text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto"
													onClick={() => {
														sendOTP();
														handlePullRecords();
													}}
												>
													Pull Records
												</button>
											</div>
											<button
												type="submit"
												className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-blue-500 self-stretch px-7 py-2 rounded max-md:px-5"
											>
												SEND
											</button>
										</div>
									</form>
								</>
							)}

							<div className="flex flex-col px-7 mt-5 whitespace-nowrap grow justify-"></div>
						</div>
					</div>
				</div>
			</div>

			{showOTP && (
				<div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60">
					{" "}
					<div className="bg-white p-8 rounded shadow-lg flex flex-col items-center max-w-full w-[600px]">
						<div className="px-16 pb-2 text-3xl leading-10 text-black max-md:pr-7 max-md:pl-7 max-md:max-w-full">
							OTP Authentication
						</div>
						<div className="text-xs text-zinc-400">
							Enter the 4-digit OTP sent to your patient’s mobile device via SMS
						</div>
						<input
							type="text"
							value={otpInput}
							onChange={(e) => {
								setOTPInput(e.target.value);
							}}
							className="shrink-0 mt-9 w-96 px-3 py-2 max-w-full bg-white rounded-xl border border-solid shadow-sm border-black border-opacity-30 h-[66px]"
							placeholder="Enter OTP..."
						/>{" "}
						<button
							className="justify-center px-[6rem] py-2.5 mt-8 text-lg text-white whitespace-nowrap bg-sky-900 rounded max-md:px-6"
							onClick={() => {
								handleOTPSubmit(true);
							}}
						>
							Confirm
						</button>
						<button
							className="justify-center px-2 py-2.5 mt-8 text-lg text-white whitespace-nowrap bg-red-900 rounded max-md:px-6"
							onClick={() => {
								handleOTPSubmit(false);
							}}
						>
							Patient Rejected the Request
						</button>
						<div className="shrink-0 self-stretch mt-8 h-px bg-gray-200 border border-gray-200 border-solid max-md:max-w-full" />
						<div className="mt-6 text-sm leading-5 text-center text-zinc-400">
							Patient did not receive the OTP?
							<br />
							<button
								className="font-bold  text-blue-500"
								style={{ textDecoration: "underline" }}
								onClick={() => {
									sendOTP();
								}}
							>
								Resend
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
