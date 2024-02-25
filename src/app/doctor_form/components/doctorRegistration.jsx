import { useEffect, useState } from "react";
import { useDoctorInfo } from "../../store";
import { DoctorSignUp } from "../../../../lib/backend/signup/doctor_signup";
export default function DoctorRegistration() {
	const doctorStore = useDoctorInfo();
	const [specializations, setSpecializations] = useState([]);
	useEffect(() => {
		const getSpecials = async () => {
			const specials = await DoctorSignUp.selectSpecializations();

			setSpecializations(specials);
		};

		getSpecials();
	}, []);
	return (
		<div className="container mx-auto mt-16 flex h-[-65dvh]">
			{/* Left Column */}
			<div className="w-1/2 pr-8">
				<div className="text-black text-base font-semibold leading-6">Professional Information</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly answer the following regarding your professional information.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				<div className="flex items-stretch justify-between gap-5 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">License ID</div>
						<input
							onChange={(e) => {
								doctorStore.setDoctor_license({
									license_number: e.target.value,
								});
							}}
							id="lice"
							value={doctorStore.doctor_license.license_number}
							className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
							// Adjust the class name and styling as needed for your design
						/>
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Last Name</div>
						<input
							onChange={(e) => {
								doctorStore.setLast_name(e.target.value);
							}}
							type="text"
							value={doctorStore.last_name}
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">First Name</div>
						<input
							onChange={(e) => {
								doctorStore.setFirst_name(e.target.value);
							}}
							value={doctorStore.first_name}
							type="text"
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">Specialization</div>
						<select className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black">
							{Array.isArray(specializations) &&
								specializations.map((item) => {
									return (
										<option key={item.id} value={item.id}>
											{item.doctor_specialization_name}
										</option>
									);
								})}
						</select>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">Gender</div>
						<select
							onChange={(e) => {
								doctorStore.setGender(e.target.value);
							}}
							value={doctorStore.gender}
							type="text"
							className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
						>
							{" "}
							<option value="">Select</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</span>
					<div className="flex items-stretch gap-2.5 mt-1. self-start">
						<span className="flex grow basis-[0%] flex-col items-stretch">
							<div className="text-black text-sm font-semibold leading-5">Birthdate</div>

							<div className="flex items-stretch justify-between gap-2.5">
								<div className="flex justify-between gap-2.5">
									<input
										type="date"
										onChange={(e) => {
											doctorStore.setBirthdate(e.target.value);
										}}
										value={doctorStore.birthdate}
										className="mt-[10px] text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
									/>
								</div>
							</div>
						</span>
					</div>
				</div>

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Years of Practice
				</div>
				<input
					onChange={(e) => {
						doctorStore.setYearsOfPractice(parseInt(e.target.value));
					}}
					value={doctorStore.years_of_practice}
					type="number"
					className="w-16 rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5"
				/>
			</div>
		</div>
	);
}
