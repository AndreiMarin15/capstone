

import * as React from "react";
import Image from "next/image";

export  function Prescription() {
  return (
    <div className="flex flex-col px-14 py-20 bg-white rounded border border-gray-200 border-solid shadow-sm max-w-[867px] max-md:px-5">
      <div className="flex gap-5 font-semibold leading-5 text-black max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="flex flex-col self-center leading-[150%] max-md:max-w-full">
            <div className="self-center text-xl">Dr. John Matthew Doe</div>
            <div className="mt-4 text-base max-md:max-w-full">
              Internal Medicine - Endocrinology, Diabetes, and Metabolism
            </div>
          </div>
          <div className="flex flex-row justify-between mt-16 text-xs max-md:mt-10 max-md:max-w-full w-full">
            <div>
              Philippine General Hospital <br />
              <span className="font-normal">
                Room 253 W 2-6pm Contact: Aileen 09999999999
              </span>
            </div>
            <div className="justify-between text-right">
              Date Requested <br />{" "}
              <span className="font-normal">April 30, 2024</span>
            </div>
          </div>
          <div className="mt-4 text-xs max-md:max-w-full">
            Taytay Doctors Hospital
            <br />
            <span className="font-normal">
              Room 213T T 1-7pm Contact: OPD Triage 09999999999
            </span>
          </div>
        </div>
      </div>
      <div className="mt-14 max-w-full w-[436px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xs font-semibold leading-5 text-black max-md:mt-10">
              <div className="leading-[150%]">PATIENT INFORMATION</div>
              <div className="mt-6">
                Name
                <br />
                <span className="font-normal">Juan Dela Cruz</span>
              </div>
              <div className="mt-6">
                Age
                <br />
                <span className="font-normal">65 years old</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto text-xs font-semibold leading-5 text-black max-md:mt-10">
              Address
              <br />
              <span className="font-normal">
                #9 Leveriza Street, Pasay City, Metro Manila
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 ml-5 text-xs leading-5 text-black max-md:mt-10 max-md:max-w-full">
        <span className="font-semibold">[Generic Name]</span> (Brand Name)
        [Unit]
        <br />
        <br />
        <span className="font-semibold">Sig:</span> Form, Frequency, Patient
        Instruction
      </div>

      <div className="flex gap-5 justify-between items-start mt-11 w-full text-xs leading-5 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start font-semibold">
          <div className="flex flex-col self-start"></div>
        </div>
        <div className="flex flex-col self-end mt-32 max-md:mt-10">
          <Image
            alt="image"
            loading="lazy"
            srcSet="..."
            className="self-center aspect-[1.92] w-[130px]"
            height={0}
            width={0}
          />
          <div className="flex flex-col mt-2.5">
            <div>License No. 0133564</div>
            <div className="self-end mt-2.5">PTR #3145917</div>
          </div>
        </div>
      </div>
    </div>
  );
}
