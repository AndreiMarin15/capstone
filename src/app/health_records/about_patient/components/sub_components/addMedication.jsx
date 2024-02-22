import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitMedications from "./visitMedications";

export default function AddMedications() {
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
            ADD MEDICATION & CARE PLAN
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[100%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs whitespace-nowrap font-semibold text-black">
                        Dosage Instructions
                      </div>
                      <div className="flex gap-10 justify-between mt-6 w-[80%]">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e276aa46e857b89f7f3672cdb76b71dd790168306eadec22051da3bd42ff2067?"
                            className="aspect-[1.14] fill-black w-[17px]"
                          />
                          <div className="flex-auto my-auto">Medicine Name</div>
                        </div>
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                      </div>

                      <div className="flex gap-24 justify-between mt-6 w-[80%]">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4be08e76a71b76c5f8ca00cab1b68e9b11e20d3414acfd1bdc86f2d8ae6a7159?"
                            className="aspect-square w-[17px]"
                          />
                          <div className="flex-auto my-auto">Dose</div>
                        </div>
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                      </div>

                      <div className="flex gap-24 justify-between mt-6 w-[80%]">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4be08e76a71b76c5f8ca00cab1b68e9b11e20d3414acfd1bdc86f2d8ae6a7159?"
                            className="aspect-square w-[17px]"
                          />
                          <div className="flex-auto my-auto">Unit</div>
                        </div>
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                      </div>

                      <div className="flex gap-24 justify-between mt-6 w-[80%]">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e276aa46e857b89f7f3672cdb76b71dd790168306eadec22051da3bd42ff2067?"
                            className="aspect-[1.14] fill-black w-[17px]"
                          />
                          <div className="flex-auto my-auto">Form</div>
                        </div>
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                      </div>

                      <div className="flex gap-14 justify-between mt-6 w-[80%]">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cab09a72c90afc03696d3dc2ca45a2e63e8b730e21455af9a7bf1772fd796a5?"
                            className="w-5 aspect-square"
                          />
                          <div className="flex-auto my-auto">Frequency</div>
                        </div>
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-xs leading-5 max-md:mt-10">
                      <div className="font-semibold text-start text-xs text-black">
                        Prescription Duration
                      </div>
                      <div className="flex gap-14 pr-14 mt-9 w-full max-md:pr-5">
                        <div className="flex gap-4 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="my-auto">Start Date </div>
                        </div>
                        <input className="justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                      </div>
                      <div className="flex gap-16 pr-14 mt-6 w-full whitespace-nowrap max-md:pr-5">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="my-auto">Duration</div>
                        </div>
                        <input className="justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                      </div>
                      <div className="flex gap-10 mt-6 w-full">
                        <div className="flex gap-5 my-auto font-semibold text-black">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                            className="aspect-square fill-black w-[15px]"
                          />
                          <div className="flex-auto my-auto">Duration Unit</div>
                        </div>
                        <input className="justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
