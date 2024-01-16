import Image from "next/image";
import { useRouter } from "next/navigation";
  
export default function ViewCarePlan() {
    const router = useRouter();
	const viewCarePlan = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b5f03b336a4a4bff5c17a38b99a589680968a391b7cde1d00bf3c6235c2093b?",
			variable: "Date",
			value: "2023-07-21",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b5f03b336a4a4bff5c17a38b99a589680968a391b7cde1d00bf3c6235c2093b?",
			variable: "Brand Name",
			value: "Glucophage",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b5f03b336a4a4bff5c17a38b99a589680968a391b7cde1d00bf3c6235c2093b?",
			variable: "Generic Name",
			value: "Metformin",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2b3fb533a0ee2d2588ab5dce94896d9044fb18570c863059062d79f816560ae?",
			variable: "Dose",
			value: "100",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2b3fb533a0ee2d2588ab5dce94896d9044fb18570c863059062d79f816560ae?",
			variable: "Unit",
			value: "mg",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b9032e7e34250ec29a32a917ce6dd7f5d7afa52300819e8493487f95457a89f9?",
			variable: "Form",
			value: "Tablet",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0cab09a72c90afc03696d3dc2ca45a2e63e8b730e21455af9a7bf1772fd796a5?",
			variable: "Quantity",
			value: "30",
		},
        {
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
			variable: "Notes",
			value: "1 tablet 1x/ day for 30 days 30 minutes of moderate-intensity exercise (e.g., brisk walking, swimming, or cycling) at least five days a week. Maintain a food diary and monitor blood glucose levels after meals.",
		},
	];
	return (
		<>
		<div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
            Care Plan #1
        </div>

        <table className="max-w-fit border-spacing-y-7 border-separate">
			{viewCarePlan.map((item) => (
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
