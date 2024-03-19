"use client";
import * as React from "react";
import Image from "next/image";
import { useAllergyNav } from "@/app/store";
import PatientProfile from "../../../patientProfile";
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
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
                  <PatientProfile />
                </span>
                <AllergiesNav />
               
                {selected === "Drug" ? (
                  <DrugAllergies />
                ) : selected === "Food" ? (
                  <FoodAllergies />
                ) : selected === "Environmental" ? (
                  <EnvAllergies />
                ) : selected === "Add Allergy" ? (
                  <AddAllergy />
                ) :(
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
