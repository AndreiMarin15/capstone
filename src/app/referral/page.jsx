"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Referral() {
	const router = useRouter();

  const doctorInfo = {
    name: "Dr. Johnny Santos",
    specialty: "Cardiologist",
    patient: "Juan Dela Cruz",
  };

  return (
    <div className="bg-white border border-solid border-stone-300">
      <div className="flex flex-col ml-5 w-full max-w-screen-xl mx-auto">
        <div className="flex gap-5 justify-between px-5 md:px-14 py-9 w-full">
          <div className="text-xl font-semibold text-black">
            Referral
          </div>
          <div className="flex gap-3.5 justify-between text-xs">
            <div className="flex gap-2 border-gray-300 border-[1px] rounded-lg">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                className="aspect-square fill-stone-300 w-[13px] ml-4"
              />
              <input
                type="text"
                placeholder="Search..."
              />
            </div>
            <button
              onClick={() => {
                router.push("/referral/send_referral");
              }}
              className="text-white text-xs font-semibold bg-sky-900 px-4 py-1.5 rounded mr-2"
            >
              Refer a Patient
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col w-[36%]">
            <div className="flex gap-5 px-5 mt-9">
              <div className="w-2.5 bg-blue-500 h-[129px]" />
              <img
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c15d8e78fed1700b5a41fe03386945de7b86991164dd8f5e36bb4f2a9286b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                className="self-start mt-7 w-[43px]"
              />
              <div className="flex flex-col flex-1 my-auto">
                <div className="text-lg font-semibold whitespace-nowrap">
                  {doctorInfo.name}
                  <div className="text-m text-zinc-600">
                    <span className="text-zinc-300 font-medium">{doctorInfo.specialty}</span>
                    <div className="mt-4 text-xs font-medium text-zinc-600">
                      <span className="font-bold">PATIENT</span>: {doctorInfo.patient}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
              <div className="pt-12 pr-20 pb-5 pl-6 bg-white shadow-sm max-md:px-5 max-md:max-w-full">
                <div className="flex max-md">
                  <div className="flex flex-col">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/39731ee2758b1eb02660dc6f2d0e828ff80ed03d23c48b7c7070fb88d8da4492?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      className="mt-4 aspect-square w-[43px]"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
                    <div className="mt-2 text-lg font-semibold text-black">
                      {doctorInfo.name}
                      <div className="text-m text-zinc-600">
                        <span className="text-zinc-300 font-medium">{doctorInfo.specialty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex z-10 flex-col py-11 mt-0 text-xs font-medium leading-5 shadow-sm bg-stone-50 max-md:max-w-full">
                <div className="flex flex-col px-6 max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-4 justify-between text-zinc-600 max-md:flex-wrap max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/857eb5dff49a7bc5e61fc67448243f1588de729714292a08312c0482f523f5b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      className="self-start w-7 aspect-square ml-2"
                    />
                    <div className="grow justify-center px-2 py-5 bg-white rounded shadow-sm max-md:max-w-full">
                      Loremi ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud{" "}
                    </div>
                  </div>
                  <div className="flex gap-4 self-end mt-6 text-white">
                    <div className="grow justify-center px-2 py-3.5 bg-blue-500 rounded shadow-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore.
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f2fa9bc22c05f41ee1e70771f3bc8bd9a8823ec27a71159ef7db0a5a1f043e5?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                      className="self-start w-7 aspect-square "
                    />
                  </div>
                </div>
                <div className="flex gap-4 self-center mt-6 mb-7 text-zinc-600 max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0607a8e021fe8ea071dc1eb7a94f5054c94c2800903170fcca4a9dc807e040ae?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                    className="self-start w-7 aspect-square ml-8"
                  />
                  <div className="grow px-2 pt-5 pb-12 bg-white rounded shadow-sm max-md:max-w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-7 mt-5 whitespace-nowrap grow justify-" style={{ width: "900px" }}>
                <div className="items-start pt-2 pr-2 pl-2 pb-14 rounded-lg bg-stone-50 text-zinc-500">
                  <input
                    type="text"
                    placeholder="Message..."
                    style={{ width: "100%", height: "300%"}}
                  />
                </div>
                <div className=" self-end  py-2 mt-8 text-zinc-500 text-xs font-medium text-white bg-sky-900 rounded">
                  <button  
                    onClick={() => {
                      // Add functionality here
                    }}
                    className="text-white text-xs font-semibold bg-sky-900 px-8 rounded"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
