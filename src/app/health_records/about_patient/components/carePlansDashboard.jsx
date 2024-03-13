import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import { useState } from "react";
import AddCarePlans from "./sub_components/addCarePlans";

export default function CarePlans() {
  const [currentPage, setCurrentPage] = useState(0);

  const careplan = [
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "CARE PLAN #1",
      srcdoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Collaborated with Dr. Maria Santos",
      startdate: "2020-01-10",
      enddate: "2020-01-15",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "CARE PLAN #2",
      srcdoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Collaborated with Dr. Johnny Santos",
      startdate: "2020-01-10",
      enddate: "2020-01-15",
    },
  ];

  const handleVisitClick = () => {
    // Increment the currentPage when the user clicks the div
    setCurrentPage(currentPage + 1);
    // Log the currentPage value to the console after incrementing
    console.log("Current Page:", currentPage + 1);
  };

  return (
    <>
      {currentPage === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            CARE PLANS
            <button
              className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
              onClick={handleVisitClick}
            >
              Add
            </button>
          </div>
          <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
            <div className="flex gap-1.5 p-2.5">
              <div className="mt-3 grow font-semibold text-black">Status: </div>
              <button className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                  ACTIVE
                </div>
              </button>
            </div>
            <div className="flex gap-1 my-auto text-black whitespace-nowrap leading-[150%]">
              <button className="flex gap-1 px-5 py-2 rounded-md border border-black border-solid">
                <Image
                  alt="update"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                  className="shrink-0 w-3 aspect-[0.85]"
                />
                <div className="self-start">FILTER</div>
              </button>
              <button className="grow justify-center px-6 py-2.5 rounded-md border border-black border-solid max-md:pl-5">
                SORT
              </button>
            </div>
          </div>
          {careplan.map((careplan, index) => (
            <button key={careplan.careplanname}>
              <div
                key={index}
                className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[1000px]"
              >
                <div className="flex gap-3.5 font-semibold whitespace-nowrap ">
                  <Image
                    alt="image"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={careplan.srccareplan}
                    className="aspect-square fill-black w-[15px]"
                  />
                  <div className="my-auto">{careplan.careplanname}</div>
                </div>
                <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
                  <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={careplan.srcdoctor}
                      className="w-4 aspect-square"
                    />
                    <div className="grow my-auto">{careplan.doctor}</div>
                    <div className=" ml-16 justify-between flex-auto my-auto">{`${careplan.startdate} - ${careplan.enddate}`}</div>
                  </div>

                  {/* {careplan.doctor === "Dr. John Doe" && (
                    <div className="flex-auto ml-96">
                      <span className="">
                        <button className="ml-auto px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white">
                          Edit
                        </button>
                      </span>
                      <span className="">
                        <button className="ml-2 px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white">
                          Discontinue
                        </button>
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            </button>
          ))}
        </>
      ) : (
        ""
      )}
      {currentPage === 1 ? (
        <>
          <AddCarePlans />
        </>
      ) : (
        ""
      )}
    </>
  );
}
