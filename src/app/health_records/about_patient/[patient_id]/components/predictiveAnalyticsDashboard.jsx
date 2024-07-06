import Image from "next/image";
import axios from "axios";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  getPatient,
  getObservations,
  getLabTests,
} from "@/backend/predictiveAnalytics/getData";
import { useState } from "react";
export default function PredictiveAnalytics(patientId) {
  const wordMatch = {
    male: "Gender",
    age: "Age",
    education: "Education",
    currentSmoker: "Currently a Smoker",
    cigsPerDay: "Cigarettes per Day",
    BPMeds: "Taking Blood Pressure Medications",
    prevalentStroke: "Prevalent Strokes in the Past",
    prevalentHyp: "Prevalent Hypertensions in the Past",
    diabetes: "Has Diabetes",
    totChol: "Total Cholesterol",
    sysBP: "Systolic",
    diaBP: "Diastolic",
    BMI: "BMI",
    heartRate: "Heart Rate",
    glucose: "Glucose",
  };

  function getAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const [pAnalytics, setPAnalytics] = useState({
    male: 0,
    age: 22,
    education: 4,
    currentSmoker: 1,
    cigsPerDay: 6,
    BPMeds: 0,
    prevalentStroke: 0,
    prevalentHyp: 1,
    diabetes: 1,
    totChol: 150,
    sysBP: 150,
    diaBP: 70,
    BMI: 21.9,
    heartRate: 60,
    glucose: 87,
  });

  const [patient, setPatient] = useState({});

  React.useEffect(() => {
    console.log("PA", pAnalytics);
  }, [pAnalytics]);

  React.useEffect(() => {
    const fetchData = async () => {
      const patientData = await getPatient(patientId);
      setPatient(patientData);
    };
    fetchData();
  }, [patientId]);
  const [observations, setObservations] = useState({});
  const [labtests, setLabtests] = useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const observationsData = await getObservations(patientId);

      for (let key in observationsData) {
        if (observationsData.hasOwnProperty(key)) {
          // Convert the value to a number (integer)
          observationsData[key] = parseInt(observationsData[key]);
        }
      }

      setObservations(observationsData);
    };
    fetchData();
  }, [patientId]);

  React.useEffect(() => {
    const fetchData = async () => {
      const labtestsData = await getLabTests(patientId);

      for (let key in labtestsData) {
        if (labtestsData.hasOwnProperty(key)) {
          labtestsData[key] = parseInt(labtestsData[key]);
        }
      }

      setLabtests(labtestsData);
    };
    fetchData();
  }, [patientId]);

  React.useEffect(() => {
    setPAnalytics({
      male:
        patient?.personal_information?.gender.toLowerCase() === "male" ? 1 : 0,
      age: getAge(patient?.personal_information?.birthdate),
      education: patient?.personal_information?.education ?? 4,
      currentSmoker:
        patient?.social_history?.smoker_status === "Smoker" ? 1 : 0,
      cigsPerDay: patient?.social_history?.cigarettes_per_day ?? 0,
      BPMeds:
        patient?.medical_history?.blood_pressure_medications === true ? 1 : 0,
      prevalentStroke: patient?.medical_history?.stroke === true ? 1 : 0,
      prevalentHyp: patient?.medical_history?.hypertensions === true ? 1 : 0,
      diabetes: patient?.medical_history?.diabetes === true ? 1 : 0,
      totChol: labtests.totChol ?? 0,
      sysBP: observations.sysBP ?? 0,
      diaBP: observations.diaBP ?? 0,
      BMI: observations.BMI ?? 0,
      heartRate: observations.heartRate ?? 0,
      glucose: labtests.glucose ?? 0,
    });
  }, [patient, observations, labtests]);

  const formatValue = (key, value) => {
    const boolean = [
      "currentSmoker",
      "BPMeds",
      "prevalentStroke",
      "prevalentHyp",
      "diabetes",
    ];
    const bp = ["sysBP", "diaBP"];
    if (key == "male") {
      if (value == 1) return "Male";
      return "Female";
    }
    if (boolean.includes(key)) {
      if (value == 1) return "Yes";
      return "No";
    }
    if (bp.includes(key)) return value + " mm Hg";
    if (key == "totChol") return value + " mg/dL";
    if (key == "glucose") return value + " mg/dL";
    return value;
  };
  const [percentage, setPercentage] = React.useState(0);
  const analyze = () => {
    axios
      .post("https://predictive-analytics.onrender.com/predict", pAnalytics)
      .then((res) => {
        setPercentage((res.data.prediction * 100).toFixed(2));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="text-black text-m font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        PREDICTIVE ANALYTICS
      </div>
      <div className="text-justify w-[100%]">
        {" "}
        <div className="font-normal text-xs italic mt-5 mb-5">
          The 10-year chronic heart disease (CHD) risk is a percentage that
          represents your chance of developing CHD within the next 10 years. The
          percentage of accuracy of this model is 85%. It is possible that it
          will decrease if not all data required from the patient is available.
          <div className="mb-5 mt-5" style={{ color: "darkgreen" }}>
            Low risk (less than 10%):{" "}
            <span className="text-black">
              {" "}
              You have a low chance of developing CHD in the next 10 years.{" "}
            </span>
          </div>
          <div className="mb-5" style={{ color: "orange" }}>
            Moderate risk (10% to 20%):{" "}
            <span className="text-black">
              {" "}
              You have an increased chance of developing CHD. Lifestyle changes
              and preventive medications might be recommended by your doctor.{" "}
            </span>
          </div>
          <div className="mb-5" style={{ color: "red" }}>
            High risk (greater than 20%):{" "}
            <span className="text-black">
              You have a significantly high chance of developing CHD. Your
              doctor will likely recommend aggressive treatment strategies,
              including medications and possibly lifestyle changes.{" "}
            </span>
          </div>
        </div>
      </div>

      <table className="max-w-fit border-spacing-y-5 border-spacing-x-[5em] border-separate text-xs">
        {typeof pAnalytics === "object" &&
          Object.keys(pAnalytics).map((keyValue, i) => (
            <>
              <tr key={i}>
                <td>{wordMatch[keyValue]}</td>
                <td>{formatValue(keyValue, pAnalytics[keyValue])}</td>
              </tr>
            </>
          ))}
      </table>

      <div className="font-extrabold text-sm mt-10" style={{ color: "blue" }}>
        Result:{" "}
        <span className="text-sm font-normal text-black">
          {percentage}% Ten Year CHD Probability
        </span>
      </div>
      <div
        className={`text-sm font-bold mb-10 ${
          percentage < 10
            ? "text-green-600"
            : percentage >= 10 && percentage <= 20
              ? "text-orange-500"
              : "text-red-600"
        }`}
      >
        {percentage < 10
          ? " Low Risk"
          : percentage >= 10 && percentage <= 20
            ? "Moderate Risk"
            : " High Risk"}
      </div>

      <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
        <Button onClick={() => analyze()}>Generate</Button>
      </div>
    </>
  );
}
