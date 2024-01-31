"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function SendReceiveScreen() {
  const router = useRouter();

  return (
    <div className="border bg-white flex flex-col items-center justify-center h-screen">
      <div className="text-black text-xl font-semibold">Kindly Select Below</div>

      <div className="flex mt-8">
        <button
          onClick={() => {
            router.push("/referral/send_referral");
          }}
          className="text-white text-xs font-semibold bg-sky-900 px-6 py-2 rounded mr-4"
        >
          Pull Records Request 
        </button>
        <button
          onClick={() => {
            router.push("/referral/receive_referral");
          }}
          className="text-white text-xs font-semibold bg-sky-900 px-6 py-2 rounded"
        >
          Patients Referred To Me
        </button>
      </div>
    </div>
  );
}