import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
  
export default function AddCarePlan() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const careplan = [
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?",
        variable: "Date",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?",
        variable: "Brand Name",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc7b620e81e40759a2e1398297e058f9e409ab37e5dea5aa0b906c7521991b24?",
        variable: "Generic Name",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c193e7e2da0d1f7a38d7b6ead00a9935aeb7c3189629c8af1b45bd3093d4218a?",
        variable: "Dose",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c193e7e2da0d1f7a38d7b6ead00a9935aeb7c3189629c8af1b45bd3093d4218a?",
        variable: "Unit",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab689743267b7084701f57152d1b395fc0523151cacf7c4ed55fb1f38a39dfe5?",
        variable: "Form",
        value: "",
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0cab09a72c90afc03696d3dc2ca45a2e63e8b730e21455af9a7bf1772fd796a5?",
        variable: "Quantity",
        value: "",
      },
    ];
	return (
		<>
        <span className="flex max-w-full justify-between gap-5 items-start max-md:flex-wrap">
            <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
                Add Care Plan
            </div>
        </span>

        <table className="max-w-fit border-spacing-y-7 border-separate">
        {careplan.map((item) => (
            <tr key={item.variable}>
            <td className="w-5">
                <Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
            </td>
            <td className="border-l-[16px] border-transparent">
                <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
            </td>
            <td className="border-l-[5rem] border-transparent">
                <span className="text-zinc-400 text-xs leading-5 rounded justify-center items-stretch pl-1.5 pr-96 py-1.5 border-[0.5px] border-solid border-black max-md:pr-10">
                    {item.value}
                </span>
            </td>
            </tr>
        ))}
          <div className="bg-blue-800 flex w-[100px] item-center gap-1.5 mt-7 px-4 py-1.5 rounded">
              <div className="text-white text-xs font-semibold leading-5">
              Add More
              </div>
              <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef0e07509ac492d8205739e7dd9bc2331178b8b5c283870e3cf0cc7434e33fe2"
              className="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden shrink-0 flex-1"
              />
          </div>
        </table>
        
        </>
	  ); 
}
