"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { pathIncluded } from "../../globals";

export default function TopNav() {
	const path = usePathname();
	return (
		<div className="flex flex-col justify-center items-stretch">
			<div className="shadow-sm bg-white flex w-full items-stretch justify-between gap-5 pl-4 pr-10 py-3 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
				<span className="flex items-stretch justify-between gap-2">
					<div className="flex-col fill-[radial-gradient(59.93%_59.93%_at_50%_50%,#D9D9D9_0%,#3B82F6_0.01%,#A4CFFF_45.83%,#00358C_100%)] overflow-hidden relative flex aspect-square w-[22px] items-center pt-2.5">
						<Image
							alt="pic"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/11efb3fef2425fdc9cdccdcee3df7b23e11ca383998f6efbfa494ee2928a29fd?"
							className="absolute h-full w-full object-cover object-center inset-0"
						/>
						<Image
							alt="pic"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/f55325f229d99ff0d6a9b83c783243a3e58d5962443a64b817621b8854c296e3?"
							className="aspect-[1.69] object-contain object-center w-full fill-[radial-gradient(50.07%_88.54%_at_50.07%_11.46%,#3B82F6_0%,rgba(30,64,175,0.00)_100%)] overflow-hidden"
						/>
					</div>
					<div className="text-blue-500 text-base font-bold leading-6 self-center grow whitespace-nowrap my-auto">
						EndoTracker
					</div>
				</span>
				{path !== "/" && !pathIncluded(path) && (
					<span className="flex items-stretch gap-3 self-start">
						<Image
							alt="pic"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdb718aff695bf5b5acafd7d7d097231aa261109f542eef272693d4f0668c75b?"
							className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
						/>
						<div className="text-black text-xs font-semibold leading-5 self-center my-auto">John Doe</div>
						<Image
							alt="pic"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/850e1212f2e2a2e181cf24b4224a15b094709337f2b2ee8e5e7fd5e7556566dc?"
							className="aspect-[2] object-contain object-center w-2.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
						/>
					</span>
				)}
			</div>
		</div>
	);
}
