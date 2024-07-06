"use client";

import * as React from "react";
import ProgressBarWrite from "../components/progressBarWrite";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/referralPatients";
import WriteReferral from "../components/writeReferral";
import retrieveReferralData from "@/backend/referral/retrieveReferralData";
import sendReferralData from "@/backend/referral/sendReferralData";
import { addAttendingDoctor } from "@/backend/attending_doctors/attending_doctors";

export default function SendReferral() {
  const router = useRouter();
  const [patients, setPatients] = React.useState([]);
  const [currentState, setCurrentState] = React.useState(1);
  const [selectedPatientId, setSelectedPatientId] = React.useState(null);
  const [isMatched, setIsMatched] = React.useState(false);
  const [referralData, setReferralData] = React.useState({
    doctor_name: "",
    specialization: "",
    place_of_clinic: "",
    contact: "",
    reason_for_referral: "",
    medications: "",
    other_remarks: "",
    lab_tests: [],
    signature: "",
  });

  React.useEffect(() => {
    console.log(referralData);
  }, [referralData]);

  React.useEffect(() => {
    const fetchData = async () => {
      const patients = await retrieveReferralData.getFilteredPatients();
      console.log(patients);
      setPatients(patients);
    };

    fetchData();
  }, []);
  function splitName(name) {
    const lastSpaceIndex = name.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return [name]; // Return the original name in an array if there's no space.
    }
    return [
      name.substring(0, lastSpaceIndex),
      name.substring(lastSpaceIndex + 1),
    ];
  }
  return (
    <div className="bg-white flex flex-col items-stretch pb-8 h-[100vh]">
      <div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">
        Referral
      </div>
      <ProgressBarWrite currentStep={currentState} />
      <>
        <div className={(currentState === 2 ? "pb-20" : "") + " overflow-auto"}>
          {patients.length > 0 ? (
            <>
              {currentState === 1 ? (
                patients?.map((item) => (
                  <div key={item.id}>
                    <div
                      onClick={() => {
                        setSelectedPatientId(item.id);
                      }}
                    >
                      <ReferralPatients
                        name={item.name}
                        age={item.age}
                        id={item.id}
                        photo={item.photo}
                        selectedId={selectedPatientId}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <WriteReferral
                  referralData={referralData}
                  setReferralData={setReferralData}
                  selectedPatientId={selectedPatientId}
                  isMatched={isMatched}
                  setIsMatched={setIsMatched}
                />
              )}
            </>
          ) : (
            <>Loading Data...</>
          )}
        </div>
      </>
      <div className="w-full flex justify-between px-14 max-md:max-w-full max-md:px-5">
        {currentState > 1 ? (
          <button
            onClick={() => {
              if (currentState > 1) {
                setCurrentState(currentState - 1);
              }
            }}
            className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2 px-6 py-2 rounded max-md:px-3"
          >
            BACK
          </button>
        ) : (
          <div></div>
        )}

        {currentState === 1 && (
          <button
            onClick={() => {
              router.back();
            }}
            className="mt-5 text-white text-xs font-semibold whitespace-nowrap items-stretch bg-gray-400 mr-2 px-6 py-2 rounded"
            style={{ marginRight: "auto" }}
          >
            BACK
          </button>
        )}

        <button
          onClick={async () => {
            if (currentState < 2) {
              setCurrentState(currentState + 1);
            } else if (currentState === 2) {
              const splitname = splitName(referralData.doctor_name);
              const attendingDoctor = {
                patient: {
                  id: selectedPatientId,
                },
                doctor: {
                  first_name: splitname[0],
                  last_name: splitname[1],
                  doctor_specialization: referralData.specialization,
                  doctor_years: null,
                  doctor_first_name: splitname[0],
                  doctor_last_name: splitname[1],
                  license_id: null,
                  doctor_id: null,
                  status: "accepted",
                  clinic: referralData.place_of_clinic,
                  contact: referralData.contact,
                },
              };
              if (isMatched === false) {
                await addAttendingDoctor(
                  attendingDoctor.doctor,
                  attendingDoctor.patient
                );
              }
              await sendReferralData.sendWrittenReferral(
                referralData,
                selectedPatientId
              );
              router.push("/referral");
            }
          }}
          className={`mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2 px-6 py-2 rounded max-md:px-3`}
        >
          {currentState === 3 ? "SEND" : "NEXT"}
        </button>
      </div>
    </div>
  );
}
