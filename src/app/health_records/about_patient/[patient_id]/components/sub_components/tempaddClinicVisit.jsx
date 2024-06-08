import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMedications from "./addMedication";
import RequestLabTest from "./requestLabTest";
import RecordLabTest from "./recordLabTest";
import BackButton from "./BackButton";
import doctor from "@/backend//health_records/doctor";
import { retrieveDisease } from "@/backend//health_records/getDisease";
import uploadEncounter from "@/backend//health_records/uploadEncounter";
import { getEncounters } from "@/backend//health_records/getEncounter";
import { healthRecords } from "@/backend//health_records/health_records";
import { Progress } from "@/components/ui/progress";

export default function AddClinicVisit({
  currentPage,
  setCurrentPage,
  patientId,
}) {
  const [clinicDate, setClinicDate] = useState("");
  const [suggestedClinicDate, setSuggestedClinicDate] = useState("");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [systolic, setSystolic] = useState(null);
  const [diastolic, setDiastolic] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [reviewOfSystems, setReviewOfSystems] = useState("");
  const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");
  const [otherConcerns, setOtherConcerns] = useState("");
  const [disease, setDisease] = useState([]);
  const [filteredDisease, setFilteredDisease] = useState([]);
  const [filteredFinalDisease, setFilteredFinalDisease] = useState([]);
  const [encountersId, setEncountersId] = useState([]);
  const [labTestData, setLabTestData] = useState([]);
  const [observations, setObservations] = useState([]);
  const [labTestDataArray, setLabTestDataArray] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  const [errorStyles, setErrorStyles] = useState({
    clinicDate: false,
    height: false,
    weight: false,
    bmi: false,
    systolic: false,
    diastolic: false,
    heartRate: false,
    reviewOfSystems: false,
    signsAndSymptoms: false,
  });

  const validateFields = () => {
    // Check if all required fields are filled
    const errors = {
      clinicDate: !clinicDate,
      height: !height,
      weight: !weight,
      bmi: !bmi,
      systolic: !systolic,
      diastolic: !diastolic,
      heartRate: !heartRate,
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

  const handleDiagnosisChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredDisease = disease
      .filter((disease) => {
        const diseaseName = disease["disease"]?.toLowerCase() || "";
        return diseaseName.includes(inputValue);
      })
      .slice(0, 50);
    setFilteredDisease(filteredDisease);
    setDiagnosis(inputValue);
  };

  const handleFinalDiagnosisChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredDisease = disease
      .filter((disease) => {
        const diseaseName = disease["disease"]?.toLowerCase() || "";
        return diseaseName.includes(inputValue);
      })
      .slice(0, 50);
    setFilteredFinalDisease(filteredDisease); // Update filteredFinalDiagnosis
    setFinalDiagnosis(inputValue);
  };

  useEffect(() => {
    // Fetch medications when the component mounts
    const fetchDisease = async () => {
      try {
        const disease = await retrieveDisease();

        setDisease(disease);
        console.log(disease);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchDisease();
  }, []);

  async function retrieveEncounters() {
    try {
      const encountersData = await getEncounters();

      setEncountersId(encountersData[0]?.id);
    } catch (error) {
      console.error("Error retrieving encounters:", error);
    }
  }

  // Call the retrieveEncounters function
  retrieveEncounters();

  let patientDataId;

  const handleSave = async (saveClinicVisit = false) => {
    if (!validateFields()) {
      toast.error("Please fill in all required fields before saving.", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
      return; // Prevent the save operation
    }

    try {
      const doctorInfo = await doctor.getDoctorByCurrentUser();
      setDoctorId(doctorInfo.fullName);
      console.log(doctorInfo.fullName);
      const patientData = await healthRecords.getPatientData(patientId);
      patientDataId = patientData.id;

      const contained = [
        ...observations,
        {
          id: "height",
          code: {
            coding: [
              {
                code: "8302-2",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "cm",
            value: height,
          },
        },
        {
          id: "systolic",
          code: {
            coding: [
              {
                code: "8480-6",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "mmHg",
            value: systolic,
          },
        },
        {
          id: "diastolic",
          code: {
            coding: [
              {
                code: "8462-4",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "mmHg",
            value: diastolic,
          },
        },
        {
          id: "reviewOfSystems",
          code: {
            coding: [
              {
                code: "8687-6",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: reviewOfSystems,
          resource_type: "Observation",
        },
        {
          id: "weight",
          code: {
            coding: [
              {
                code: "29463-7",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "kg",
            value: weight,
          },
        },
        {
          id: "signsAndSymptoms",
          code: {
            coding: [
              {
                code: "33483-9",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: signsAndSymptoms,
          resource_type: "Observation",
        },
        {
          id: "diagnosis",
          code: {
            coding: [
              {
                code: "33483-9",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            //reference id
          },
          valueString: diagnosis,
          resource_type: "Observation",
        },
        {
          id: "finalDiagnosis",
          code: {
            coding: [
              {
                code: "33483-9",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: finalDiagnosis,
          resource_type: "Observation",
        },
        {
          id: "bmi",
          code: {
            coding: [
              {
                code: "39156-5",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "kg/m2",
            value: bmi,
          },
        },
        {
          id: "heartRate",
          code: {
            coding: [
              {
                code: "8867-4",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          resource_type: "Observation",
          valueQuantity: {
            unit: "beats/minute",
            value: heartRate,
          },
        },
        {
          id: "diagnosis",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: diagnosis,
          resource_type: "Observation",
        },
        {
          id: "otherConcerns",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: otherConcerns,
          resource_type: "Observation",
        },
        {
          id: "suggestedNextVisit",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
          },
          valueString: suggestedClinicDate,
          resource_type: "Observation",
        },
      ];
      console.log(contained);
      console.log(patientData);
      console.log(doctorInfo);
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

        console.log("Data saved successfully:", savedData);

        toast.success("Clinic Visit Added", {
          position: "top-left",
          theme: "colored",
          autoClose: 2000,
        });
        setCurrentPage(0);
      }
      // You can also update state or perform other actions after saving data
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
  const followup = [
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

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Signs and Symptoms",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Review of Systems",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Other Concerns",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Tests",
      value: "",
      component: 2,
      requestcomponent: 3,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Suggested Next Clinic Visit",
      value: "",
    },
  ];

  const clinicVitals = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Systolic Blood Pressure",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Diastolic Blood Pressure",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Heart Rate (beats/min)",
      value: "",
    },
  ];
  const clinicBiometrics = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Height (cm)",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
      variable: "Weight (kg)",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Body Mass Index",
      value: "",
    },
  ];
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CLINIC VISIT
          </div>

          <div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {date?.map((item, index) => (
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
                        {item.variable === "Date" ? (
                          <input
                            type="date"
                            value={clinicDate}
                            onChange={(e) => setClinicDate(e.target.value)}
                            className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]'}
							
                            }`}
                            style={
                              errorStyles.clinicDate
                                ? { borderColor: "red", borderWidth: "2px" }
                                : {}
                            }
                          />
                        ) : (
                          <>
                            <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
                            {item.variable === "" ? "" : item.value}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {followup?.map((item, index) => (
                    <tr
                      key={index}
                      className={`h-${
                        item.variable === "Review of Systems" ||
                        item.variable === "Signs and Symptoms"
                          ? "14"
                          : "8"
                      }`}
                    >
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
                        {typeof item.value === "string" ? (
                          item.variable === "Initial Diagnosis" ||
                          item.variable === "Final Diagnosis" ? (
                            <div className="inline-block relative">
                              <textarea
                                value={
                                  item.variable === "Initial Diagnosis"
                                    ? diagnosis
                                    : finalDiagnosis
                                }
                                onChange={(e) => {
                                  if (item.variable === "Initial Diagnosis") {
                                    handleDiagnosisChange(e);
                                  } else if (
                                    item.variable === "Final Diagnosis"
                                  ) {
                                    handleFinalDiagnosisChange(e);
                                  }
                                }}
                                className="text-black rounded shadow-sm mt-2 border-[0.5px] px-6 py-4 border-solid border-black"
                                style={{ height: "auto" }}
                                placeholder="Search for diagnosis..."
                              />
                              {item.variable === "Initial Diagnosis" &&
                                filteredDisease.length > 0 && (
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
                                    {filteredDisease?.map((disease) => (
                                      <li
                                        key={disease.id}
                                        className="border text-black text-sm border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
                                      >
                                        <button
                                          className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
                                          onClick={() => {
                                            console.log(
                                              `Selected Diagnosis: ${disease.disease}`
                                            );
                                            setDiagnosis(disease.disease);
                                            setFilteredDisease([]);
                                          }}
                                        >
                                          {disease.disease}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              {item.variable === "Final Diagnosis" &&
                                filteredFinalDisease.length > 0 && (
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
                                    {filteredFinalDisease?.map((disease) => (
                                      <li
                                        key={disease.id}
                                        className="border text-black text-sm border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
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
                            </div>
                          ) : item.variable === "Tests" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  console.log(
                                    "Item Component:",
                                    item.component
                                  );
                                  setCurrentScreen(item.component);
                                }}
                                className="flex gap-1.5 justify-between px-8 py-1 rounded border-blue-800 text-blue-800 border-solid font-semibold border-1.5"
                              >
                                {item.variable === "Tests" ? "Record" : "Add"}
                              </button>
                              {item.variable === "Tests" && (
                                <button
                                  onClick={() => {
                                    console.log(
                                      "Item Request Component:",
                                      item.requestcomponent
                                    );
                                    setCurrentScreen(item.requestcomponent);
                                  }}
                                  className="flex gap-1.5 justify-between px-8 py-1 rounded border-blue-800 text-blue-800 border-solid font-semibold border-1.5"
                                >
                                  Request
                                </button>
                              )}
                            </div>
                          ) : item.variable ===
                            "Suggested Next Clinic Visit" ? (
                            <input
                              type="date"
                              value={suggestedClinicDate || ""}
                              onChange={(e) =>
                                setSuggestedClinicDate(e.target.value)
                              }
                              className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]'}
							
                            }`}
                              style={
                                errorStyles.clinicDate
                                  ? { borderColor: "red", borderWidth: "2px" }
                                  : {}
                              }
                            />
                          ) : (
                            <textarea
                              placeholder={
                                item.variable === "Signs and Symptoms"
                                  ? "Add signs and symptoms"
                                  : item.variable === "Review of Systems"
                                    ? "Add Review"
                                    : item.variable === "Other Concerns"
                                      ? "Add Concern/s"
                                      : ""
                              }
                              value={
                                item.variable === "Signs and Symptoms"
                                  ? signsAndSymptoms
                                  : item.variable === "Review of Systems"
                                    ? reviewOfSystems
                                    : item.variable === "Other Concerns"
                                      ? otherConcerns
                                      : ""
                              }
                              onChange={(e) => {
                                if (item.variable === "Signs and Symptoms") {
                                  setSignsAndSymptoms(e.target.value);
                                  setErrorStyles({
                                    ...errorStyles,
                                    signsAndSymptoms: false,
                                  }); // Reset error state
                                } else if (
                                  item.variable === "Review of Systems"
                                ) {
                                  setReviewOfSystems(e.target.value);
                                  setErrorStyles({
                                    ...errorStyles,
                                    reviewOfSystems: false,
                                  }); // Reset error state
                                } else if (item.variable === "Other Concerns") {
                                  setOtherConcerns(e.target.value);
                                }
                              }}
                              className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                              style={{
                                height: [
                                  "Review of Systems",
                                  "Signs and Symptoms",
                                ].includes(item.variable)
                                  ? "3rem"
                                  : "auto",
                                whiteSpace: "pre-wrap",
                                ...(item.variable === "Review of Systems" &&
                                errorStyles.reviewOfSystems
                                  ? {
                                      ...errorStyles.reviewOfSystems,
                                      borderColor: "red",
                                      borderWidth: "2px",
                                    }
                                  : item.variable === "Signs and Symptoms" &&
                                      errorStyles.signsAndSymptoms
                                    ? {
                                        ...errorStyles.signsAndSymptoms,
                                        borderColor: "red",
                                        borderWidth: "2px",
                                      }
                                    : {}),
                              }}
                              wrap="soft"
                            />
                          )
                        ) : (
                          <div className="ml-auto">
                            {/* Handle other cases if needed */}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* VITALS AND BIOMETRICS */}
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                  <div className="text-large leading-5 text-black font-bold">
                    {" "}
                    Vitals
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
                        <td className="border-l-[5rem] border-transparent text-xs font-normal">
                          <input
                            placeholder={
                              item.variable === "Systolic Blood Pressure"
                                ? "120"
                                : item.variable === "Diastolic Blood Pressure"
                                  ? "80"
                                  : item.variable === "Heart Rate (beats/min)"
                                    ? "72"
                                    : ""
                            }
                            value={
                              item.variable === "Systolic Blood Pressure"
                                ? systolic || ""
                                : item.variable === "Diastolic Blood Pressure"
                                  ? diastolic || ""
                                  : heartRate || ""
                            }
                            onChange={(e) => {
                              // Update the corresponding state variable based on the input field
                              if (item.variable === "Systolic Blood Pressure") {
                                setSystolic(e.target.value);
                                setErrorStyles({
                                  ...errorStyles,
                                  systolic: false,
                                }); // Reset error state
                              } else if (
                                item.variable === "Diastolic Blood Pressure"
                              ) {
                                setDiastolic(e.target.value);
                                setErrorStyles({
                                  ...errorStyles,
                                  diastolic: false,
                                }); // Reset error state
                              } else if (
                                item.variable === "Heart Rate (beats/min)"
                              ) {
                                setHeartRate(e.target.value);
                                setErrorStyles({
                                  ...errorStyles,
                                  heartRate: false,
                                }); // Reset error state
                              }
                            }}
                            style={
                              item.variable === "Systolic Blood Pressure" &&
                              errorStyles.systolic
                                ? {
                                    ...errorStyles.systolic,
                                    borderColor: "red",
                                    borderWidth: "2px",
                                  }
                                : item.variable ===
                                      "Diastolic Blood Pressure" &&
                                    errorStyles.diastolic
                                  ? {
                                      ...errorStyles.diastolic,
                                      borderColor: "red",
                                      borderWidth: "2px",
                                    }
                                  : item.variable ===
                                        "Heart Rate (beats/min)" &&
                                      errorStyles.heartRate
                                    ? {
                                        ...errorStyles.heartRate,
                                        borderColor: "red",
                                        borderWidth: "2px",
                                      }
                                    : {}
                            }
                            className="grow justify-center items-start py-1.5  text-center whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[60px]"
                          />
                          {item.variable === item.value}
                        </td>
                      </tr>
                    ))}
                  </div>
                  <div className="text-large leading-5 text-black font-bold items-center">
                    {" "}
                    Biometrics
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
                        <td className="border-l-[5rem] border-transparent text-xs font-normal">
                          <input
                            placeholder={
                              item.variable === "Height (cm)"
                                ? "180"
                                : item.variable === "Weight (kg)"
                                  ? "65"
                                  : item.variable === "Body Mass Index"
                                    ? "20"
                                    : ""
                            }
                            value={
                              item.variable === "Height (cm)"
                                ? height
                                : item.variable === "Weight (kg)"
                                  ? weight
                                  : bmi
                            }
                            onChange={(e) => {
                              // Update the corresponding state variable based on the input field
                              if (item.variable === "Height (cm)") {
                                setHeight(e.target.value);
                                setErrorStyles({
                                  ...errorStyles,
                                  height: false,
                                }); // Reset error state
                              } else if (item.variable === "Weight (kg)") {
                                setWeight(e.target.value);
                                setErrorStyles({
                                  ...errorStyles,
                                  weight: false,
                                }); // Reset error state
                              } else if (item.variable === "Body Mass Index") {
                                setBMI(e.target.value);
                                setErrorStyles({ ...errorStyles, bmi: false }); // Reset error state
                              }
                            }}
                            style={
                              item.variable === "Height (cm)" &&
                              errorStyles.height
                                ? {
                                    ...errorStyles.height,
                                    borderColor: "red",
                                    borderWidth: "2px",
                                  }
                                : item.variable === "Weight (kg)" &&
                                    errorStyles.weight
                                  ? {
                                      ...errorStyles.weight,
                                      borderColor: "red",
                                      borderWidth: "2px",
                                    }
                                  : item.variable === "Body Mass Index" &&
                                      errorStyles.bmi
                                    ? {
                                        ...errorStyles.bmi,
                                        borderColor: "red",
                                        borderWidth: "2px",
                                      }
                                    : {}
                            }
                            className="grow justify-center items-start py-1.5  ml-10 text-center whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[60px]"
                          />
                          {item.variable === item.value}
                        </td>
                      </tr>
                    ))}
                  </div>
                </tbody>
              </table>
            </div>
          </div>
          {/* BACK & SAVE BUTTON */}
          <div className="flex justify-between items-center mt-5">
            <BackButton
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <div>
              <button
                onClick={() => handleSave(labTestData, true)} // Pass labTestData and true to indicate saving clinic visit
                className="flex items-center justify-center px-5 py-1 rounded border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
              >
                SAVE
              </button>
            </div>
          </div>
        </>
      ) : currentScreen === 1 ? (
        <AddMedications
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
        />
      ) : currentScreen === 2 ? (
        <RecordLabTest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
          handleSave={(data) => {
            addLabTestData(data);
            handleSave(false);
          }}
        />
      ) : currentScreen === 3 ? (
        <RequestLabTest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
          doctorId={doctorId}
          handleSave={(data) => {
            addLabTestData(data);
            handleSave(false);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}