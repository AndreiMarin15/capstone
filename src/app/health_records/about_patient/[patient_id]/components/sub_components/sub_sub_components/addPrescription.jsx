import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import usePrescriptionsStore from "@/app/prescriptionsStore";
import { getMedicationRequests, retrieveMedicationById } from "@/backend/health_records/getMedicationRequest";

// const medicine = [
//   {
//     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
//     variable: "Ibuprofen",
//     startdate: "01-24-2024",
//     enddate: "01-30-2024",
//   },
// ];


const sampleMedications = [
  {
    id: "1",
    medicationCodeableConcept: [
      {
        coding: [
          {
            system: "http://www.nlm.nih.gov/research/umls/rxnorm",
            display: "Ibuprofen",
          },
        ],
        text: "Advil",
      },
    ],
    dispenseRequest: {
      validityPeriod: {
        start: "2024-06-15",
        end: "2024-06-30",
      },
    },
  },
  {
    id: "2",
    medicationCodeableConcept: [
      {
        coding: [
          {
            system: "http://www.nlm.nih.gov/research/umls/rxnorm",
            display: "Paracetamol",
          },
        ],
        text: "Tylenol",
      },
    ],
    dispenseRequest: {
      validityPeriod: {
        start: "2024-06-10",
        end: "2024-06-25",
      },
    },
  },
];

export default function AddPrescription({patientId, prescriptionMedications, onSave}) {

  const { currentScreen, setCurrentScreen } = usePrescriptionsStore();
  const [medications, setMedications] = useState([]);
  const [notes, setNotes] = useState("");
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const medicationRequestsData = await getMedicationRequests();
      // Assuming medicationRequestsData is an array of medication requests
      console.log("Medication Requests Data:", medicationRequestsData);

      // Example: Fetching a specific medication by ID
      if (medicationRequestsData.length > 0) {
        const medicationId = medicationRequestsData[0].id; // Example: Get the ID of the first medication request
        const medicationData = await retrieveMedicationById(medicationId);
        console.log("Retrieved Medication Data:", medicationData);

        // Set medications state with fetched data
        setMedications([medicationData]);
      }
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
      id: `medication-${Date.now()}-${index}`,
      ...medication,
    }));

    const prescriptionData = {
      resource: {
        id: `prescription-${Date.now()}`,
        medicationData: sampleMedications,
        resource_type: "prescription",
      },
    };

    try {
      await onSave(prescriptionData);
      toast.success("Prescription Added", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
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
                    {item.medicationCodeableConcept[0]?.coding[0]?.display}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-xs font-regular leading-5 ml-auto">
                      
                    {item.dispenseRequest?.validityPeriod?.start} to {item.dispenseRequest?.validityPeriod?.end}
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
