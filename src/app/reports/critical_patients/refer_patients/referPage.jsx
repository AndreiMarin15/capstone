"use client";
import Image from "next/image";

import * as React from "react";

import sendReferralData from "@/backend/referral/sendReferralData";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ReferralDoctors } from "../components/referralDoctor";
import { Button } from "@/components/ui/button";
import { NotesAndReview } from "../components/notesAndReview";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ReferPatients({
  patients,
  selectedDoctorId,
  setSelectedDoctorId,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
}) {
  const [currentState, setCurrentState] = React.useState(1);
  const [notes, setNotes] = React.useState("");
  return (
    <div className="bg-white flex flex-col items-stretch pb-8 h-[100vh]">
      <div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">
        Referral
      </div>

      {currentState === 1 ? (
        <ScrollArea className="flex-grow max-h-[80dvh]">
          {doctors?.map((doctor, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedDoctorId(doctor.id);
                  setSelectedDoctor(doctor);
                }}
              >
                <ReferralDoctors
                  key={doctor.id}
                  name={doctor.name}
                  specialization={doctor.specialization}
                  id={doctor.id}
                  selectedId={selectedDoctorId}
                />
              </div>
            );
          })}
        </ScrollArea>
      ) : (
        <NotesAndReview
          selectedDoctor={selectedDoctor}
          notes={notes}
          setNotes={setNotes}
        />
      )}

      <div className="flex justify-end m-10">
        <Button
          onClick={async () => {
            if (currentState === 1) {
              setCurrentState(2);
            } else if (currentState === 2) {
              await sendReferralData.referManyPatients(
                patients,
                selectedDoctorId,
                notes
              );
              toast.success("Successfully referred patients.", {
                position: "top-left",
                theme: "colored",
                autoClose: 8000,
              });
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
