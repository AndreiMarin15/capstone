import Image from "next/image";
  
export default function AttendingDoctor() {
	const mData = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9570b6e6a66485deb61e3be7f716dcc833a18186bd495614adfdc111e2a133d?",
			variable: "Diagnosis",
			value: "Microangiopathy",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?",
			variable: "Procedure",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded text-center">
					View
				</button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d7d78f5d990d9c120777977374e7572bf947226c738f4eae3eecb82513a3314?",
			variable: "Care Plan",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded text-center">
					View
				</button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/73a75686b5cd170bb3f25deb8f06c42c071c4ba5dc25573afa2fcfb453e5b5f4?",
			variable: "Lab Tests",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded text-center">
					View
				</button>
			),
		},
	];
	return (
		<>
		 
         <span className="flex items-stretch mt-8">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ec8c802c0081cff6d71681da0ea2345c020d033a9bd2aa231051f180a7bf939?"
                className="aspect-square object-contain object-center overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-black text-xs font-normal leading-5 grow whitespace-nowrap mt-2 self-start">
                CREATED BY: <span className="">Dr. Johnny Santos - Cardiology</span>
            </div>
        </span>
		  <table className="max-w-fit border-spacing-y-7 border-separate">
			{mData.map((item) => (
			  <tr key={item.variable}>
				<td className="w-5">
				  <Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
				</td>
				<td className="border-l-[16px] border-transparent">
				  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
				</td>
				<td className="border-l-[5rem] border-transparent">
				  <div className="text-black text-xs leading-5 ml-auto">{item.value}</div>
				</td>
			  </tr>
			))}
		  </table>
		</>
	  );
}
