"use client";

import * as React from "react";
import ProgressBar from "../components/progressBar";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/referralPatients";
import ReferralDoctors from "../components/referralDoctor";
import NotesAndReview from "../components/notesAndReview";
const navigation = [
  {
    name: "DELA CRUZ, Juan",
    age: "70",
    href: "",
    src: "",
  },
  {
    name: "RIZAL, Jose",
    age: "43",
    href: "",
    src: "",
  },
  {
    name: "BONIFACIO, Andres",
    age: "39",
    href: "",
    src: "",
  },
  {
    name: "QUEZON, Manuel",
    age: "44",
    href: "",
    src: "",
  },
  {
    name: "SORA, Tandang",
    age: "61",
    href: "",
    src: "",
  },
  {
    name: "LUNA, Juan",
    age: "30",
    href: "",
    src: "",
  },
  {
    name: "LUNA, Antonio",
    age: "18",
    href: "",
    src: "",
  },
];

const navigation2 = [
  {
    name: "SKYWALKER, Anakin",
    age: "71",
    href: "",
    src: "",
  },
  {
    name: "SOLO, Han",
    age: "43",
    href: "",
    src: "",
  },
  {
    name: "KENOBI, Obi",
    age: "39",
    href: "",
    src: "",
  },
  {
    name: "REN, Kylo",
    age: "44",
    href: "",
    src: "",
  },
];

export default function SendReferral() {
  const router = useRouter();
  const [currentState, setCurrentState] = React.useState (1);

  const handleSelect = () => {
    if (currentState < 3) {
      setCurrentState((currentState + 1)  );
    }
    console.log(currentState);
  };

  const handleBack = () => {
    if (currentState > 1) {
      setCurrentState((currentState - 1)  );
    }
  };

  return (
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300 h-[100vh]">
      <div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>
      <ProgressBar currentStep={currentState} />
      <>
        <div className={currentState === 3 ? "pb-20" : ""}>
          {currentState === 1 ? (
            navigation.map((item) => (
              <ReferralPatients key={item.name} name={item.name} age={item.age} onClick={handleSelect} />
            ))
          ) : currentState === 2 ? (
            navigation2.map((item2) => (
              <ReferralDoctors key={item2.name} name={item2.name} age={item2.age} onClick={handleSelect} />
            ))
          ) : (<NotesAndReview />
          
          )}
        </div>
      </>
      <div className="w-full flex justify-between px-14 max-md:max-w-full max-md:px-5">
        {currentState > 1 ? (
          <button
            onClick={() => {
              if (currentState > 1) {
                setCurrentState((currentState - 1)  );
              }
            }}
            className="mt-3 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2 px-6 py-2 rounded max-md:px-5"
          >
            BACK
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => {
            if (currentState < 3) {
              setCurrentState((currentState + 1) );
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
