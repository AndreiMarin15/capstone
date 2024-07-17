// "use client";

// import Image from "next/image";
// import * as React from "react";
// import sideImg from "../assets/doctor-looking-information-database.jpeg";
// import { useRouter } from "next/navigation";
// import { DoctorSignUp } from "@/backend//signup/doctor_signup";
// import { useDoctorInfo, useUserInfo } from "../store";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function DoctorForm() {
// 	const router = useRouter();
// 	const doctorStore = useDoctorInfo();
// 	const userStore = useUserInfo();
// 	const [specializations, setSpecializations] = React.useState([]);

// 	React.useEffect(() => {
// 		const getSpecials = async () => {
// 			const specials = await DoctorSignUp.selectSpecializations();

// 			setSpecializations(specials);
// 		};

// 		getSpecials();
// 	}, []);

// 	return (
// 		<>
// 			<div className="border bg-white pl-20 border-solid border-stone-300 max-md:pl-5">
// 				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
// 					<div className="flex flex-col items-stretch w-[43%] max-md:w-full max-md:ml-0">
// 						<div className="flex flex-col my-auto max-md:mt-10">
// 							<div className="items-center self-stretch flex justify-between gap-3">
// 								<Image
// 									src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c5568ce87fad250d8960d04c2e97ceaf002e72729e6cdcc5eda1af6f229ff5?"
// 									className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full my-auto"
// 									width={0}
// 									height={0}
// 									alt="mImg"
// 								/>
// 								<div className="text-blue-500 text-3xl font-bold leading-10 self-stretch grow shrink basis-auto">
// 									EndoTracker
// 								</div>
// 							</div>
// 							<div className="text-black text-5xl font-bold leading-[72px] self-stretch mt-16 max-md:text-4xl max-md:mt-10">
// 								Sign Up
// 							</div>

// 							<div className="text-black text-lg font-semibold leading-7 self-stretch mt-7 max-md:ml-2">License ID</div>
// 							<input
// 								onChange={(e) => {
// 									doctorStore.setDoctor_license({
// 										license_number: e.target.value,
// 									});
// 								}}
// 								id="lice"
// 								value={doctorStore.doctor_license.license_number}
// 								type="text"
// 								className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
// 							/>
// 							<div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">Last Name</div>
// 							<input
// 								onChange={(e) => {
// 									doctorStore.setLast_name(e.target.value);
// 								}}
// 								type="text"
// 								value={doctorStore.last_name}
// 								className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
// 							/>

// 							<div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">First Name</div>
// 							<input
// 								onChange={(e) => {
// 									doctorStore.setFirst_name(e.target.value);
// 								}}
// 								value={doctorStore.first_name}
// 								type="text"
// 								className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3"
// 							/>
// 							<div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">
// 								Specialization
// 							</div>
// 							<select
// 								onChange={(e) => {
// 									doctorStore.setSpecialization_id(parseInt(e.target.value));
// 								}}
// 								className=" text-xl leading-7 shadow-sm self-stretch w-full justify-center mt-2.5 pl-3 pr-16 py-3 rounded-md border-[0.638px] border-solid border-black items-start max-md:ml-2 max-md:pr-5"
// 							>
// 								{Array.isArray(specializations) &&
// 									specializations?.map((item) => {
// 										return (
// 											<option key={item.id} value={item.id}>
// 												{item.doctor_specialization_name}
// 											</option>
// 										);
// 									})}
// 							</select>

// 							<button
// 								onClick={async () => {
// 									const doctorInfo = {
// 										email: userStore.email,
// 										password: userStore.password,
// 										license_id: doctorStore.doctor_license.license_number,
// 										specialization_id: doctorStore.specialization_id,
// 										first_name: doctorStore.first_name,
// 										last_name: doctorStore.last_name,
// 									};

// 									const account = await DoctorSignUp.signUpAsDoctor(doctorInfo);
// 									console.log(account.message);
// 									if (account.message) {
// 										toast.error(account.message, {
// 											position: "top-left",
// 											theme: "colored",
// 											autoClose: 8000,
// 										});
// 									} else {
// 										toast.success("Registration Success! Redirecting...", {
// 											position: "top-left",
// 											theme: "colored",
// 											autoClose: 8000,
// 										});

// 										setTimeout(() => {
// 											router.push("/dashboard");
// 										}, 2500);
// 									}
// 								}}
// 								className="text-white text-lg font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 mt-10 px-8 py-3 rounded self-start max-md:px-5 hover:bg-sky-600"
// 							>
// 								Sign Up
// 							</button>
// 						</div>
// 					</div>
// 					<div className="flex flex-col items-stretch justify-end h-[100vh] ml-5 w-full">
// 						<Image
// 							src={sideImg}
// 							width={0}
// 							height={0}
// 							className="w-full object-cover aspect-[0.63] object-center overflow-hidden grow max-md:max-w-full max-md:mt-10"
// 							alt="side"
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
