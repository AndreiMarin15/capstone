import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import usePrescriptionsStore from "@/app/prescriptionsStore";
import { getMedicationRequests, retrieveMedicationById, retrieveMedicationsByIds } from "@/backend/health_records/getMedicationRequest";

// const medicine = [
//   {
//     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
//     variable: "Ibuprofen",
//     startdate: "01-24-2024",
//     enddate: "01-30-2024",
//   },
// ];

export default function AddPrescription({ onSave }) {
  const {
    currentScreen,
    setCurrentScreen,
    medications,
    setMedications,
    medicationIds,
    removeMedicationId,
  } = usePrescriptionsStore();

  

  useEffect(() => {
    if (medicationIds.length > 0) {
      fetchMedications();
    }
  }, [medicationIds]);

  const fetchMedications = async () => {
    try {
      const fetchedMedications = await retrieveMedicationsByIds(medicationIds);
      console.log(medicationIds)
      console.log("Retrieved Medication Data:", fetchedMedications);
      setMedications(fetchedMedications);
    } catch (error) {
      console.error("Error fetching medications:", error);
      toast.error("Failed to fetch medications.");
    }
  };

  const handleAddMedication = (medication) => {
    setMedications([...medications, medication]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const medicationDataArray = medications.map((medication, index) => ({

    ...medication, // Ensure all necessary fields like resource_type are included
    resource_type: "MedicationRequest"
  }));

  const prescriptionData = {
    resource: {
      medicationData: medicationDataArray,
      resource_type: "prescription",
    },
  };

  try {
    console.log(prescriptionData)
    await onSave(prescriptionData); // Ensure onSave function handles prescriptionData correctly
    toast.success("Prescription Added");
    setCurrentScreen(0); // Reset to initial screen state after successful save
  } catch (error) {
    console.error("Error creating prescription:", error);
    toast.error("Failed to create prescription.");
  }
};




  return (
    <>
      {currentScreen === 1 ? (
        <>
          <div className="flex justify-between">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
              CREATE PRESCRIPTION
            </div>
            <Button className="mt-5" onClick={() => setCurrentScreen(3)}>
              Add Medicine
            </Button>
          </div>
          <table className="gap-1 whitespace-nowrap mt-10">
         
          {medications?.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="h-8">
                  <td className="w-5">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={"https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"} // Assuming item.src is the URL of the medication image
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[10px] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    {item.resource.medicationCodeableConcept[0]?.coding[0]?.display}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-xs font-regular leading-5 ml-auto">
                      
                    {item.resource.dispenseRequest?.validityPeriod?.start} to {item.resource.dispenseRequest?.validityPeriod?.end}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </table>
          <div className="flex justify-between">
        
          <BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
          <Button onClick={handleSubmit}>SAVE</Button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
