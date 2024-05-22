import Image from "next/image";
import BackButton from "./BackButton";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ViewAttendingDoctor from "../sub_sub_components/viewAttendingDoctor";
import AddAttendingDoctor from "../sub_sub_components/addAttendingDoctors";

//NO BACK END YET
// import { client } from "@/backend//initSupabase";
// import { MedicationHistoryPDF } from "./PDF_templates/medicationhistory";

export default function AttendingDoctors({ currentScreen, setCurrentScreen }) {
  const [atCurrentScreen, setAtCurrentScreen] = useState(1);
  // const supabase = client("public");
  const [medications, setMedications] = useState([]);
  const [attendingDoctors, setAttendingDoctors] = useState([]);

  const sampleAttendingDoctors = [
    {
      name: "Dr. Maria Santos",
      specialty: "Cardiologist",
      status: "Accepted",
    },
    {
      name: "Dr. Angelo Cruz",
      specialty: "Gastroenterologist",
      status: "Accepted",
    },
  ];

  useEffect(() => {
    // Load sample attending doctors when component mounts
    setAttendingDoctors(sampleAttendingDoctors);
  }, []);

  const [status, setStatus] = useState("ACCEPTED");
  // const [currentUser, setCurrentUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUserData = await doctor.getDoctorByCurrentUser(); // Fetch current user data using the doctor module
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1000); // Adjust the interval time as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleStatus = () => {
    setStatus(status === "ACCEPTED" ? "PENDING" : "ACCEPTED");
  };

  return (
    <>
      {atCurrentScreen === 1 ? (
        <>
          <div>
            <div className="flex flex-col">
              <div className="text-black text-base font-bold leading-5 mt-8  max-md:ml-1 max-md:mt-10 flex justify-between items-center">
                ATTENDING DOCTOR/S
                <Button
                  variant="outline"
                  onClick={() => {
                    setAtCurrentScreen(3);
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
                <div className="flex gap-1.5 p-2.5">
                  <div className="mt-3 font-semibold text-black flex gap-1 items-center">
                    Status:
                    <button
                      className={`flex flex-col flex-1 justify-center font-bold ${
                        status === "ACCEPTED"
                          ? "text-green-600"
                          : "text-red-600"
                      } whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none`}
                      onClick={toggleStatus}
                    >
                      <div className="justify-center items-start py-2 pr-4 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                        {status}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              {attendingDoctors
                .filter((doctor) => {
                  if (status === "ACCEPTED") {
                    return doctor.status === "Accepted";
                  } else {
                    return doctor.status === "Pending";
                  }
                })
                ?.map((doctor, index) => (
                  <button
                    key={index}
                    className="mt-5 items-start text-xs leading-5 text-black max-w-[100%]"
                    onClick={() => {
                      console.log({ currentScreen });
                      setAtCurrentScreen(4);
                    }}
                  >
                    <div className="items-start text-xs text-black">
                      <div className="flex gap-2 font-medium whitespace-nowrap">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                          }
                          className="w-4 aspect-square"
                        />
                        <div className="text-left flex-shrink-0">
                          {doctor.name}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 ml-5 gap-5">
                        <div>{doctor.specialty}</div>
                        <div className="flex flex-grow justify-end">
                          {doctor.status === "Accepted" && (
                            <Button variant="destructive">Remove</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

              <BackButton
                currentScreen={2}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          </div>
        </>
      ) : null}
      {atCurrentScreen === 3 ? (
        <>
          <AddAttendingDoctor
            currentScreen={atCurrentScreen}
            setCurrentScreen={setAtCurrentScreen}
          />
        </>
      ) : null}
      {atCurrentScreen === 4 ? (
        <>
          <ViewAttendingDoctor
            currentScreen={atCurrentScreen}
            setCurrentScreen={setAtCurrentScreen}
          />
        </>
      ) : null}
    </>
  );
}
