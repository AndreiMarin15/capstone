import React from "react";
import Image from "next/image";

const ReferralPatients = ({ name, age, id, selectedId }) => {
	const [selected, setSelected] = React.useState(false);
	
	React.useEffect(() => {
		if (id === selectedId) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, []);
	React.useEffect(() => {
		if (id === selectedId) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [selectedId]);

	return (
		<div className={"mx-5 flex flex-col w-auto max-md:w-[83%] max-md:ml-0 "}>
			<div
				className={
					selected ? "bg-blue-300 p-2 flex items-stretch gap-5" : "p-2 flex items-stretch gap-5 hover:bg-gray-50"
				}
			>
				<Image
					alt="picture"
					height={0}
					width={0}
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
					className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
				/>
				<span className="self-center flex flex-col items-stretch my-auto">
					<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{name}</div>
					<div className="text-black text-xs leading-5 mt-2">AGE: {age}</div>
				</span>
			</div>
			<div className="bg-gray-400 self-stretch min-h-[1px] w-[98.4%] mt-2 mb-2" />
		</div>
	);
};

export default ReferralPatients;
