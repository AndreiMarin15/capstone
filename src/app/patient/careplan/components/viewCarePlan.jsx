"use client";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { useCPNav } from "@/app/store";
import BackButton from "../../../health_records/about_patient/[patient_id]/components/sub_components/BackButton";
{
  /* TO DO: Turn into component */
}

export default function ViewCarePlan({
  currentScreen,
  setCurrentScreen,
  carePlan,
}) {
  const { selected } = useCPNav();

  const [currentScreen3, setCurrentScreen3] = useState(0);

  return (
    <>
      {currentScreen === 1 ? (
        <>
          <div className="w-full max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[70%] pl-5 max-md:w-full max-md:ml-0">
                <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                  <span className="flex w-[100%] max-w-full flex-col items-stretch self-start mb-5">
                    <div className="text-black text-xl font-semibold leading-8">
                      Care Plan
                    </div>
                  </span>
                  <hr
                    style={{ borderTop: "1px solid #9CA3AF", width: "100%" }}
                  />
                </span>

                <div className="pl-5 bg-white flex flex-col items-stretch h-full w-full">
                  {carePlan?.map((careplan, index) => (
                    <div
                      key={index}
                      className="flex flex-col mt-10 items-start text-sm leading-5 text-black max-w-[601px]"
                    >
                      <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />

                        <div className="my-auto">
                          {careplan.detail.code.coding[0].display}
                        </div>
                      </div>

                      <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                        <div className="flex gap-5 text-left self-stretch w-full max-md:flex-wrap max-md:max-w-full">
                          <div className="pr-8">
                            <span className="font-normal">
                              {careplan.detail.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-10">
                    <BackButton
                      currentScreen={currentScreen}
                      setCurrentScreen={setCurrentScreen}
                    />
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
