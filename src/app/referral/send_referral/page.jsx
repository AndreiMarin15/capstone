"use client";
import Image from "next/image";

import * as React from "react";
import ProgressBar from "../components/progressBar";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/referralPatients";
import ReferralDoctors from "../components/referralDoctor";
import NotesAndReview from "../components/notesAndReview";
import retrieveReferralData from "@/backend/referral/retrieveReferralData";
import sendReferralData from "@/backend/referral/sendReferralData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export default function SendReferral() {
  const [selectedGenders, setSelectedGenders] = React.useState([]);

  const handleGenderFilter = (gender) => {
    setSelectedGenders((prevSelectedGenders) => {
      if (prevSelectedGenders.includes(gender)) {
        return prevSelectedGenders.filter(
          (selectedGender) => selectedGender !== gender
        );
      } else {
        return [...prevSelectedGenders, gender];
      }
    });
  };

  const [selectedSpecializations, setSelectedSpecializations] = React.useState(
    []
  );

  const handleSpecializationFilter = (specialization) => {
    setSelectedSpecializations((prevSelected) => {
      if (prevSelected.includes(specialization)) {
        return prevSelected.filter(
          (selectedSpecialization) => selectedSpecialization !== specialization
        );
      } else {
        return [...prevSelected, specialization];
      }
    });
  };

  const router = useRouter();
  const [patients, setPatients] = React.useState([]);

  const [doctors, setDoctors] = React.useState([]);

  const [currentState, setCurrentState] = React.useState(1);
  const [selectedPatientId, setSelectedPatientId] = React.useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = React.useState(null);

  const [selectedPatient, setSelectedPatient] = React.useState({});
  const [selectedDoctor, setSelectedDoctor] = React.useState({});

  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    console.log(selectedPatient);
  }, [selectedPatient]);
  React.useEffect(() => {
    console.log(selectedDoctor);
  }, [selectedDoctor]);

  const handleSelect = () => {
    if (currentState < 3) {
      setCurrentState(currentState + 1);
    }
    console.log(currentState);
  };

  const handleBack = () => {
    if (currentState > 1) {
      setCurrentState(currentState - 1);
    }
  };

  React.useEffect(() => {
    console.log(currentState);
  }, [currentState]);

  React.useEffect(() => {
    console.log(patients, doctors);
  }, [patients, doctors]);
  React.useEffect(() => {
    const fetchData = async () => {
      const patients = await retrieveReferralData.getPatients();
      const doctors = await retrieveReferralData.getDoctors();

      console.log(patients);

      console.log(doctors);
      setPatients(patients);
      setDoctors(doctors);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white flex flex-col items-stretch pb-8 h-[100vh]">
      <div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">
        Referral
      </div>
      <ProgressBar currentStep={currentState} />

      <>
        <div className={(currentState === 3 ? "pb-20" : "") + " overflow-auto"}>
          {patients.length > 0 && doctors.length > 0 ? (
            <>
              {currentState === 1 ? (
                patients?.map((item) => (
                  <div key={item.id}>
                    <div
                      onClick={() => {
                        setSelectedPatientId(item.id);
                        setSelectedPatient(item);
                      }}
                    >
                      <ReferralPatients
                        name={item.name}
                        age={item.age}
                        photo={item.photo}
                        id={item.id}
                        selectedId={selectedPatientId}
                      />
                    </div>
                  </div>
                ))
              ) : currentState === 2 ? (
                <>
                  <div className="w-full flex justify-between ml-5 mb-5">
                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex gap-1 px-5 py-2 text-sm rounded-md border border-black border-solid">
                          <Image
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                            width="100"
                            height="100"
                            className="shrink-0 w-3 aspect-[0.85]"
                            alt="img"
                          />
                          <div className="self-start">FILTER</div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Specialization</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuCheckboxItem
                          checked={selectedSpecializations.includes(
                            "endocrinologist"
                          )}
                          onCheckedChange={() =>
                            handleSpecializationFilter("endocrinologist")
                          }
                        >
                          Endocrinologist
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedSpecializations.includes(
                            "cardiologist"
                          )}
                          onCheckedChange={() =>
                            handleSpecializationFilter("cardiologist")
                          }
                        >
                          Cardiologist
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedSpecializations.includes(
                            "gastroenterologist"
                          )}
                          onCheckedChange={() =>
                            handleSpecializationFilter("gastroenterologist")
                          }
                        >
                          Gastroenterologist
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* End Dropdown Menu */}

                  {doctors?.map((item) => (
                    <div key={item.id}>
                      <div
                        onClick={() => {
                          setSelectedDoctorId(item.id);
                          setSelectedDoctor(item);
                        }}
                      >
                        <ReferralDoctors
                          name={item.name}
                          specialization={item.specialization}
                          id={item.id}
                          selectedId={selectedDoctorId}
                          photo={item.photo}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <NotesAndReview
                  selectedDoctor={selectedDoctor}
                  selectedPatient={selectedPatient}
                  notes={notes}
                  setNotes={setNotes}
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
            className="mt-5 text-white text-sm font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2 px-6 py-2 rounded max-md:px-3"
          >
            BACK
          </button>
        ) : (
          <div></div>
        )}

        {currentState === 1 && (
          <button
            onClick={() => {
              router.push("/referral");
            }}
            className="mt-5 text-white text-sm font-semibold whitespace-nowrap items-stretch bg-gray-400 mr-2 px-6 py-2 rounded"
            style={{ marginRight: "auto" }}
          >
            BACK
          </button>
        )}

        <button
          onClick={() => {
            if (currentState < 3) {
              setCurrentState(currentState + 1);
            } else if (currentState === 3) {
              const referralData = {
                patient_id: selectedPatientId,
                doctor_id: selectedDoctorId,
                notes: notes,
                selectedPatient: selectedPatient,
                selectedDoctor: selectedDoctor,
              };
              sendReferralData.newReferralRequest(referralData);
              router.push("/referral");
            }
          }}
          className={`mt-5 text-white text-sm font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2 px-6 py-2 rounded max-md:px-3`}
        >
          {currentState === 3 ? "SEND" : "NEXT"}
        </button>
      </div>
    </div>
  );
}
