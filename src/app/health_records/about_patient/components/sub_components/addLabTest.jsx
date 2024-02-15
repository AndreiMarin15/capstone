import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitLabtests from "./visitLabTests";

export default function AddLabTest() {
  const followup = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Medicine Name",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Diagnosis",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Complaint",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Procedures",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Medications",
      value: "",
      component: 2,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Care Plan",
      value: "",
      component: 1,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Tests",
      value: "",
      component: 3,
    },
  ];

  const clinicVitals = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Systolic Blood Pressure",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Diastolic Blood Pressure",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Heart Rate",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Height",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
      variable: "Weight",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Body Mass Index",
      value: "",
    },
  ];

  const [currentScreen, setCurrentScreen] = useState(0);
  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD LAB TEST
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-xs leading-5 max-md:mt-10">
                      <div className="flex gap-14 pr-14 mt-4 w-full max-md:pr-5">
                        <div className="flex gap-4 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="my-auto">Date of Result </div>
                        </div>
                        <input className="ml-5 justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                      </div>
                      <div className="flex gap-16 pr-14 mt-6 w-full whitespace-nowrap max-md:pr-5">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05dd7068174eb76cbab2ba8d9608b143eabae9c2e3d1be451a944916466c9ae8?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="my-auto">Name of Lab Test</div>
                        </div>
                        <input className="justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                      </div>
                      <div className="flex gap-10 mt-6 ml-48 w-full">
                        <div className="flex flex-col items-center px-20 py-2 text-xs leading-5 text-center bg-white border-black border-solid border-[0.5px] max-w-[268px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d670cd5944e41d3f0d0ba9e28820c872d801df2a901fa93765c19dc39e0b53f7?"
                            className="aspect-[1.03] w-[38px]"
                          />
                          <div className="self-stretch mt-1.5 text-black">
                            Drag or drop here.
                          </div>
                          <div className="mt-3.5 font-light text-sky-600 underline">
                            Upload
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex gap-14 pr-14 mt-4 w-full max-md:pr-10">
                      <div className="flex gap-4 my-auto  w-full font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/835c2c533b5709aa853e0418efd68df6d00f1c923dd0dedb18dc8516044c5f8b?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto text-xs">Lab Values </div>
                      </div>
                      <input className="ml-5 justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="justify-center self-end px-14 py-2.5 mt-28 text-xs font-semibold text-white whitespace-nowrap bg-sky-900 rounded max-md:px-5 max-md:mt-10">
                Save
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
