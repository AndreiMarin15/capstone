import Image from "next/image";
export default function FamilyHistory() {
	const fHistory = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Relationship",
			value: "Mother",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Doctor Specialty",
			value: "Cardiologist",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Condition",
			value: "Hypertension",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Date",
			value: "1990",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Outcome",
			value: "Chronic",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Procedure/s",
			value: "None",
		},
	];
	return (
		<>
		  <div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">FAMILY HISTORY</div>
	
		  <table className="max-w-fit border-spacing-y-7 border-separate">
			{fHistory.map((item) => (
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
