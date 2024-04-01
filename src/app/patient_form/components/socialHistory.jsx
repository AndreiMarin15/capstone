"use client";

import { usePatientInfo } from "@/app/store";
import { useEffect } from "react";
export default function SignUpSocialHistory() {
  const patientStore = usePatientInfo();

  const disabledInputStyle = {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
  };

  return (
    <div className="container mx-auto mt-16 flex h-auto pb-10">
      {/* Left Column */}
      <div className="w-1/2 pr-8">
        <div className="text-black text-base font-semibold leading-6">
          Social History
        </div>
        <div className="text-zinc-600 text-base leading-6 mt-2">
          Kindly answer the following regarding your social history.
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 pl-8 mr-24">
        <div className="flex items-stretch justify-between gap-5 mr-32 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Smoker Status
            </div>
            <select
              onChange={(e) => {
                patientStore.setSmokerStatus(e.target.value);
              }}
              value={patientStore.social_history.smoker_status}
              className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
            >
              {" "}
              <option value="">Select</option>
              <option value="Smoker">Smoker</option>
              <option value="Non-Smoker">Not a Smoker</option>
            </select>{" "}
          </span>
          <span className="items-start flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Cigarettes per day
            </div>
            <input
              onChange={(e) => {
                patientStore.setCigarettesPerDay(parseInt(e.target.value));
              }}
              value={patientStore.social_history.cigarettes_per_day}
              type="number"
              className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
              style={
                patientStore.social_history.smoker_status === "Non-Smoker"
                  ? disabledInputStyle
                  : {}
              }
              disabled={
                patientStore.social_history.smoker_status === "Non-Smoker"
              }
            ></input>{" "}
          </span>
        </div>

        <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Alcohol Consumption
            </div>
            <select
              onChange={(e) => {
                patientStore.setAlcoholConsumption(e.target.value);
              }}
              value={patientStore.social_history.alcohol_consumption}
              className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
            >
              {" "}
              <option value="">Select</option>
              <option value="Non-Drinker">Non-Drinker</option>
              <option value="Moderate">Moderate Drinker</option>
              <option value="Heavy">Heavy Drinker</option>
            </select>{" "}
          </span>
        </div>

        <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <span className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Physical Activities
            </div>
            <select
              onChange={(e) => {
                patientStore.setPhysicalActivities(e.target.value);
              }}
              value={patientStore.social_history.physical_activities}
              className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
            >
              {" "}
              <option value="">Select</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Low">Low Activity</option>
              <option value="ModerateAct">Moderate Activity</option>
              <option value="High">High Activity</option>
              <option value="Regular">Regular Exercise</option>
            </select>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
