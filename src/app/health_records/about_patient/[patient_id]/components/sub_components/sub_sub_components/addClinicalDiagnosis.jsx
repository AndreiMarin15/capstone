import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/router"; // Corrected import path
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import LabTests from "../../labTestsDashboard";
import AddVitals from "./addVitals";

export default function AddClinicalDiagnosis({
  currentScreen,
  setCurrentScreen,
  patientId,
}) {
  const [clinicDate, setClinicDate] = useState("");
  const [suggestedClinicDate, setSuggestedClinicDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");

  const [errorStyles, setErrorStyles] = useState({
    clinicDate: false,
    reviewOfSystems: false,
    signsAndSymptoms: false,
  });

  const validateFields = () => {
    const errors = {
      clinicDate: !clinicDate,
      reviewOfSystems: !reviewOfSystems,
      signsAndSymptoms: !signsAndSymptoms,
    };

    setErrorStyles(errors);
    return !Object.values(errors).some((error) => error);
  };

  const reqField = {
    borderColor: "red",
    borderWidth: "2px",
    borderStyle: "solid",
  };

  useEffect(() => {
    setClinicDate(new Date().toISOString().split("T")[0]);
  }, []);

  let patientDataId;

  const handleSave = async (saveClinicVisit = false) => {
    if (!validateFields()) {
      toast.error("Please fill in all required fields before saving.", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
      return;
    }

    try {
      const doctorInfo = await doctor.getDoctorByCurrentUser();
      setDoctorId(doctorInfo.fullName);
      const patientData = await healthRecords.getPatientData(patientId);
      patientDataId = patientData.id;

      const contained = [
        // Your observations array content here
      ];

      const dataToSave = {
        id: "example",
        period: {
          start: clinicDate,
        },
        participant: {
          type: "Doctor",
          actor: doctorInfo.fullName,
        },
        subject: {
          type: "Patient",
          reference: patientData.id,
        },
        contained: contained,
        resource_type: "Encounter",
      };

      if (saveClinicVisit) {
        const savedData = await uploadEncounter(dataToSave);
        toast.success("Clinic Visit Added", {
          position: "top-left",
          theme: "colored",
          autoClose: 2000,
        });
        setCurrentPage(0);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addLabTestData = (labTestData) => {
    // Check if labTestData is not already an array
    if (!Array.isArray(labTestData)) {
      // If labTestData is not an array, convert it into an array
      labTestData = [labTestData];
    }

    // Add labTestData to the existing labTestDataArray
    setLabTestData([...labTestDataArray, ...labTestData]);

    // Map over labTestData to create new observations
    const newObservations = labTestData?.map((data, index) => ({
      id: `labtest`,
      status: data.status,
      code: {
        coding: [
          {
            code: "YOUR_LOINC_CODE",
            system: "http://loinc.org",
          },
        ],
      },
      subject: {
        type: "Patient",
        reference: data.subject.reference,
      },
      participant: {
        type: "Doctor",
        actor: data.participant.actor,
      },
      resource_type: "Observation",
      valueQuantity: {
        valueQuantities: data.valueQuantities,
      },
      uploadedDateTime: data.dateOfUpdate,
      effectiveDateTime: data.dateOfResult,
      requestedDateTime: clinicDate,
      codeText: data.labTestName,
      imageSrc: data.base64Image,
    }));

    // Update observations with new observations
    setObservations([...observations, ...newObservations]);

    console.log(observations);
  };

  const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "",
    },
  ];

  const diagnosismap = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Initial Diagnosis",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Final Diagnosis",
      value: "",
    },
  ];
  // const [currentScreen, setCurrentScreen] = useState(1);

  return (
    <>
      {currentScreen === 1 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CLINIC VISIT
          </div>

          <div className="flex w-full justify-center">
            <Progress value={50} />
          </div>
          <div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {date.map((item, index) => (
                    <tr key={index}>
                      <td className="w-5">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={item.src}
                          className="self-start aspect-square fill-black w-[15px]"
                        />
                      </td>
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          type="date"
                          value={clinicDate}
                          onChange={(e) => setClinicDate(e.target.value)}
                          className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]`}
                          style={
                            errorStyles.clinicDate
                              ? { borderColor: "red", borderWidth: "2px" }
                              : {}
                          }
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colspan="3" className="font-semibold text-xs py-[20px]">
                      CLINICAL DIAGNOSIS
                    </td>
                  </tr>
                  {diagnosismap.map((item, index) => (
                    <tr key={index} className="align-top">
                      <td className="w-5">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={item.src}
                          className="self-start aspect-square fill-black w-[15px]"
                        />
                      </td>
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <textarea
                          placeholder={"Add diagnosis"}
                          value={diagnosis}
                          className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                          style={{
                            fontSize: "12px",
                            height: "auto",
                          }}
                          wrap="soft"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* BACK & SAVE BUTTON */}
          <div className="flex justify-between items-center mt-5">
            <BackButton
              currentScreen={2}
              setCurrentScreen={setCurrentScreen}
            />
            <div>
              <Button
                onClick={() => {
                  //handleSave(labTestData, true);
                  setCurrentScreen(2); // Update currentScreen to 2
                }} // Pass labTestData and true to indicate saving clinic visit
              >
                NEXT
              </Button>
            </div>
          </div>
        </>
      )}
      {currentScreen === 2 && (
        <>
         
          <AddVitals 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
            patientId={patientId} 
          />
        </>
      )}
    </>
  );
}
