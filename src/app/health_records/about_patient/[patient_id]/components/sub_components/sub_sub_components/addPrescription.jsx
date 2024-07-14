import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import usePrescriptionsStore from "@/app/prescriptionsStore";
import {
  deleteMedicationById,
  retrieveMedicationsByIds,
} from "@/backend/health_records/getMedicationRequest";
import { UploadSignature } from "../uploadSignature";

export default function AddPrescription({ onSave, fetchPrescriptions }) {
  const {
    currentScreen,
    setCurrentScreen,
    medications,
    setMedications,
    medicationIds,
    setMedicationIds,
    setEditingMedicationId,
    editingMedicationId,
    fetchMedications,
  } = usePrescriptionsStore();

  useEffect(() => {
    fetchMedications();
  }, []);

  useEffect(() => {
    fetchMedications(); // Call fetchMedications from Zustand when component mounts
  }, []);

  const handleEditMedication = (medicationId) => {
    console.log("Edit medication with ID:", medicationId);
    setEditingMedicationId(medicationId);
    setCurrentScreen(4);
  };

  const handleRemoveMedication = async (deletionId) => {
    // Remove locally
    const newMedications = medications.filter((item) => item.id !== deletionId);
    setMedications(newMedications);
    try {
      await deleteMedicationById(deletionId);
      toast.error("Medication Deleted", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    } catch (error) {
      console.error("Error deleting medication from database:", error);
      toast.error("Failed to delete medication from database.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const medicationDataArray = medications.map((medication, index) => ({
      ...medication,
      resource_type: "MedicationRequest",
    }));

    const prescriptionData = {
      resource: {
        medicationData: medicationDataArray,
        resource_type: "prescription",
      },
    };

    try {
      console.log(prescriptionData);
      await onSave(prescriptionData);
      setMedicationIds([]);
      fetchPrescriptions();
      setCurrentScreen(0);
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
          {/* <UploadSignature /> */}
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
                      src={
                        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      } // Assuming item.src is the URL of the medication image
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[10px] border-transparent">
                    <div className="text-black text-sm font-semibold leading-5 my-auto">
                      {
                        item.resource.medicationCodeableConcept?.[0]
                          ?.coding?.[0]?.display
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-sm font-regular leading-5 ml-0.5">
                      From{" "}
                      {item.resource.dispenseRequest?.validityPeriod?.start} to{" "}
                      {item.resource.dispenseRequest?.validityPeriod?.end}
                    </div>
                  </td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-sm font-regular leading-5 ml-0.5">
                      <Button
                        className="mr-1"
                        variant="outline"
                        onClick={() => handleEditMedication(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveMedication(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="flex  border-l-[5px] border-transparent">
                    <div
                      className="text-black text-sm font-regular leading-5"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Dosage:</span>{" "}
                      {
                        item.resource.dosageInstruction?.[0]?.doseAndRate?.[0]
                          ?.doseQuantity?.doseUnit
                      }
                    </div>
                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Form:</span>{" "}
                      {item.resource.form?.text}
                    </div>
                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Frequency:</span>{" "}
                      {item.resource.dispenseRequest?.dispenseInterval}
                    </div>

                    <div
                      className="text-black text-sm font-regular leading-5 ml-10"
                      style={{ whiteSpace: "normal", maxWidth: "200px" }}
                    >
                      <span className="font-semibold">Instructions:</span>{" "}
                      {item.resource.note}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </table>
          <div className="flex justify-between mt-10">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
            <Button onClick={handleSubmit}>SAVE</Button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
