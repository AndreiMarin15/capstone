import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/router"; // Corrected import path
import { useState, useEffect } from "react";
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

  const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "",
    },
  ];

  const signsandsymptoms = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Signs and Symptoms",
      value: "",
    },
  ];

  const reviewofsystems = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Review of Systems",
      value: "",
    },
  ];

  const otherconcerns = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Other Concerns",
      value: "",
    },
  ];

  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <>
      {currentScreen === 0 && (
        <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
          ADD CLINIC VISIT
        </div>
      )}
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
                <td colspan="3" className="font-semibold text-xs mt-15 mb-15">
                  OBSERVATION
                </td>
              </tr>
              {signsandsymptoms.map((item, index) => (
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
                      value={signsAndSymptoms}
                      onChange={(e) => {
                        setSignsAndSymptoms(e.target.value);
                        setErrorStyles({
                          ...errorStyles,
                          signsAndSymptoms: false,
                        });
                      }}
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
              ))}
              {reviewofsystems.map((item, index) => (
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
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="fever"
                          value="Fever"
                          checked={reviewOfSystems.includes("Fever")}
                          onChange={(e) => handleCheckboxChange(e, "Fever")}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Fever</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="weightLoss"
                          value="Weight Loss"
                          checked={reviewOfSystems.includes("Weight Loss")}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Weight Loss")
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Weight Loss</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="poorAppetite"
                          value="Poor Appetite"
                          checked={reviewOfSystems.includes("Poor Appetite")}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Poor Appetite")
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Poor Appetite</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="fatigue"
                          value="Fatigue"
                          checked={reviewOfSystems.includes("Fatigue")}
                          onChange={(e) => handleCheckboxChange(e, "Fatigue")}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Fatigue</span>
                      </label>
                    </div>
                  </td>
                  <td className="border-l-[15px] border-transparent">
                    <div className="flex flex-col gap-1">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="fever"
                          value="Fever"
                          checked={reviewOfSystems.includes("Fever")}
                          onChange={(e) => handleCheckboxChange(e, "Fever")}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Fever</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="weightLoss"
                          value="Weight Loss"
                          checked={reviewOfSystems.includes("Weight Loss")}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Weight Loss")
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Weight Loss</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="poorAppetite"
                          value="Poor Appetite"
                          checked={reviewOfSystems.includes("Poor Appetite")}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Poor Appetite")
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Poor Appetite</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="fatigue"
                          value="Fatigue"
                          checked={reviewOfSystems.includes("Fatigue")}
                          onChange={(e) => handleCheckboxChange(e, "Fatigue")}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Fatigue</span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
              {otherconcerns.map((item, index) => (
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
                      placeholder={"Add other concern/s"}
                      value={otherConcerns}
                      onChange={(e) => {
                        setOtherConcerns(e.target.value);
                        setErrorStyles({
                          ...errorStyles,
                          otherConcerns: false,
                        });
                      }}
                      className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                      style={{
                        fontSize: "12px",
                        height: "auto",
                        whiteSpace: "pre-wrap",
                        ...(item.variable === "Review of Systems" &&
                        errorStyles.otherConcerns
                          ? {
                              ...errorStyles.otherConcerns,
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
