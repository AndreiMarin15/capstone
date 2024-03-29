import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "./BackButton";
export default function RequestLabTest({currentScreen, setCurrentScreen,handleSave}) {
  const [labTestName, setLabTestName] = useState("");

  const handleSaveLabTestRequest = () => {
    // Construct the lab test data object
    const labTestData = {
      loincCode: "YOUR_LOINC_CODE", // Empty or null
      status: "requested", // Empty or null
      valueQuantities: [], // Empty array
      dateOfResult: null, // Null
      labTestName: labTestName, // Lab test name from the state
      base64Image: null, // Null
    };
    
    handleSave(labTestData, false);


    toast.success("Lab Test Requested", {
      position: "top-left",
      theme: "colored",
      autoClose: 2000,
    });

    
    setCurrentScreen(0);
  };
  
  const labtest = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Lab Test Name",
      value: labTestName,
    },
  ];

  

  return (
    <>
      {currentScreen === 3 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            REQUEST LAB TEST
          </div>

          <div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                {labtest.map((item, index) => (
  <tr key={index} className="h-8">
    <td className="w-5">
      <Image
        alt="image"
        height={0}
        width={0}
        loading="lazy"
        src={item.src}
        className="self-start aspect-square fill-black w-[15px]"
      />
    </td>
    <td className="border-l-[16px] border-transparent">
      <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
        {item.variable}
      </div>
    </td>
    <td className="border-l-[5rem] border-transparent">
      {item.variable === "Lab Test Name" ? (
        <input
          className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5"
          value={labTestName}
          onChange={(e) => setLabTestName(e.target.value)}
        />
      ) : (
        <input
          className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5"
        />
      )}
    </td>
  </tr>
))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center">
          <BackButton currentScreen={ 5 } setCurrentScreen={ setCurrentScreen } />
          <button
              className="flex items-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
              onClick={handleSaveLabTestRequest}
            >
              Save
            </button>
            
        </div>
       
        </>
      ) : (
        ""
      )}
    </>
  );
}
