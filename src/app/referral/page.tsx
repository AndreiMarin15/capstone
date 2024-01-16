"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function SendReceiveScreen() {
  const router = useRouter();

  return (
    <div className="border bg-white flex flex-col items-center justify-center h-screen">
      <div className="text-black text-xl font-semibold">Select Referral Type</div>

      <div className="flex mt-8">
        <button
          onClick={() => {
            router.push("/referral/patient_referral");
          }}
          className="text-white text-xs font-semibold bg-sky-900 px-6 py-2 rounded mr-4"
        >
          Send
        </button>
        <button
          onClick={() => {
            router.push("/referral/doctor_referral");
          }}
          className="text-white text-xs font-semibold bg-sky-900 px-6 py-2 rounded"
        >
          Receive
        </button>
      </div>
    </div>
  );
}
