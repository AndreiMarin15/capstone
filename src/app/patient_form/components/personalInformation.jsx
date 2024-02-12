import Image from "next/image";
import { useEffect } from "react";
import { usePatientInfo } from "@/app/store";

export default function SignUpPersonalInformation() {
	const patientStore = usePatientInfo();


	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	return (
		<div className="container mx-auto mt-16 flex h-[120dvh]">
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
							className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
							// Adjust the class name and styling as needed for your design
						/>
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">First Name</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Last Name</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
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
								className="text-black-300 text-sm leading-5 grow whitespace-nowrap justify-center pl-1.5 pr-2 py-1 items-start max-md:pr-5"
								placeholder="9171234567"
							></input>
						</span>
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">Gender</div>
						<select className="text-black rounded shadow-sm flex-shrink-0 w-36 h-[30px] flex-col mt-2  border-[0.5px] px-4 py-5 border-solid border-black">
							{" "}
							<option value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</span>
					<div className="flex items-stretch gap-2.5 mt-1. self-start">
						<span className="flex grow basis-[0%] flex-col items-stretch">
							<div className="text-black text-sm font-semibold leading-5">Birthdate</div>

							<div className="flex items-stretch justify-between gap-2.5 mt-2">
								<div className="flex justify-between gap-2.5">
									<input
										type="date"
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
				<input className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">City</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">State/Province</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="flex items-stretch self-stretch flex-grow flex-col">
						<div className="text-black text-sm font-semibold leading-5">Postal Code</div>
						<input className="w-40 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
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
						<input id="fileInput" type="file" className="hidden" />
					</label>
				</span>

				<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
					<div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
						<div className="flex flex-col text-sm font-semibold leading-5 mt-10 text-black">
							<div>Allergies</div>
							<div className="flex gap-4 justify-between mt-6">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f6c16bf79fcef72c689d9cf0dca5633ff9c15a7fd4a0cfecf641759b0e5e537?"
									className="self-start aspect-square w-[18px]"
								/>
								<div className="flex-auto">Category of Allergen</div>
							</div>
							<div className="flex gap-4 justify-between mt-6 whitespace-nowrap">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d83467a6242c7712b40f0ed0318ecf32eb3765ea8bbaaa517562b75d192879b?"
									className="self-start aspect-square w-[18px]"
								/>
								<div className="flex-auto">Allergen</div>
							</div>
							<div className="flex gap-4 justify-between mt-6 whitespace-nowrap">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f79f841ae91f66e8662f831b661819a926269652b904eff7314e2b43bb39640?apiKey=66e07193974a40e683930e95115a1cfd&width=100"
									className="aspect-square w-[18px]"
								/>
								<div className="grow">Select Reactions</div>
							</div>
							<div className="flex gap-5 justify-between mt-7">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/09f59612784184ecb36b692dc99a1889ca09a88615d7298261028160ecff647b?apiKey=66e07193974a40e683930e95115a1cfd&width=100"
									className="self-start aspect-square w-[15px]"
								/>
								<div className="flex-auto">Severity of Allergy</div>
							</div>
							<div className="flex gap-4 justify-between mt-7 whitespace-nowrap">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
									className="aspect-square fill-black w-[15px]"
								/>
								<div className="grow">Date of Onset</div>
							</div>
							<div className="flex gap-4 justify-between mt-7 whitespace-nowrap">
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d66426cc909742122370c08977979ec58e47bea43f66c6158506c2d6dea5ca?"
									className="aspect-square w-[18px]"
								/>
								<div className="flex-auto">Comments</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full mt-8">
						<div className="flex flex-col grow mt-10 text-xs leading-5 whitespace-nowrap text-stone-300">
							<select className="rounded shadow-sm h-8 mt-2 border-[0.5px] px-2 py-2 border-solid border-black">
								<option value="">Select Category</option>
								{/* Add more options here */}
							</select>
							<select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
								<option value="">Select Allergen</option>
								{/* Add more options here */}
							</select>
							<select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
								<option value="">Select Reactions</option>
								{/* Add more options here */}
							</select>
							<select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
								<option value="">Select Severity of Allergy</option>
								{/* Add more options here */}
							</select>
							<input
								type="date"
								className="w-40 text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 mt-2 border-[0.5px] border-solid border-black"
							/>

							<input className="shrink-0 mt-6 rounded border-black border-solid border-[0.5px] h-[81px]" />
						</div>
					</div>
				</div>
			</div>

			{/*
        <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Allergies
            </div>
            <div className="flex items-stretch">
              <input
                className="rounded shadow-sm flex shrink-0 h-[30px] w-64 flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
                // Adjust the class name and styling as needed for your design
              />
              <button className="text-white text-xs font-semibold bg-zinc-400 rounded-full ml-2 px-3 py-2 mt-2 h-[30px]">
                +
              </button>
            </div>
          </span>
         <span className="text-black text-lg font-semibold leading-7 whitespace-nowrap aspect-square justify-center items-stretch mt-7 px-2 py-2.5 rounded-[50%] self-end">
                +
</span>
        </div>*/}
		</div>
	);
}
