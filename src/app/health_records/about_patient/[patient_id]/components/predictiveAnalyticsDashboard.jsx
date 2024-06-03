import Image from "next/image";
import axios from "axios";
import * as React from "react";
import { Button } from "@/components/ui/button";
export default function PredictiveAnalytics(patientId) {
  // PUBLIC
  // patient:
  //     gender(Female/Male) //convert to 1 for male
  //     birthdate // convert to age
  //     identifier
  // Observation:
  //     systolic //sysBP
  //     diastolic //diaBP
  //     bmi //BMI
  //     heartRate //heartRate

  // PROJECT
  // ----
  // patients:
  //     medical_history
  //         prevalentHyp //hypertensions
  //         BPMeds //blood_pressure_medications
  //         prevalentStroke: 0,
  //     social_history
  //         currentSmoker: 1,
  //         cigsPerDay: 15,
  //     glucose

  // education: 4,
  // diabetes: 0,
  // totChol: 238,
  // sysBP: 125,

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
  const pAnalytics = {
    male: 1,
    age: 51,
    education: 4,
    currentSmoker: 1,
    cigsPerDay: 15,
    BPMeds: 0,
    prevalentStroke: 0,
    prevalentHyp: 0,
    diabetes: 0,
    totChol: 238,
    sysBP: 125,
    diaBP: 80,
    BMI: 19.36,
    heartRate: 60,
    glucose: 66,
  };
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
    if (bp.includes(key)) return value + " mmHg";
    if (key == "totChol") return value + " mm/dL";
    if (key == "glucose") return value + " mg/dL";
    return value;
  };
  const [percentage, setPercentage] = React.useState(0);

  React.useEffect(() => {
    axios
      .post("https://predictive-analytics.onrender.com/predict", pAnalytics)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        PREDICTIVE ANALYTICS
      </div>
      <table className="max-w-fit border-spacing-y-5 border-separate text-xs">
        {Object.keys(pAnalytics).map((key, i) =>
          key != "education" ? (
            <>
              <tr key={i}>
                <td>{wordMatch[key]}</td>
                <td className="pl-8">{formatValue(key, pAnalytics[key])}</td>
              </tr>
            </>
          ) : null
        )}
      </table>

      <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
        <Button
          onClick={() => {
            window.location.href = "/health_records/about_patient";
          }}
        >
          Generate
        </Button>
      </div>
    </>
  );
}
