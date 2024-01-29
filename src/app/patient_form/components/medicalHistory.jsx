export default function SignUpMedicalHistory() {
	return (
		<div className="container mx-auto mt-16 flex h-[55vh]">
			{/* Left Column */}
			<div className="w-1/2 pr-8">
				<div className="text-black text-base font-semibold leading-6">Medical History</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly answer the following regarding your medical history.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-4 mt-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you been taking any blood pressure medications?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input type="checkbox" id="bloodPressureYes" name="bloodPressure" className="mr-2" />
						Yes
					</label>
					<label htmlFor="bloodPressureNo" className="flex items-center">
						<input type="checkbox" id="bloodPressureNo" name="bloodPressure" className="mr-2" />
						No
					</label>
				</div>
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Enter Medications
				</div>
				<input className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you had a stroke in the past year?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input type="checkbox" id="bloodPressureYes" name="bloodPressure" className="mr-2" />
						Yes
					</label>
					<label htmlFor="bloodPressureNo" className="flex items-center">
						<input type="checkbox" id="bloodPressureNo" name="bloodPressure" className="mr-2" />
						No
					</label>
				</div>
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-6 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you had hypertension in the past year?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input type="checkbox" id="bloodPressureYes" name="bloodPressure" className="mr-2" />
						Yes
					</label>
					<label htmlFor="bloodPressureNo" className="flex items-center">
						<input type="checkbox" id="bloodPressureNo" name="bloodPressure" className="mr-2" />
						No
					</label>
				</div>
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Past Medical Procedures
				</div>
				<input className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
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
			</div>
		</div>
	);
}
