import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ViewProcedure from "./viewProcedure";
  
export default function AttendingDoctor() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const procedures = [
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Continuous Glucose Monitoring",
        startDate: "2023-07-21",
        endDate: "2023-10-01"
      },
          {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        variable: "Continuous Subcutaneous Infusion",
        startDate: "2023-07-21",
        endDate: "2023-10-01"
      },
    ];
	return (
		<>
		 <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap mt-8 self-start">
          PROCEDURES
      </div>
      {currentPage === 0 ? ( <>
         {procedures.map((item) => (
            <div className="flex flex-col items-stretch mt-8" key={item.variable}>
              <span className="flex items-stretch justify-between gap-4">
                <img
                  loading="lazy"
                  src={item.src}
                  className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
                  alt="picture"
                />
                <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap self-start">
                  {item.variable}
                </div>
              </span>
              <span className="flex items-stretch gap-3 ml-8 mt-1 self-start w-full">
                  <div className="text-black text-xs font-medium leading-5">
                      Start Date: <br />
                      End Date:
                  </div>
                  <div className="text-black text-xs font-medium leading-5">
                      {item.startDate} <br />
                      {item.endDate}
                      </div>
                      <div className="ml-auto flex justify-end items-center">
                      <button
                          onClick={() => {
                            setCurrentPage(currentPage + 1);
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
            {currentPage === 1 ? <ViewProcedure /> : ""}
		    </>
	  ); 
}