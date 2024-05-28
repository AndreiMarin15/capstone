import Image from "next/image";
import axios from "axios";
import * as React from "react";
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
    // education: 4,
    currentSmoker: "Currently a Smoker",
    cigsPerDay: "Cigarettes per Day",
    BPMeds: "Taking Blood Pressure Medications",
    prevalentStroke: "Prevalent Strokes in the Past",
    prevalentHyp: "Prevalent Hypertensions in the Past",
    diabetes: 0,
    totChol: 238,
    sysBP: 125,
    diaBP: 80,
    BMI: 19.36,
    heartRate: 60,
    glucose: 66,
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

      <table className="max-w-fit border-spacing-y-7 border-separate text-black">
        {(() => {
          const rows = [];
          for (let i = 0; i < pAnalytics.length; i += 2) {
            const item1 = pAnalytics[i];
            const item2 = i + 1 < pAnalytics.length ? pAnalytics[i + 1] : null;

            rows.push(
              <tr key={`${item1.variable}-${item2 ? item2.variable : ""}`}>
                <td className="border-l-[16px] border-transparent">
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto text-left">
                    {item1.variable}
                  </div>
                </td>

                <td className="border-l-[5rem] border-transparent text-center">
                  <div className="text-black text-xs leading-5 ml-auto text-left">
                    {item1.value}
                  </div>
                </td>

                {item2 && (
                  <td className="border-l-[10rem] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto text-left">
                      {item2.variable}
                    </div>
                  </td>
                )}

                {item2 && (
                  <td className="border-l-[10rem] border-transparent text-center">
                    <div className="text-black text-xs leading-5 ml-auto text-left">
                      {item2.value}
                    </div>
                  </td>
                )}
              </tr>
            );
          }
          return rows;
        })()}
      </table>

      <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
        <button
          onClick={() => {
            window.location.href = "/health_records/about_patient";
          }}
          className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] mt-10 justify-center items-stretch px-5 py-1.5 rounded max-md:px-5"
        >
          Generate
        </button>
      </div>
    </>
  );
}
