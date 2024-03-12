import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ClinicVisit from "./sub_components/viewClinicVisit";
import AddClinicVisit from "./sub_components/addClinicVisit";
import * as React from "react";
import BackButton from "./sub_components/BackButton";

export default function ClinicVisits() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [visits, setVisits] = useState([
    {
      id: 1,
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #1",
      doctor: "Dr. Maria Santos",
      visitdate: "Date: 2023-10-30",
      lastOpened: null,
    },
    {
      id: 2,
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #2",
      doctor: "Dr. John Doe",
      visitdate: "Date: 2023-11-26",
      lastOpened: null,
    },
    {
      id: 3,
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #3",
      doctor: "Dr. Juan Gomez",
      visitdate: "Date: 2024-02-14",
      lastOpened: null,
    },
  ]);

const handleVisitClick = () => {
	// Increment the currentPage when the user clicks the div
	setCurrentPage(10);
};

  const addHandleVisitClick = (id) => {
    setCurrentPage(currentPage + 1);
    const updatedVisits = visits.map((visit) =>
      visit.id === id ? { ...visit, lastOpened: new Date().toLocaleString() } : visit
    );
  
    // Update state with the modified visits array
    setVisits(updatedVisits);
  
    // Increment currentPage
    setCurrentPage(currentPage + 1);
  
    // Set lastClicked
    setLastClicked(new Date().toLocaleString());
  };

  return (
    <>
      {currentPage === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-3 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            CLINIC VISIT
            <button
              className="flex gap-1.5 justify-between px-5 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
              onClick={handleVisitClick}
            >
              {" "}
              {/* current page = 1 */}
              Add
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
                <span className="text-black text-base font-bold leading-5">
                    Rendering Options:
                </span>
                <select className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-xs text-gray-500 font-normal">
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                </select>
                <span className="ml-2 text-black text-base text-xs leading-5 font-normal">
                    Appointments
                </span>
            </div>

              <div className="flex items-center">
              <span className="flex items-center gap-1 px-1 py-1  rounded-md border-[0.5px] border-solid border-black font-normal mr-2">
                  <Image
                      alt="picture"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/872489d37c6f07090c71fb194a8c077334f5ee8d7e865b4e470f49f5a27b95ba?apiKey=66e07193974a40e683930e95115a1cfd&"
                      className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                  />
                  <div className="text-black text-xs leading-5 self-center whitespace-nowrap">
                      FILTER
                  </div>
              </span>
              <span className="flex items-center gap-1 px-1 py-1 rounded-md border-[0.5px] border-solid border-black font-normal">
                  <Image
                      alt="picture"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/49eeb01b15c87289299d3123ede7ccfbf333d278cb9ddfc7f5674a94c5d52e26?apiKey=66e07193974a40e683930e95115a1cfd&"
                      className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                  />
                  <div className="text-black text-xs leading-5 self-center">SORT</div>
              </span>
            </div>
            
        </div>
   
        {visits.map((item, index) => (
          <button
            key={index}
            className="flex mt-4 mb-4 text-xs text-black"
            onClick={() => addHandleVisitClick(item.id)}
          >
            <div className="flex justify-between w-full">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-start aspect-square fill-black w-[15px]"
              />
              <div className="flex flex-col flex-1 px-3.5 text-left">
                <div className="font-semibold whitespace-nowrap">
                  {item.visitname}
                </div>
                <div className="flex justify-between w-fit">
                <Image
                        alt="picture"
                        height={0}
                        width={0}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                        className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                    />
                  <div className="ml-2 mr-10">
                      {item.doctor}
                  </div>
                  <div>{item.visitdate}</div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Last Opened: {item.lastOpened}</span>
            </div>
          </button>
        ))}
    
		  <BackButton currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
      ) : (
        ""
      )}

				{currentPage === 1 ? (
				<>
					<ClinicVisit currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : currentPage === 10 ? (
				<>
					<AddClinicVisit currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : (
				""
			)}
	  
    </>
  );
}
