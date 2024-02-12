
import { usePatientInfo } from "@/app/store";
import { useEffect } from "react";
export default function SignUpSocialHistory() {
	const patientStore = usePatientInfo()

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
						<select className="text-black rounded shadow-sm flex-shrink-0 w-52 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
							{" "}
							<option value="">Select</option>
							<option value="smoker">Smoker</option>
							<option value="not">Not a Smoker</option>
						</select>{" "}
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Alcohol Consumption</div>
						<select className="text-black rounded shadow-sm flex-shrink-0 w-52 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
							{" "}
							<option value="">Select</option>
							<option value="non-drinker">Non-Drinker</option>
							<option value="moderate">Moderate Drinker</option>
							<option value="heavy">Heavy Drinker</option>
						</select>{" "}
					</span>
				</div>

				<div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<span className="items-stretch flex grow basis-[0%] flex-col self-start">
						<div className="text-black text-sm font-semibold leading-5">Physical Activities</div>
						<select className="text-black rounded shadow-sm flex-shrink-0 w-52 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black">
							{" "}
							<option value="">Select</option>
							<option value="sedentary">Sedentary</option>
							<option value="low">Low Activity</option>
							<option value="moderateact">Moderate Activity</option>
							<option value="high">High Activity</option>
							<option value="regular">Regular Exercise</option>
						</select>{" "}
					</span>
				</div>
			</div>
		</div>
	);
}
