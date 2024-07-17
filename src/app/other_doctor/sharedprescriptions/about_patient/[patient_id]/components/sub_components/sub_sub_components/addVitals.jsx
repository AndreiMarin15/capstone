import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Analysis from "./addAnalysis";
import useClinicVisitStore from "@/app/clinicVisitStore"; // Import Zustand store
import { toast } from "react-toastify";

export default function AddVitals({
  currentScreen,
  setCurrentScreen,
  handleNext,
  handleBack,
  patientId,
}) {
  const clinicDate = useClinicVisitStore((state) => state.clinicDate);
  const setClinicDate = useClinicVisitStore((state) => state.setClinicDate);

  const { vitals, setVitals } = useClinicVisitStore(); // Access vitals from store

  const [isNextPressed, setIsNextPressed] = useState(false); // State to track if the Next button is pressed

  const handleSave = () => {
    setCurrentScreen(4);
  };

  const validateInputs = () => {
    let valid = true;

    if (!vitals.systolic) {
      toast.error("Systolic Blood Pressure is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }
    if (!vitals.diastolic) {
      toast.error("Diastolic Blood Pressure is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }
    if (!vitals.heartRate) {
      toast.error("Heart Rate is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }
    if (!vitals.height) {
      toast.error("Height is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }
    if (!vitals.weight) {
      toast.error("Weight is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }
    if (!vitals.bmi) {
      toast.error("Body Mass Index is required.", { position: "top-left",
                      theme: "colored",
                      autoClose: 8000, });
      valid = false;
    }

    return valid;
  };

  const handleNextClick = () => {
    setIsNextPressed(true);
    if (validateInputs()) {
      handleNext();
    }
  };

  const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "",
    },
  ];

  const clinicVitals = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Systolic Blood Pressure *",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Diastolic Blood Pressure *",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Heart Rate (beats/min) *",
      value: "",
    },
  ];

  const clinicBiometrics = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Height (cm) *",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
      variable: "Weight (kg) *",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Body Mass Index *",
      value: "",
    },
  ];

  return (
    <>
      {currentScreen === 2 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CLINIC VISIT
          </div>

          <div className="flex w-full justify-center">
            <Progress value={75} />
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          type="date"
                          value={clinicDate}
                          onChange={(e) => setClinicDate(e.target.value)}
                          className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5`}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colspan="3" className="font-semibold text-sm py-[20px]">
                      VITALS
                    </td>
                  </tr>
                  {clinicVitals.map((item, index) => (
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          type="number"
                          placeholder={"Add"}
                          value={
                            item.variable === "Systolic Blood Pressure *"
                              ? vitals.systolic || ""
                              : item.variable === "Diastolic Blood Pressure *"
                                ? vitals.diastolic || ""
                                : item.variable === "Heart Rate (beats/min) *"
                                  ? vitals.heartRate || ""
                                  : ""
                          }
                          onChange={(e) => {
                            if (item.variable === "Systolic Blood Pressure *") {
                              setVitals({
                                ...vitals,
                                systolic: e.target.value,
                              });
                            } else if (
                              item.variable === "Diastolic Blood Pressure *"
                            ) {
                              setVitals({
                                ...vitals,
                                diastolic: e.target.value,
                              });
                            } else if (
                              item.variable === "Heart Rate (beats/min) *"
                            ) {
                              setVitals({
                                ...vitals,
                                heartRate: e.target.value,
                              });
                            }
                          }}
                          className={`justify-center items-start pl-2 rounded border-black border-solid shadow-sm border-[0.5px] text-black`}
                          style={{
                            fontSize: "14px",
                            width: "50px",
                            height: "30px",
                            resize: "none",
                            borderColor:
                              isNextPressed &&
                              !(
                                (item.variable ===
                                  "Systolic Blood Pressure *" &&
                                  vitals.systolic) ||
                                (item.variable ===
                                  "Diastolic Blood Pressure *" &&
                                  vitals.diastolic) ||
                                (item.variable === "Heart Rate (beats/min) *" &&
                                  vitals.heartRate)
                              )
                                ? "red"
                                : "black",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colspan="3" className="font-semibold text-sm py-[20px]">
                      BIOMETRICS
                    </td>
                  </tr>
                  {clinicBiometrics.map((item, index) => (
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
                        <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          type="number"
                          placeholder={"Add"}
                          value={
                            item.variable === "Height (cm) *"
                              ? vitals.height || ""
                              : item.variable === "Weight (kg) *"
                                ? vitals.weight || ""
                                : item.variable === "Body Mass Index *"
                                  ? vitals.bmi || ""
                                  : ""
                          }
                          onChange={(e) => {
                            if (item.variable === "Height (cm) *") {
                              setVitals({ ...vitals, height: e.target.value });
                            } else if (item.variable === "Weight (kg) *") {
                              setVitals({ ...vitals, weight: e.target.value });
                            } else if (item.variable === "Body Mass Index *") {
                              setVitals({ ...vitals, bmi: e.target.value });
                            }
                          }}
                          className={`justify-center items-start pl-2 rounded border-black border-solid shadow-sm border-[0.5px] text-black`}
                          style={{
                            fontSize: "14px",
                            width: "50px",
                            height: "30px",
                            resize: "none",
                            borderColor:
                              isNextPressed &&
                              !(
                                (item.variable === "Height (cm) *" &&
                                  vitals.height) ||
                                (item.variable === "Weight (kg) *" &&
                                  vitals.weight) ||
                                (item.variable === "Body Mass Index *" &&
                                  vitals.bmi)
                              )
                                ? "red"
                                : "black",
                          }}
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
            <BackButton currentScreen={2} setCurrentScreen={setCurrentScreen} />
            <div>
              <Button onClick={handleNextClick}>NEXT</Button>
            </div>
          </div>
        </>
      )}
      {currentScreen === 3 && (
        <>
          <Analysis
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            patientId={patientId}
          />
        </>
      )}
    </>
  );
}
