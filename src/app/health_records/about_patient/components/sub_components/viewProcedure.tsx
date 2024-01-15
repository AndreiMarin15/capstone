import Image from "next/image";
import { useRouter } from "next/navigation";
  
export default function AttendingDoctor() {
    const router = useRouter();
	const viewProcedures = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Start Date",
			value: "2023-07-21",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "End Date",
			value: "2023-07-21",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
			variable: "Reason",
			value: "For diabetes management",
		},
	];
	return (
		<>
		<div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
            Continuous Glucose Monitoring (CGM)
        </div>

        <table className="max-w-fit border-spacing-y-7 border-separate">
			{viewProcedures.map((item) => (
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
