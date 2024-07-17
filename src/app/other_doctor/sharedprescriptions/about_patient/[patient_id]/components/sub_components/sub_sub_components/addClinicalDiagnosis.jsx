import Image from "next/image";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import AddVitals from "./addVitals";
import { retrieveDisease } from "@/backend/health_records/getDisease";
import useClinicVisitStore from "@/app/clinicVisitStore";

export default function AddClinicalDiagnosis({
  handleNext,
  currentScreen,
  setCurrentScreen,
}) {
  const clinicDate = useClinicVisitStore((state) => state.clinicDate);
  const setClinicDate = useClinicVisitStore((state) => state.setClinicDate);
  const suggestedDate = useClinicVisitStore((state) => state.suggestedDate);
  const setSuggestedDate = useClinicVisitStore(
    (state) => state.setSuggestedDate
  );
  const initialDiagnosis = useClinicVisitStore(
    (state) => state.initialDiagnosis
  ); // Retrieve initial diagnosis from store
  const finalDiagnosis = useClinicVisitStore((state) => state.finalDiagnosis); // Retrieve final diagnosis from store
  const setInitialDiagnosis = useClinicVisitStore(
    (state) => state.setInitialDiagnosis
  );
  const setFinalDiagnosis = useClinicVisitStore(
    (state) => state.setFinalDiagnosis
  );

  const [filteredDisease, setFilteredDisease] = useState([]);
  const [filteredFinalDisease, setFilteredFinalDisease] = useState([]);
  const [disease, setDisease] = useState([]);

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const diseaseData = await retrieveDisease();
        setDisease(diseaseData);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    fetchDisease();
  }, []);

  const handleDiagnosisChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredDisease = disease
      .filter((disease) => {
        const diseaseName = disease["disease"]?.toLowerCase() || "";
        return diseaseName.includes(inputValue);
      })
      .slice(0, 50);
    setFilteredDisease(filteredDisease);
    setInitialDiagnosis(inputValue);
  };

  const handleFinalDiagnosisChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredDisease = disease
      .filter((disease) => {
        const diseaseName = disease["disease"]?.toLowerCase() || "";
        return diseaseName.includes(inputValue);
      })
      .slice(0, 50);
    setFilteredFinalDisease(filteredDisease);
    setFinalDiagnosis(inputValue);
  };

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

  const handleSave = async (saveClinicVisit = false) => {
    if (!validateFields()) {
      toast.error("Please fill in all required fields before saving.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
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
          autoClose: 8000,
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

  const suggesteddate = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Suggested Next Visit",
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
                <tbody className="text-sm leading-5 text-black">
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto mr-20">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          type="date"
                          value={clinicDate}
                          onChange={(e) => setClinicDate(e.target.value)}
                          className={`grow justify-center items-start py-1.5 pl-2 ml-5 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[100%]`}
                          style={
                            errorStyles.clinicDate
                              ? { borderColor: "red", borderWidth: "2px" }
                              : {}
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="diagnosis-textareas">
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-sm leading-5 text-black">
                  <tr>
                    <td colspan="3" className="font-semibold text-sm py-[20px]">
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto mr-9">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <textarea
                          placeholder={"Add diagnosis"}
                          value={
                            item.variable === "Initial Diagnosis"
                              ? initialDiagnosis
                              : finalDiagnosis
                          }
                          onChange={
                            item.variable === "Initial Diagnosis"
                              ? handleDiagnosisChange
                              : handleFinalDiagnosisChange
                          }
                          className={`grow justify-center items-start py-1.5 pl-2 px-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black`}
                          style={{
                            fontSize: "14px",
                            height: "80px",
                            width: "400px",
                          }}
                          wrap="soft"
                        />
                        {item.variable === "Initial Diagnosis" && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "unset",
                              margin: "unset",
                              position: "absolute",
                              width: "400px", // Subtract 4px for the border width
                              maxHeight: "300px", // Adjust the maximum height as needed
                              overflowY: "auto", // Enable vertical scrolling if needed
                              overflowX: "hidden",
                              zIndex: 999, // Set a higher z-index value
                            }}
                          >
                            {filteredDisease.map((disease) => (
                              <li
                                key={disease.id}
                                className="border text-black text-base border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
                              >
                                <button
                                  className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
                                  onClick={() => {
                                    console.log(
                                      `Selected Diagnosis: ${disease.disease}`
                                    );
                                    setInitialDiagnosis(disease.disease);
                                    setFilteredDisease([]);
                                  }}
                                >
                                  {disease.disease}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.variable === "Final Diagnosis" && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "unset",
                              margin: "unset",
                              position: "absolute",
                              width: "400px", // Subtract 4px for the border width
                              maxHeight: "300px", // Adjust the maximum height as needed
                              overflowY: "auto", // Enable vertical scrolling if needed
                              overflowX: "hidden",
                            }}
                          >
                            {filteredFinalDisease.map((disease) => (
                              <li
                                key={disease.id}
                                className="border text-black text-base border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
                              >
                                <button
                                  className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
                                  onClick={() => {
                                    console.log(
                                      `Selected Final Diagnosis: ${disease.disease}`
                                    );
                                    setFinalDiagnosis(disease.disease);
                                    setFilteredFinalDisease([]);
                                  }}
                                >
                                  {disease.disease}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-sm leading-5 text-black">
                  {suggesteddate.map((item, index) => (
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto mr-5">
                          {item.variable}
                        </div>
                      </td>
                      <td className=" border-transparent">
                        <input
                          type="date"
                          value={suggestedDate}
                          onChange={(e) => setSuggestedDate(e.target.value)}
                          className={`grow justify-center items-start py-1.5 pl-2 mr-5 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[100%]`}
                          style={
                            errorStyles.suggestedDate
                              ? { borderColor: "red", borderWidth: "2px" }
                              : {}
                          }
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
            <BackButton currentScreen={1} setCurrentScreen={setCurrentScreen} />
            <div>
              <Button
                onClick={() => {
                  setCurrentScreen(2); // Update currentScreen to 2
                }}
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
