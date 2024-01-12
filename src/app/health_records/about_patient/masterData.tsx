export default function MasterData() {
	return (
		<>
			<div className="text-black text-xs font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">MASTER DATA</div>

			<div className="flex grow flex-col items-stretch max-md:mt-10 gap-y-[30px] w-1/2">
				<span className="flex  items-stretch gap-4">
					<div className="flex items-stretch gap-4">
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?"
							className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
						/>
						<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Name</div>
					</div>
					
					<div className="text-black text-xs leading-5 ml-auto">Juan Dela Cruz</div>
					
				</span>
				<span className="flex justify-between items-stretch gap-4">
					<div className="flex items-stretch gap-4">
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?"
							className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
						/>
						<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Age</div>
					</div>
					<div className="text-black text-xs leading-5 ">74</div>
				
				</span>
				<span className="flex items-stretch gap-4">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?"
						className="aspect-[0.88] object-contain object-center w-3.5 fill-black overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Birthday</div>
					<div className="text-black text-xs leading-5">January 01, 1950</div>
				</span>
				<span className="flex items-stretch gap-4">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?"
						className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Gender</div>
					<div className="text-black text-xs leading-5">Male</div>
				</span>
				<span className="flex items-stretch gap-4">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"
						className="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Address</div>
					<div className="text-black text-xs leading-5 whitespace-nowrap">1 Pasay Rd. Pasay City, Metro Manila</div>
				</span>
				<span className="flex items-stretch gap-4">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/2afcd7832aea3646cef217f7aaf19b311bd3133a443e8b91269a59998c8333c5?"
						className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Contact</div>
					<div className="text-black text-xs leading-5">0999 999 9999</div>
				</span>
				<span className="flex items-stretch gap-4">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?"
						className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Allergies</div>
					<div className="text-black text-xs leading-5">Penicillin</div>
				</span>
			</div>
		</>
	);
}
