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
import { getAllergiesDoctor } from "../../../../../../lib/backend/patient/personal_details/master_data";
import { healthRecords } from "../../../../../../lib/backend/health_records/health_records";

export default function PatientAllergies({ params }) {
  const { selected } = useAllergyNav();
  const [medication, setMedication] = React.useState([]);
  const [food, setFood] = React.useState([]);
  const [env, setEnv] = React.useState([]);
  const [refresher, setRefresher] = React.useState(false);
  const patientId = params.patient_id;
  const handleAdd = () => {
    console.log("refreshed");
    setRefresher(!refresher);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allergies = await getAllergiesDoctor(patientId);

        setMedication(allergies["json_object_agg"]["Medication"]);
        setFood(allergies["json_object_agg"]["Food"]);
        setEnv(allergies["json_object_agg"]["Environment"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresher]);

  const [patientData, setPatientData] = React.useState({});
  const [patientFhirData, setPatientFhirData] = React.useState({});

  const calculateAge = (birthdayString) => {
    const birthday = new Date(birthdayString);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDifference = today.getMonth() - birthday.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    return age;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data1 = await healthRecords.getPatientData(patientId);
      const data2 = await healthRecords.getPatientFhirData(patientId);

      setPatientData(data1);
      setPatientFhirData(data2);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(patientData);
    console.log("this is patient data", patientFhirData);
  }, [patientData, patientFhirData]);
  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
        <div className="w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <span className="flex w-[1000px] max-w-full flex-col items-stretch self-start">
                  <PatientProfile
                    photo={patientFhirData?.resource?.photo}
                    name={patientFhirData?.resource?.name}
                    age={calculateAge(patientFhirData?.resource?.birthdate)}
                    gender={patientFhirData?.resource?.gender}
                  />
                </span>
                <AllergiesNav />

                {selected === "Drug" ? (
                  <DrugAllergies onAdd={handleAdd} allergy={medication} patientId={patientId} />
                ) : selected === "Food" ? (
                  <FoodAllergies allergy={food} patientId={patientId} />
                ) : selected === "Environmental" ? (
                  <EnvAllergies allergy={env} patientId={patientId} />
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
