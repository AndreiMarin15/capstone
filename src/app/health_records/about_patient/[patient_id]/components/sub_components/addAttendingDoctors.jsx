import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function AddAttendingDoctors({ currentScreen, setCurrentScreen }) {


 
  const handleSave = async () => {
    setCurrentScreen(2);
};

  const attendingDoctors = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Name of Doctor",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Specialization",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Place of Clinic",
      value: "",
    },
  ];



  return (
    <>
      {currentScreen === 1 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD ATTENDING DOCTOR/S
          </div>
  
          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <table className="w-full">
                        <tbody>
                        {attendingDoctors.map((item, index) => (
                            <tr key={index} className="flex gap-5 justify-between mt-6 w-full">
                                <td className="flex gap-2 my-auto font-semibold text-black">
                                    <Image
                                        alt="image"
                                        height={0}
                                        width={0}
                                        loading="lazy"
                                        src={item.src}
                                        className="aspect-[1.14] fill-black w-[17px]"
                                    />
                                    <div className="flex-auto my-auto">{item.variable}</div>
                                </td>
                                <td className="flex-start"> {/* Apply flex-start alignment */}
                                    {item.variable === "Date" ? (
                                        <div className="inline-block relative justify-start mr-20">
                                            <input
                                                type="date"
                                                className="text-black rounded shadow-sm mt-2 mr-6 border-[0.5px] px-4 py-2 border-solid border-black"
                                                onChange={(e) => {
                                                    // Handle date change if needed
                                                }}
                                                defaultValue={new Date().toISOString().split('T')[0]} // Set default value to today's date
                                            />
                                        </div>
                                    ) : (
                                        <input
                                        className="flex grow justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-10 w-[250px]"
                                        onChange={(e) => {
                                            console.log("Input changed:", e.target.value);
                                            // Update the state for the corresponding item.value
                                            // For example: setRegis(e.target.value) for "Registration Number"
                                        }}
                                    />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
            <div>
              <button
                onClick={() => {
                    handleSave(); // Save the medication
                    setCurrentScreen(2); // Navigate back to the medication list screen
                }}
                className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
            >
                SAVE
            </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}