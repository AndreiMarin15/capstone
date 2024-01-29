import Image from "next/image";

export default function Status(props) {
	return (
		<span className="flex items-center gap-2.5 mb-1">
			<div className="text-black text-xs font-regular leading-5 whitespace-nowrap">Status:</div>
			<span className="border self-stretch flex justify-between gap-5 pl-6 pr-2 rounded-md border-solid border-zinc-400 items-start">
				<div className="text-black text-xs font-medium leading-5">{props.statusText}</div>
				<Image
					alt="picture"
					height={0}
					width={0}
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/554c1e18059b6f0490f9d598b5f23e6954398601ddfbab70a22496a73e532e48?"
					className="aspect-[0.55] object-contain object-center w-1.5 overflow-hidden self-stretch shrink-0 max-w-full"
				/>
			</span>
		</span>
	);
}
