"use client";
import * as React from "react";
import Image from "next/image";
import { useAllergyNav } from "@/app/store";
import AllergiesNav from "./allergiesNav";
import DrugAllergies from "./components/viewDrugAllergies";
import FoodAllergies from "./components/viewFoodAllergies";
import EnvAllergies from "./components/viewEnvAllergies";
import AddAllergy from "./components/addAllergies";

export default function PatientAllergies() {
  const { selected } = useAllergyNav();

  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
        <div className="w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
              <div className="text-black text-xl mt-10 font-semibold leading-8">
                My Health Record - Allergies
              </div>
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <AllergiesNav />

                {selected === "Drug" ? (
                  <DrugAllergies />
                ) : selected === "Food" ? (
                  <FoodAllergies />
                ) : selected === "Environmental" ? (
                  <EnvAllergies />
                ) : selected === "Add Allergy" ? (
                  <AddAllergy />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
