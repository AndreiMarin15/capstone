import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/router"; // Corrected import path
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import LabTests from "../../labTestsDashboard";
import ClinicalDiagnosis from "./addClinicalDiagnosis";
import RequestLab from "../requestLabTest";
import AddVitals from "../sub_sub_components/addVitals";
import AddAnalysis from "./addAnalysis";
export default function AddObservation({
  currentPage,
  setCurrentPage,
  patientId,
}) {
  const [clinicDate, setClinicDate] = useState("");
  const [reviewOfSystems, setReviewOfSystems] = useState({});
  const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
  const [otherConcerns, setOtherConcerns] = useState("");
  const [labTestData, setLabTestData] = useState([]);
  const [observations, setObservations] = useState([]);
  const [labTestDataArray, setLabTestDataArray] = useState([]);
  const [doctorId, setDoctorId] = useState("");

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

  const handleCheckboxChange = (e, dataset) => {
    if (dataset in reviewOfSystems) {
      setReviewOfSystems({ ...reviewOfSystems, [dataset]: e.target.checked });
      console.log(reviewOfSystems);
      return;
    }
    setReviewOfSystems({ ...reviewOfSystems, [dataset]: true });
    console.log(reviewOfSystems);
  };
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

  const fields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Signs and Symptoms",
      name: "signsAndSymptoms",
      value: signsAndSymptoms,
      type: "textarea",
      onChange: (e) => {
        setSignsAndSymptoms(e.target.value);
        setErrorStyles({
          ...errorStyles,
          signsAndSymptoms: false,
        });
      },
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Review of Systems",
      name: "ros",
      value: "",
      type: "checkbox",
      checkboxList: [
        { name: "fever", value: "Fever" },
        { name: "weightLoss", value: "Weight Loss" },
        { name: "poorAppetite", value: "Poor Appetite" },
        { name: "fatigue", value: "Fatigue" },
      ],
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Other Concerns",
      name: "otherConcerns",
      value: otherConcerns,
      type: "textarea",
      onChange: (e) => {
        setOtherConcerns(e.target.value);
        setErrorStyles({
          ...errorStyles,
          otherConcerns: false,
        });
      },
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Request",
      name: "tests",
      type: "button",
      saveFunction: () => {
        setCurrentScreen(2);
      },
    },
  ];
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <>
      {currentScreen === 0 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CLINIC VISIT
          </div>

          <div className="flex w-full justify-center">
            <Progress value={25} />
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
                      OBSERVATION
                    </td>
                  </tr>
                  {fields.map((item, index) =>
                    item.type === "textarea" ? (
                      <>
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
                              placeholder={"Add signs and symptoms"}
                              name={item.name}
                              value={item.value}
                              onChange={item.onChange}
                              className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                              style={{
                                fontSize: "12px",
                                height: "auto",
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
                          </td>
                        </tr>
                      </>
                    ) : item.type === "checkbox" ? (
                      <>
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
                            <div className="flex flex-col gap-1">
                              {item.checkboxList.map(
                                (dataset, datasetIndex) => {
                                  return (
                                    <>
                                      <label className="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          name={dataset.name}
                                          value={reviewOfSystems[dataset.name]}
                                          onChange={(e) => {
                                            handleCheckboxChange(
                                              e,
                                              dataset.value
                                            );
                                          }}
                                          className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2">
                                          {dataset.value}
                                        </span>
                                      </label>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </td>
                        </tr>
                      </>
                    ) : item.type === "button" ? (
                      <>
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
                            <Button
                              variant="outline"
                              onClick={item.saveFunction}
                            >
                              Request
                            </Button>
                          </td>
                        </tr>
                      </>
                    ) : null
                  )}
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
              <Button
                onClick={() => {
                  // handleSave(labTestData, true);
                  setCurrentScreen(1);
                }} // Pass labTestData and true to indicate saving clinic visit
              >
                NEXT
              </Button>
            </div>
          </div>
        </>
      )}{" "}
      {currentScreen === 1 ? (
        <ClinicalDiagnosis currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
        
      ) : currentScreen === 2 ? (
        <AddVitals currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} patientId={patientId} /> 
       ) : currentScreen === 4 ? (
        <AddAnalysis currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} patientId={patientId} /> 
       )
       : currentScreen === 5 ? (
        <RequestLab
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
