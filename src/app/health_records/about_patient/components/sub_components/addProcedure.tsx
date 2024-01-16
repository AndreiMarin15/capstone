import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ViewProcedure from "./viewProcedure";
  
export default function AddProcedure() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const procedure = [
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Procedure Name",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Start Date",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "End Date",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Reason",
        value: "",
      },
    ];
	return (
		<>
        <span className="flex max-w-full justify-between gap-5 items-start max-md:flex-wrap">
            <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
                PROCEDURES
            </div>
        </span>

        <table className="max-w-fit border-spacing-y-7 border-separate">
        {procedure.map((item) => (
            <tr key={item.variable}>
            <td className="w-5">
                <Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
            </td>
            <td className="border-l-[16px] border-transparent">
                <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
            </td>
            <td className="border-l-[5rem] border-transparent">
                <span className="text-zinc-400 text-xs leading-5 rounded justify-center items-stretch pl-1.5 pr-14 py-1.5 border-[0.5px] border-solid border-black max-md:pr-5">
                    {item.value}
                </span>
            </td>
            </tr>
        ))}
        </table>
        </>
	  ); 
}
