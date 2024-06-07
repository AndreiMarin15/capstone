import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getEncounters } from "@/backend//health_records/getEncounter";
import { getObservation } from "@/backend//health_records/getObservation";
import LaboratoryList from "../../../lab_tests/LaboratoryList";
import BackButton from "./BackButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ClinicVisit({
  currentPage,
  setCurrentPage,
  patientId,
  encounterId,
  clinicVisitNumber,
}) {
  const pdfRef = React.useRef();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [followupData, setFollowupData] = useState([]);
  const [encounterDate, setEncounterDate] = useState("");
  const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");
  const [reviewOfSystems, setReviewOfSystems] = useState("");
  const [otherConcerns, setOtherConcerns] = useState("");
  const [suggestedNextVisit, setSuggestedNextVisit] = useState("");
  const [systolic, setSystolic] = useState(null);
  const [diastolic, setDiastolic] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [condition, setCondition] = useState("");


  let displayReviewOfSystems = "";

  try {
    const reviewOfSystemsSymptoms = JSON.parse(reviewOfSystems);
  
    // Check if reviewOfSystemsSymptoms is an object
    if (typeof reviewOfSystemsSymptoms === "object") {
      // Filter out only true symptoms
      const trueSymptoms = Object.keys(reviewOfSystemsSymptoms).filter(
        (symptom) => reviewOfSystemsSymptoms[symptom] === true
      );
  
      // Join the true symptoms with commas
      displayReviewOfSystems = trueSymptoms.join(", ");
    }
  } catch (error) {
    console.error("Error parsing review of systems:", error);
  }



 const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: encounterDate || "",
    },

  ]
  const followup = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Signs and Symptoms",
      value: signsAndSymptoms || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Review of Systems",
      value: displayReviewOfSystems || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Other Concerns",
      value: otherConcerns || "",
    },
  ];


  const clinicalDiagnosis = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Initial Diagnosis",
      value: diagnosis || "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Final Diagnosis",
      value: finalDiagnosis || "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Suggested Next Clinic Visit",
      value: suggestedNextVisit || "",
    },

  ]

  const clinicVitals = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Systolic Blood Pressure",
      value: systolic || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Diastolic Blood Pressure",
      value: diastolic || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Heart Rate (beats/min)",
      value: heartRate || "",
    },
  ];

  const clinicBiometrics = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Height (cm) ",
      value: height || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
      variable: "Weight (kg)",
      value: weight || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Body Mass Index",
      value: bmi || "",
    },
  ];

  const conditionSeverity = [

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Condition Severity",
      value: condition || "",
    },
  ];
  const [containedIDs, setContainedIDs] = useState([]);
  React.useEffect(() => {
    async function fetchEncountersAndObservations() {
      try {
        // Fetch encounters
        const encountersData = await getEncounters();
  
        // Find the encounter with the matching ID
        const selectedEncounter = encountersData.find(
          (encounter) => encounter.id === encounterId
        );
        console.log("Selected Encounter:", selectedEncounter);
  
        if (!selectedEncounter) {
          console.error("Encounter not found with ID:", encounterId);
          return;
        }
        setEncounterDate(selectedEncounter.resource.period.start);
  
        // Extract contained IDs from the selected encounter
        const encounterContained = selectedEncounter.resource.contained;
        const uniqueContainedIDs = new Set();
        if (Array.isArray(encounterContained) && encounterContained.length > 0) {
          encounterContained.forEach((id) => {
            uniqueContainedIDs.add(id);
          });
        }
  
        // Convert the Set back to an array and update state
        const newContainedIDs = Array.from(uniqueContainedIDs);
        setContainedIDs(newContainedIDs);
        console.log("Contained IDs:", newContainedIDs);
  
        // Fetch observations
        const observationsData = await getObservation();
        console.log("Observations Data:", observationsData);
  
        const observationIds = observationsData?.map((observation) => observation.id);
  
        // Filter observationIds by newContainedIDs
        const filteredObservationIds = observationIds.filter((id) => newContainedIDs.includes(id));
  
        // Extract data within observation.resource based on filteredObservationIds
        const filteredObservationData = observationsData
          .filter((observation) => filteredObservationIds.includes(observation.id))
          ?.map((observation) => observation.resource);
  
        console.log("Filtered Observation Data:", filteredObservationData);
  
        const diagnosisObservation = filteredObservationData.find(
          (observation) => observation.id === "initialDiagnosis"
        );
  
        if (diagnosisObservation) {
          setDiagnosis(diagnosisObservation.valueString);
          console.log("Diagnosis:", diagnosisObservation.valueString);
        }
  
        const finalDiagnosisObservation = filteredObservationData.find(
          (observation) => observation.id === "finalDiagnosis"
        );
  
        if (finalDiagnosisObservation) {
          setFinalDiagnosis(finalDiagnosisObservation.valueString);
          console.log("Final Diagnosis:", finalDiagnosisObservation.valueString);
        }
  
        const signsAndSymptomsObservation = filteredObservationData.find(
          (observation) => observation.id === "signsAndSymptoms"
        );
  
        if (signsAndSymptomsObservation) {
          setSignsAndSymptoms(signsAndSymptomsObservation.valueString);
          console.log("Signs and Symptoms:", signsAndSymptomsObservation.valueString);
        }
  
        const reviewOfSystemsObservation = filteredObservationData.find(
          (observation) => observation.id === "reviewOfSystems"
        );
        if (reviewOfSystemsObservation) {
          setReviewOfSystems(reviewOfSystemsObservation.valueString);
          console.log("Review of Systems:", reviewOfSystemsObservation.valueString);
        }
  
        const otherConcernsObservation = filteredObservationData.find(
          (observation) => observation.id === "otherConcerns"
        );
        if (otherConcernsObservation) {
          setOtherConcerns(otherConcernsObservation.valueString);
          console.log("Other Concerns:", otherConcernsObservation.valueString);
        }
  
        const suggestedNextVisitObservation = filteredObservationData.find(
          (observation) => observation.id === "suggestedNextVisit"
        );
        if (suggestedNextVisitObservation) {
          setSuggestedNextVisit(suggestedNextVisitObservation.valueString);
          console.log("Suggested Next Visit:", suggestedNextVisitObservation.valueString);
        }
  
        const systolicObservation = filteredObservationData.find(
          (observation) => observation.id === "systolic"
        );
        if (systolicObservation) {
          setSystolic(systolicObservation.valueQuantity.value);
          console.log("Systolic:", systolicObservation.valueQuantity.value);
        }
  
        const diastolicObservation = filteredObservationData.find(
          (observation) => observation.id === "diastolic"
        );
        if (diastolicObservation) {
          setDiastolic(diastolicObservation.valueQuantity.value);
          console.log("Diastolic:", diastolicObservation.valueQuantity.value);
        }
  
        const heartRateObservation = filteredObservationData.find(
          (observation) => observation.id === "heartRate"
        );
        if (heartRateObservation) {
          setHeartRate(heartRateObservation.valueQuantity.value);
          console.log("Heart Rate:", heartRateObservation.valueQuantity.value);
        }
  
        const heightObservation = filteredObservationData.find(
          (observation) => observation.id === "height"
        );
        if (heightObservation) {
          setHeight(heightObservation.valueQuantity.value);
          console.log("Height:", heightObservation.valueQuantity.value);
        }
  
        const weightObservation = filteredObservationData.find(
          (observation) => observation.id === "weight"
        );
        if (weightObservation) {
          setWeight(weightObservation.valueQuantity.value);
          console.log("Weight:", weightObservation.valueQuantity.value);
        }
  
        const bmiObservation = filteredObservationData.find(
          (observation) => observation.id === "bmi"
        );
        if (bmiObservation) {
          setBMI(bmiObservation.valueQuantity.value);
          console.log("BMI:", bmiObservation.valueQuantity.value);
        }

        const conditionObservation = filteredObservationData.find(
          (observation) => observation.id === "condition"
        );
        if (conditionObservation) {
          setCondition(conditionObservation.valueString);
          console.log("Condition", conditionObservation.valueString);
        }
  
        console.log("Filtered Observation Data:", filteredObservationData);
      } catch (error) {
        console.error("Error fetching encounters and observations:", error);
      }
    }
  
    fetchEncountersAndObservations();
  }, [patientId, encounterId]);

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`Clinic Visit ${clinicVisitNumber}.pdf`);
    });
  };
  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div ref={pdfRef} className="p-3">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
              CLINIC VISIT
            </div>
            <div
              onClick={downloadPDF}
              className="text-blue-500 text-xs  flex items-center hover:cursor-pointer"
            >
              <Image
                height={0}
                width={0}
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                alt="icon"
                className="w-4 mr-2"
              />
              <span>Download(.pdf)</span>
            </div>

            <div>
            <div className="flex gap-[4rem] align-baseline">
            <table className="max-w-fit border-spacing-y-7 border-separate">
                <tbody className=" text-xs leading-5 text-black ">
                {date?.map((item, index) => (
                    <tr key={index} className="h-8">
                     <td className="w-5 border-l-[16px] border-transparent">
                        <div className="flex items-center">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto ml-2">
                            {item.variable}
                          </div>
                        </div>
                      </td>
                      <td className="border-l-[5rem] border-transparent">
                        {typeof item.value === "string" ? (
                          <div className="text-black text-xs leading-5 ml-auto">
                            {item.value}
                          </div>
                        ) : (
                          <div className="ml-auto">
                            <button
                              onClick={item.value.onClick}
                              className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
                            >
                              {item.value.label}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))} 
                    <div className="text-black text-sm font-bold"> OBSERVATIONS </div>
                    {followup?.map((item, index) => (
                      <tr key={index} className="h-10">
                        <td className="w-5 border-l-[16px] border-transparent">
                          <div className="flex items-center">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src={item.src}
                              className="self-start aspect-square fill-black w-[15px]"
                            />
                            <div className="text-black text-xs font-semibold leading-5 self-center my-auto ml-2 whitespace-nowrap">
                              {item.variable}
                            </div>
                          </div>
                        </td>
                        <td className="border-l-[5rem] border-transparent">
                          {typeof item.value === "string" ? (
                            <div className="text-black text-xs leading-5 ml-auto">
                              {item.value}
                            </div>
                          ) : (
                            <div className="ml-auto">
                              <button
                                onClick={item.value.onClick}
                                className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
                              >
                                {item.value.label}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  <div className="text-black text-sm font-bold" style={{ whiteSpace: 'nowrap' }}>CLINICAL DIAGNOSIS</div>
                  {clinicalDiagnosis?.map((item, index) => (
                    <tr key={index} className="h-10">
                       <td className="w-5 border-l-[16px] border-transparent">
                        <div className="flex items-center">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto ml-2 whitespace-nowrap">
                            {item.variable}
                          </div>
                        </div>
                      </td>
                      <td className="border-l-[5rem] border-transparent">
                        {typeof item.value === "string" ? (
                          <div className="text-black text-xs leading-5 ml-auto">
                            {item.value}
                          </div>
                        ) : (
                          <div className="ml-auto">
                            <button
                              onClick={item.value.onClick}
                              className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
                            >
                              {item.value.label}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/*  VITALS AND BIOMETRICS AND SEVERITY*/}
              <table className="max-w-fit border-spacing-y-7 border-separate">
                <tbody className=" text-xs leading-5 text-black">
                  <div className="text-sm leading-5 text-black font-bold">
                    {" "}
                    VITALS
                    {clinicVitals?.map((item, index) => (
                      <tr key={index} className="h-8">
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
                        <td className="border-l-[16px] border-transparent">
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                            {item.variable}
                          </div>
                        </td>
                        <td className="border-l-[5rem] border-transparent">
                          <div className="text-black text-xs font-normal leading-5 ml-auto">
                            {item.variable === "Heart Rate" ? 70 : item.value}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>

                  <div className="text-sm leading-5 text-black font-bold">
                    {" "}
                    BIOMETRICS
                    {clinicBiometrics?.map((item, index) => (
                      <tr key={index} className="h-8">
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
                        <td className="border-l-[16px] border-transparent">
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                            {item.variable}
                          </div>
                        </td>
                        <td className="border-l-[5rem] border-transparent">
                          <div className="text-black text-xs font-normal leading-5 ml-10">
                            {item.variable === "Heart Rate" ? 70 : item.value}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                  <div className="text-sm leading-5 text-black font-bold">
                    {" "}
                    CONDITION SEVERITY
                    {conditionSeverity?.map((item, index) => (
                      <tr key={index} className="h-8">
                        <td className="border-transparent">
                          <div className="text-black text-xs font-normal leading-5">
                            { item.value}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </div>
                </tbody>
              </table>
            </div>
          </div>
            <BackButton
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        ""
      )}

      {currentScreen === 2 && (
        <>
          <LaboratoryList
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            patientId={patientId}
            encounterId={encounterId}
          />
        </>
      )}
    </>
  );
}
