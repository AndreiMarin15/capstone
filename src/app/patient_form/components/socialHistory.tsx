export default function SignUpSocialHistory() {
	return (
		<div className="container mx-auto mt-16 flex h-[48vh]">
			{/* Left Column */}
			<div className="w-1/2 pr-8">
				<div className="text-black text-base font-semibold leading-6">Social History</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly answer the following regarding your social history.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8 mr-24">
				<div className="flex items-stretch justify-between gap-5 mr-32 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Smoker Status</div>
						<input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
					<span className="items-start flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Cigarettes per day</div>
						<input className="w-16 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Alcohol Consumption</div>
						<input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Physical Activities</div>
						<input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
					</span>
				</div>
			</div>
		</div>
	);
}
