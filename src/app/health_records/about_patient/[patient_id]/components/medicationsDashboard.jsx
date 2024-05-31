import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import AddMedications from "./sub_components/sub_sub_components/sub_sub_sub_components/addMedication";
import ViewMedications from "./sub_components/viewMedication";
import EditMedications from "./sub_components/editMedication";
import { doctor } from "@/backend//health_records/doctor";
import * as React from "react";
import { useState, useEffect } from "react";
import { getMedicationRequests } from "@/backend//health_records/getMedicationRequest";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/backend//initSupabase";

export default function Medications({ patientId }) {
  const supabase = client("public");
  const [medications, setMedications] = useState([]);
  const [regis, setRegis] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState("");

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
    const fetchMedications = async () => {
      try {
        // Fetch medications based on current patient ID
        const medicationRequestsData = await getMedicationRequests(patientId);
        setMedications(medicationRequestsData);
        console.log(medicationRequestsData);
      } catch (error) {
        console.error("Error fetching medication requests:", error);
      }
    };

    // Fetch medications whenever refresh state changes or when currentScreen is 0 or 2
    if (refresh || currentScreen === 0 || currentScreen === 2) {
      fetchMedications();
    }
  }, [refresh, currentScreen]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1000); // Adjust the interval time as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [isTest, setTest] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);

  const handleSetCurrentScreen = (screen) => {
    // Reset isTest to false when navigating back to screen 2
    if (screen === 2 || currentScreen === 2) {
      setTest(false);
      setAdd(false);
      setEdit(false);
    }
  };

  const toggleStatus = () => {
    setStatus(status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
  };

  const today = new Date();

  const handleDiscontinue = async (medicationId) => {
    console.log("Medication ID before update:", medicationId);
    try {
      // Update the medication status directly using updateTable

      const { data: medicationRequests, error } = await supabase
        .from("medicationrequest")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      const medicationRequestToUpdate = medicationRequests.find(
        (request) => request.resource.id === medicationId
      );

      if (medicationRequestToUpdate) {
        const updateData = await supabase
          .from("medicationrequest")
          .update({
            resource: {
              ...medicationRequestToUpdate.resource,
              status: "Inactive",
            },
          })
          .eq("id", medicationRequestToUpdate.id);

        // Refresh medication list after updating status
        const updatedMedicationRequests = await getMedicationRequests();
        setMedications(updatedMedicationRequests);
      }
    } catch (error) {
      console.error("Error discontinuing medication:", error);
    }
  };
  const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "2024-01-24",
    },
  ];
  useEffect(() => {
    setPrescriptionDate(new Date().toISOString().split("T")[0]);
  }, []);
  return (
    <>
      {isEdit ? (
        <EditMedications
          currentScreen={6}
          setCurrentScreen={handleSetCurrentScreen}
          patientId={patientId}
          medicationId={regis}
        />
      ) : isTest ? (
        <ViewMedications
          currentScreen={3}
          setCurrentScreen={handleSetCurrentScreen}
          patientId={patientId}
          medicationId={regis}
        />
      ) : isAdd ? (
        <AddMedications
          currentScreen={4}
          setCurrentScreen={handleSetCurrentScreen}
          patientId={patientId}
        />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
              MEDICATIONS
              <Button
                variant="outline"
                onClick={() => {
                  setTest(false);
                  setAdd(true);
                }}
              >
                Create Prescription
              </Button>
            </div>
            <Tabs defaultValue="all" className="w-[400px] mb-10">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="endocrinologist">
                  Endocrinologist
                </TabsTrigger>
                <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
                <TabsTrigger value="gastroenterologist">
                  Gastroenterologist
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="endocrinologist">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="cardiologist">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="gastroenterologist">
                {/* Add contents here */}
              </TabsContent>
            </Tabs>
            <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
              <div className="flex gap-1.5 p-2.5">
                <div className="mt-3 font-semibold text-black flex gap-1 items-center">
                  Status:
                  <button
                    className={`flex flex-col flex-1 justify-center font-bold ${
                      status === "ACTIVE" ? "text-green-600" : "text-red-600"
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

            {medications
              .filter((medication) => {
                if (status === "ACTIVE") {
                  return (
                    medication.resource.subject.reference === patientId &&
                    medication.resource.status === "Active"
                  );
                } else {
                  return (
                    medication.resource.subject.reference === patientId &&
                    medication.resource.status === "Inactive"
                  );
                }
              })
              ?.map((medication, index) => (
                <button
                  key={medication.resource.id}
                  onClick={() => {
                    console.log(medication.resource.id);
                    setRegis(medication.resource.id);
                    setTest(true);
                    setAdd(false);
                  }}
                >
                  <div
                    key={index}
                    className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[1000px]"
                  >
                    <div className="flex gap-3.5 font-semibold whitespace-nowrap ">
                      <Image
                        alt="image"
                        height={0}
                        width={0}
                        loading="lazy"
                        src={
                          "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                        }
                        className="aspect-square fill-black w-[15px]"
                      />
                      {/* Name of Medicine */}
                      <div className="my-auto">
                        {/*  {medication.resource.medicationCodeableConcept[0].text} */}
                        Prescription #1
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
                      <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                        {/* Name of Provider */}
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
                        <div className="grow my-auto">
                          {medication.resource.requester.agent.reference}
                        </div>
                        {/* Date of Medicine */}
                        {/* <div className=" ml-16 justify-between flex-auto my-auto">{`${medication.resource.dispenseRequest.validityPeriod.start} to ${medication.resource.dispenseRequest.validityPeriod.end}`}</div>} */}
                      </div>

                      {/* Edit and Delete */}
                      {/* {medication.resource.requester.agent.reference ===
                        currentUser?.fullName &&
                        medication.resource.status === "Active" && (
                          <div className="flex justify-end">
                            <span className="">
                              <button
                                className="ml-96 px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("edit Button is being pressed");
                                  // Set the state to indicate editing mode
                                  setEdit(true);
                                  // Ensure the test mode is not active
                                  setTest(false);
                                  // Pass the necessary props to the EditMedications component
                                  setRegis(medication.resource.id);
                                }}
                              >
                                Edit
                              </button>
                            </span>
                            <span className="">
                              <button
                                className="ml-2 px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent event bubbling
                                  console.log(
                                    "Medication ID:",
                                    medication.resource.id
                                  );
                                  handleDiscontinue(medication.resource.id);
                                }}
                              >
                                Discontinue
                              </button>
                            </span>
                          </div>
                        )} */}

                      <Button variant="download"> Download </Button>
                    </div>
                    {/* Medicine form/quantity/etc */}
                    {/* <div className="flex justify-between mt-2">
                      <div className="flex-grow ml-7 my-auto">
                        Form: {medication.resource.form.text}
                      </div>
                      <div className="flex-grow ml-7 my-auto">
                        Dosage:{" "}
                        {medication.resource.dosageInstruction[0]
                          ?.doseAndRate[0]?.doseQuantity?.doseUnit || ""}
                      </div>
                      <div className="flex-grow ml-7 my-auto">
                        Frequency:{" "}
                        {(medication.resource.dispenseRequest &&
                          medication.resource.dispenseRequest
                            .dispenseInterval) ||
                          ""}
                      </div>
                      <div className="flex-grow ml-7 my-auto">
                        Until:{" "}
                        {(medication.resource.dispenseRequest &&
                          medication.resource.dispenseRequest.validityPeriod &&
                          medication.resource.dispenseRequest.validityPeriod
                            .end) ||
                          ""}
                      </div>
                      <div className="flex-grow ml-7 my-auto">
                        Possible Side Effect:{" "}
                        {medication.resource.adverseEvent.adverseReaction}
                      </div>
                    </div> */}
                  </div>
                  <div className="mt-2 border-b border-gray-300 w-full"></div>
                </button>
              ))}
            <BackButton />
          </div>
        </>
      )}
    </>
  );
}
