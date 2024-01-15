export default function SignUpFamilyHistory() {
	return (
		<div className="container mx-auto mt-16 mb-5 flex h-[48vh]">
			{/* Left Column */}
			<div className="w-1/2 pr-8 flex flex-col">
				<div className="text-black text-base font-semibold leading-6">Family History</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly enter any patient family history that is relevant with the disease.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				<div className="flex items-stretch justify-between gap-5 mr-4  max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Family member first name</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Family member last name</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-3 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">Age</div>
						<input className="rounded shadow-sm flex-shrink-0 w-14 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="items-stretch flex-grow basis-[0%] flex-col">
						<div className="text-black text-sm font-semibold leading-5">Gender</div>
						<select className="text-black rounded shadow-sm flex-shrink-0 w-32 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
							{" "}
							<option value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>{" "}
					</span>
					<div className="flex items-stretch self-stretch flex-grow flex-col">
						<div className="text-black text-sm font-semibold leading-5">Patient Relationship with Family Member</div>
						<input className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</div>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<div className="flex items-stretch self-stretch flex-grow flex-col">
						<div className="text-black text-sm font-semibold leading-5">Medical Condition of the Family Member</div>
						<input className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</div>
					<div className="flex items-stretch gap-2.5 mt-1. self-start">
						<span className="flex grow basis-[0%] flex-col items-stretch">
							<div className="text-black text-sm font-semibold leading-5">Date when Condition Started</div>

							<div className="flex items-stretch justify-between gap-2.5 mt-2">
								<span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-4 py-2.5 border-[0.5px] border-solid border-black">
									MM
								</span>
								<span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-5 py-2.5 border-[0.5px] border-solid border-black">
									DD
								</span>
								<span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-5 py-2.5 border-[0.5px] border-solid border-black">
									YYYY
								</span>
							</div>
						</span>
					</div>
				</div>

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Medical Condition Outcomes of the Family Member
				</div>
				<select className="text-black rounded shadow-sm flex-shrink-0 w-60 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-5 border-solid border-black">
              {" "}
              <option value="">Select</option>
              <option value="deceased">Deceased</option>
              <option value="recovered">Recovered</option>
              <option value="chronic">Chronic</option>
              <option value="chronic">Improved</option>
            </select>{" "}
			</div>
		</div>
	);
}
