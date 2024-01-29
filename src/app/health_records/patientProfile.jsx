import Image from "next/image";
export default function PatientProfile() {
	return (
		<div className="flex items-center gap-3.5 mt-10">
			<Image 
            alt="picture"
            height={0}
            width={0}
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?"
				className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
			/>
			<span className=" flex-col items-stretch">
				<div className="text-black text-xs font-semibold leading-5">DELA CRUZ, Juan</div>
				<div className="flex items-center">
					<div className="text-black text-xs leading-5 whitespace-nowrap pr-2">74 years old</div>
					<div className="relative">
						<div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
					</div>
					<div className="text-black text-xs leading-5 whitespace-nowrap pl-2">Male</div>
				</div>
			</span>
		</div>
	);
}
