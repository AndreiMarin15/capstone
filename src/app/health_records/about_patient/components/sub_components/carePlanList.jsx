import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ViewCarePlan from "./viewCarePlan";

  
export default function CarePlanList() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
	  const carePlanList = [
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Care Plan #1",
        date: "2023-07-21",
      },
          {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Care Plan #2",
        date: "2023-07-21",
      },
          {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Care Plan #3",
        date: "2023-07-21",
      },
          {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Care Plan #4",
        date: "2023-07-21",
      },   
	];
	return (
		<>
    {currentPage === 0 ? ( <>
		 <span className="flex max-w-full justify-between gap-5 items-start max-md:flex-wrap">
        <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
              CARE PLANS
        </div>
        <div className="flex aspect-[3.3333333333333335] flex-col justify-center items-stretch mt-1.5">
          <span className="bg-blue-800 flex items-stretch justify-between gap-1.5 px-10 py-1.5 rounded">
            <button 
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            className="text-white text-xs font-semibold leading-5">Add
            </button>
          </span>
        </div>
      </span>

         {carePlanList.map((item) => (
            <div className="flex flex-col items-stretch mt-8" key={item.variable}>
            <span className="flex items-stretch justify-between gap-4">
              <Image
              height={0}
              width={0}
                loading="lazy"
                src={item.src}
                className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
                alt="picture"
              />
              <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap self-start">
                {item.variable}
              </div>
            </span>
            <span className="flex items-center gap-3 ml-8 self-start w-full">
                <div className="text-black text-xs font-medium leading-5">
                    Date: <br />
                </div>
                <div className="text-black text-xs font-medium leading-5">
                    {item.date} <br />
                    </div>
                    <div className="pl-10 ml-28 items-center">
                      <button
                          onClick={() => {
                            setCurrentPage(currentPage + 2);
                          }}
                          className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5"
                      >
                          View
                      </button>
                </div>
            </span>
          </div>
            ))}
             </>
            ) : (
              ""
            )} 
            {currentPage === 1 ? <AddCarePlan /> : ""}
            {currentPage === 2 ? <ViewCarePlan /> : ""}
		    </>
	  );
}
