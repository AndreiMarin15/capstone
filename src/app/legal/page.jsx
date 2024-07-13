"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function SendReceiveScreen() {
  const router = useRouter();

  return (
    <div className="border bg-white flex flex-col items-center justify-center h-screen">
      <div className="text-black text-xl font-semibold">
        Kindly Select Below
      </div>

      <div className="flex mt-8">
        <button
          onClick={() => {
            router.push("/legal/privacy_policy");
          }}
          className="text-white text-sm font-semibold bg-sky-900 px-6 py-2 rounded mr-4"
        >
          View Privacy Policy
        </button>
        <button
          onClick={() => {
            router.push("/legal/terms_of_service");
          }}
          className="text-white text-sm font-semibold bg-sky-900 px-6 py-2 rounded"
        >
          View Terms of Service
        </button>
      </div>
    </div>
  );
}
