import Image from "next/image";
import { useEffect, useState } from "react";
import { usePatientInfo } from "@/app/store";
import AllergyForm from "./subcomponents/allergies";

export default function SignUpPersonalInformation() {
	const patientStore = usePatientInfo();
	const [showAllergy, setshowAllergy] = useState(false);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertToBase64(file);

		patientStore.setPersonalInformation({ photo: base64.toString() });

		console.log(patientStore);
	};

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	useEffect(() => {
		console.log(patientStore);
	}, [patientStore]);

	return (
		<div className="container mx-auto mt-16 flex h-auto pb-10">
			{/* Left Column */}
			<div className="w-1/2 pr-8">
				<div className="text-black text-base font-semibold leading-6">Personal Information</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly answer the following regarding your personal information.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				<div className="flex items-stretch justify-between gap-5 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">PhilHealth ID</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ philhealth_id: e.target.value });
							}}
							value={patientStore.personal_information.philhealth_id}
							className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
							// Adjust the class name and styling as needed for your design
						/>
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">First Name</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ first_name: e.target.value });
							}}
							value={patientStore.personal_information.first_name}
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Last Name</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ last_name: e.target.value });
							}}
							value={patientStore.personal_information.last_name}
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">Contact number</div>
						<span className="items-stretch rounded shadow-sm flex justify-between gap-1 mt-2 px-3 py-1.5 border-[0.5px] border-solid border-black">
							<div className="text-zinc-600 text-sm leading-5 whitespace-nowrap justify-center pl-2.5 pr-1 py-1 items-start max-md:pr-5">
								+63
							</div>
							<input
								type="text"
								onChange={(e) => {
									patientStore.setPersonalInformation({ contact_number: e.target.value });
								}}
								value={patientStore.personal_information.contact_number}
								className="text-black-300 text-sm leading-5 grow whitespace-nowrap justify-center pl-1.5 pr-2 py-1 items-start max-md:pr-5"
								placeholder="9171234567"
							></input>
						</span>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">Gender</div>
						<select
							onChange={(e) => {
								patientStore.setPersonalInformation({ gender: e.target.value });
								console.log(patientStore.personal_information.gender)
							}}
							className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
						
						value={patientStore.personal_information.gender}
						>
							
							<option value="">Select</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</span>
					<div className="flex items-stretch gap-2.5 mt-1. self-start">
						<span className="flex grow basis-[0%] flex-col items-stretch">
							<div className="text-black text-sm font-semibold leading-5">Birthdate</div>

							<div className="flex items-stretch justify-between gap-2.5 mt-2">
								<div className="flex justify-between gap-2.5">
									<input
										type="date"
										onChange={(e) => {
											patientStore.setPersonalInformation({ birthdate: e.target.value });
										}}
										value={patientStore.personal_information.birthdate}
										className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
									/>
								</div>
							</div>
						</span>
					</div>
				</div>

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Street address
				</div>
				<input
					type="text"
					onChange={(e) => {
						patientStore.setPersonalInformation({ street_address: e.target.value });
					}}
					value={patientStore.personal_information.street_address}
					className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5"
				/>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">City</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ city: e.target.value });
							}}
							value={patientStore.personal_information.city}
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">State/Province</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ state: e.target.value });
							}}
							value={patientStore.personal_information.state}
							className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
					<span className="flex items-stretch self-stretch flex-grow flex-col">
						<div className="text-black text-sm font-semibold leading-5">Postal Code</div>
						<input
							type="text"
							onChange={(e) => {
								patientStore.setPersonalInformation({ postal_code: e.target.value });
							}}
							value={patientStore.personal_information.postal_code}
							className="w-40 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>
					</span>
				</div>

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Photo
				</div>

				<span className="flex gap-5 justify-between mt-3 max-w-full text-xs font-semibold whitespace-nowrap text-zinc-600 w-[146px]">
					<Image
						alt="image"
						height={0}
						width={0}
						loading="lazy"
						src={
							patientStore.personal_information.photo
								? patientStore.personal_information.photo
								: "https://cdn.builder.io/api/v1/image/assets/TEMP/245d6ea395b4c712a6f541d78979f36e05242f760c2b5899f9e58d63bf27d745?"
						}
						className="flex-1 shrink-0 w-full aspect-square"
					/>
					<label
						htmlFor="fileInput"
						className="justify-center px-3 py-1.5 my-auto bg-white rounded-sm border-solid shadow-sm aspect-[2.48] border-[0.5px] border-zinc-600 cursor-pointer"
					>
						Change Photo
						<input
							onChange={handleImageUpload}
							id="fileInput"
							type="file"
							accept=".jpeg, .png, .jpg"
							className="hidden"
						/>
					</label>
				</span>

				<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
					<div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
						<div className="flex flex-col text-sm font-semibold leading-5 mt-10 text-black">
							<div>Allergies</div>

							{showAllergy && (
								<div>
									<AllergyForm />
								</div>
							)}

							{!showAllergy && (
								<div className="flex gap-1.5 self-start mt-10 whitespace-nowrap">
									<button
										onClick={() => {
											setshowAllergy(true);
										}}
										className="justify-center items-center px-1.5 text-lg text-white bg-gray-400 rounded-full aspect-square h-[25px]"
									>
										+
									</button>
									<div className="grow text-base text-gray-400">Add Allergy</div>
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full mt-8"></div>
				</div>
			</div>
		</div>
	);
}
