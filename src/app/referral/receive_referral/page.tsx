"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import ReceiveReferral from "../components/receiveReferral";

const navigation = [
  {
    name: "SANTOS, Johnny",
    patient: "Juan Dela Cruz",
  },
  {
    name: "REYES, Agatha",
    patient: "Martha May",
  },
  
];



export default function SendReferral() {
  const router = useRouter();

  return (
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300 h-[100vh]">
      <div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>
      <div className="ml-6 mt-2 mb-5 text-gray-400 italic text-m  leading-8">The following doctors have referred patients. You may choose to accept them below.</div>
      <>
        <div>
          { (
            navigation.map((item) => (
              <ReceiveReferral key={item.name} name={item.name} patient={item.patient} />
            ))
          )}
         
        </div>
      </>
     
    </div>
  );
}
