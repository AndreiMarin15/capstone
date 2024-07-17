"use client";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { useCPNav } from "@/app/store";
import ViewCarePlan from "../careplan/components/viewCarePlan";
import { careplanInfo } from "@/backend/patient/careplan/careplan";
import { currentUser } from "@/app/store";

export default function CarePlanDashboard() {
  const { selected } = useCPNav();
  const [careplanInfor, setCareplanInfor] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [carePlan, setCarePlan] = useState({});
  const [showActivePlans, setShowActivePlans] = useState(true); // State to control the visibility

  useEffect(() => {
    const fetchData = async () => {
      const careplanInformation = await careplanInfo.getCareplanInformation(
        currentUser.getState().info.id
      );
      console.log(careplanInformation);
      setCareplanInfor(careplanInformation);
    };

    fetchData();
  }, []);

  const [isTest, setTest] = useState(false);
  const handleSetCurrentScreen = (screen) => {
    setCurrentScreen(screen);
    // if (screen === 2) {
    //   setTest(false);
    // }
  };

  const isDateNotLaterThanToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date >= today;
  };

  const toggleActivePlansVisibility = () => {
    setShowActivePlans(!showActivePlans);
  };

  return (
    <>
      {currentScreen == 1 ? (
        <ViewCarePlan
          currentScreen={currentScreen}
          carePlan={carePlan?.activity}
          setCurrentScreen={handleSetCurrentScreen}
        />
      ) : (
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

                <div className="pl-5 bg-white flex flex-col items-stretch h-screen">
                  <div className="flex gap-5 justify-between text-base max-w-[100%] max-md:flex-wrap">
                    <div className="mt-8 flex gap-1.5">
                      <div className="mt-3 grow font-semibold text-black">
                        Status:{" "}
                      </div>
                      <button
                        className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onClick={toggleActivePlansVisibility}
                      >
                        <div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                          {showActivePlans ? "ACTIVE" : "INACTIVE"}
                        </div>
                      </button>
                    </div>
                  </div>
                  {careplanInfor
                    .filter((value) =>
                      showActivePlans
                        ? isDateNotLaterThanToday(value.resource?.period.end)
                        : !isDateNotLaterThanToday(value.resource?.period.end)
                    )
                    .map((value, index) => (
                      <button
                        key={index}
                        className="flex flex-col mt-5 items-start text-base leading-5 text-black max-w-[800px]"
                        onClick={() => {
                          setCarePlan(value.resource);
                          setCurrentScreen(1);
                        }}
                      >
                        <div className="flex flex-col mt-5 items-start text-base leading-5 text-black">
                          <div className="flex gap-3.5 font-semibold whitespace-nowrap ">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">
                              {value["resource"]?.["title"]}
                            </div>
                          </div>
                          <div className="flex gap-5 self-stretch ml-7 w-full max-md:flex-wrap max-md:max-w-full">
                            <div className="flex gap-1 justify-between font-regular whitespace-nowrap">
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                                className="w-4 aspect-square"
                              />
                              <div className="grow my-auto">
                                Dr.{" "}
                                {value["resource"]?.contributor.length === 1
                                  ? `${
                                      value["resource"]?.contributor[0].display
                                    }${
                                      value[
                                        "resource"
                                      ]?.careTeam?.[0]?.display?.trim()
                                        ? ` & ${value["resource"]?.careTeam[0].display}`
                                        : ""
                                    }`
                                  : value["resource"]?.contributor.length === 2
                                    ? `${
                                        value["resource"]?.contributor[0]
                                          .display
                                      } & ${
                                        careplan["resource"]?.contributor[1]
                                          .display
                                      }${
                                        value[
                                          "resource"
                                        ]?.careTeam?.[0]?.display?.trim()
                                          ? ` & ${value["resource"]?.careTeam[0].display}`
                                          : ""
                                      }`
                                    : `${
                                        value["resource"]?.contributor[0]
                                          .display
                                      } & ${
                                        careplan["resource"]?.contributor
                                          .length - 1
                                      } other/s${
                                        value[
                                          "resource"
                                        ]?.careTeam?.[0]?.display?.trim()
                                          ? ` & ${value["resource"]?.careTeam[0].display}`
                                          : ""
                                      }`}
                              </div>
                              <div className="pl-6 flex-auto my-auto">{`${value.resource?.period.start} - ${value.resource?.period.end}`}</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
