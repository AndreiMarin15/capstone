"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import retrieveReferralData from "../../../../lib/backend/referral/retrieveReferralData";
import ReferralList from "./components/referralList";

export default function Referral() {
	const router = useRouter();
	const [otp, setOtp] = React.useState(null);
	const [showOTP, setShowOTP] = React.useState(false);
	const [otpInput, setOTPInput] = React.useState("");
	const user = currentUser.getState().user;

	const [currentInfo, setCurrentInfo] = React.useState({});
	const doctorInfo = {
		name: "Dr. Johnny Santos",
		specialty: "Cardiologist",
		patient: "Juan Dela Cruz",
	};

	const otherDoctorInfo = {
		name: "Dr. Micha Lee",
		specialty: "Gastroenterologist",
		patient: "Juan Luna",
	};

	const [referralsList, setList] = React.useState([]);

	const handleApproval = async (value, id) => {
		const response = await fetch("https://cap-middleware-1.vercel.app/user/updateRequestStatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				status: value,
				patient_id: currentInfo.patient_id,
			}),
		});

		console.log(response);
	};

	const generateRequest = async () => {
		const response = await fetch("https://cap-middleware-1.vercel.app/user/requestApproval", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				api_key: "6d5d2d80-b0c7-4e3a-8622-65813c693d96",
				requested_from: "testpatient@gmail.com",
				patient_id: currentInfo.patient_id,
			}),
		});
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
			toast.success("OTP Verified", { position: "top-left", theme: "colored", autoClose: 2000 });
		} else {
			toast.error("Invalid OTP. Please try again.", { position: "top-left", theme: "colored", autoClose: 2000 });
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
		myHeaders.append("Authorization", "App 78aafa3855b42fc87b6336514b2447a6-00e11e65-977b-4589-b0ac-2814b265773a");
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
		<div className="bg-white border border-solid border-stone-300 h-screen flex">
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
								router.push("/other_doctor/referrals/send_referral");
							}}
							className="text-white text-xs font-semibold bg-sky-900 px-4 py-1.5 rounded mr-2"
						>
							Refer a Patient
						</button>
					</div>
				</div>

				<div className="flex">
					{/* Left side tabs */}
					<div className="flex flex-col w-1/2 max-w-[50%] md:w-full px-5 mt-9">
						{referralsList.map((referral) => {
							return (
								<div key={referral.id}>
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
											<div className="text-m text-zinc-600">
												<span className="text-zinc-300 font-medium">{currentInfo?.specialty ?? ""}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							{currentInfo?.name && (
								<div className="flex z-10 flex-col py-11 mt-0 text-xs font-medium leading-5 shadow-sm bg-stone-50 max-md:max-w-full">
									<div className="flex flex-col px-6 max-md:px-5 max-md:max-w-full">
										<div className="flex gap-4 justify-between text-zinc-600 max-md:flex-wrap max-md:max-w-full">
											<Image
												alt="image"
												height={0}
												width={0}
												loading="lazy"
												src="https://cdn.builder.io/api/v1/image/assets/TEMP/857eb5dff49a7bc5e61fc67448243f1588de729714292a08312c0482f523f5b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
												className="self-start w-7 aspect-square ml-2"
											/>

											<div className="grow justify-center px-2 py-5 bg-white rounded shadow-sm max-md:max-w-full">
												{"Hello, let's collaborate with this patient"}
											</div>
										</div>
										<div className="flex gap-4 self-end mt-6 text-white">
											<div className="grow justify-center px-2 py-3.5 bg-blue-500 rounded shadow-sm">
												{"Sure, I'd like to view the patient's records. I'll pull in a while."}
											</div>
											<Image
												alt="image"
												height={0}
												width={0}
												loading="lazy"
												src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f2fa9bc22c05f41ee1e70771f3bc8bd9a8823ec27a71159ef7db0a5a1f043e5?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
												className="self-start w-7 aspect-square "
											/>
										</div>
									</div>
									<div className="flex gap-4 self-center mt-6 mb-7 text-zinc-600 max-md:flex-wrap max-md:max-w-full">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/0607a8e021fe8ea071dc1eb7a94f5054c94c2800903170fcca4a9dc807e040ae?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
											className="self-start w-7 aspect-square ml-8"
										/>
										<div className="grow px-2 pt-5 pb-12 bg-white rounded shadow-sm max-md:max-w-full">
											{"Great. Update me after and let's talk about how to manage this patient again."}
										</div>
									</div>
								</div>
							)}

							<div className="flex flex-col px-7 mt-5 whitespace-nowrap grow justify-">
								<div className="items-start pt-2 pr-2 pl-2 pb-14 rounded-lg bg-stone-50 text-zinc-500">
									<input type="text" placeholder="Message..." style={{ width: "100%", height: "300%" }} />
								</div>
								<div className="flex w-full items-center justify-between gap-5 mt-2.5 pr-4 max-md:max-w-full max-md:flex-wrap">
									<span className="flex items-stretch gap-2 my-auto">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/8392d4615ad6aedcb4840fcdc0ef1e57e16e40d09018c4aa7cc6e8dce68babb9?"
											className="aspect-square object-contain object-center w-4 fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
										/>
										<button
											className="text-zinc-500 text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto"
											onClick={() => {
												sendOTP();
												handlePullRecords();
											}}
										>
											Pull Records
										</button>
									</span>
									<button className="text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 text-white self-stretch px-7 py-2 rounded max-md:px-5">
										SEND
									</button>
								</div>
							</div>
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
