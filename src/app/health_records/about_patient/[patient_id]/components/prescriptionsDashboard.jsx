import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import AddMedications from "./sub_components/sub_sub_components/sub_sub_sub_components/addMedication";
import AddPrescription from "./sub_components/sub_sub_components/addPrescription";
import ViewPrescription from "./sub_components/viewPrescription";
import EditMedication from "./sub_components/editMedication";
import usePrescriptionsStore from "@/app/prescriptionsStore";
import { doctor } from "@/backend/health_records/doctor";
import * as React from "react";
import { useState, useEffect } from "react";
import { getMedicationRequests } from "@/backend/health_records/getMedicationRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/backend/initSupabase";
import uploadPrescription from "@/backend/health_records/uploadPrescription";
import { getPrescriptionsByPatient } from "@/backend/health_records/getPrescription";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Prescriptions({ patientId }) {
  const supabase = client("public");
  const [status, setStatus] = useState("ACTIVE");
  const [currentUser, setCurrentUser] = useState(null);
  const { currentScreen, setCurrentScreen } = usePrescriptionsStore();
  const [prescriptionMedications, setPrescriptionMedications] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionId, setPrescriptionId] = useState("");
  const [sortOptionDate, setSortOptionDate] = useState("Recent");
  const [renderingOptions, setRenderingOptions] = useState(5);
  const handleDateSort = (option) => {
    setSortOptionDate(option);
  };

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

  const handleSavePrescription = async (prescriptionData) => {
    try {
      console.log(prescriptionData);
      // Call your backend API or function to save the prescription data
      const savedPrescription = await uploadPrescription(prescriptionData, patientId); // Assuming uploadPrescription function handles the backend integration

      console.log("Prescription saved successfully:", savedPrescription);

      toast.success("Prescription Created", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });

      setCurrentScreen(0);
    } catch (error) {
      console.error("Error saving prescription:", error);

      // Display error message to the user using toast notification
      toast.error("Failed to save prescription. Please try again later.");
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const fetchedPrescriptions = await getPrescriptionsByPatient(patientId);
      setPrescriptions(fetchedPrescriptions.reverse());
      console.log("Fetched Prescriptions:", fetchedPrescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <>
      {currentScreen === 1 ? (
        <AddPrescription
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
          prescriptionMedications={prescriptionMedications}
          onSave={handleSavePrescription}
          fetchPrescriptions={fetchPrescriptions}
        />
      ) : currentScreen === 2 ? (
        <ViewPrescription
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          prescriptionId={prescriptionId}
        />
      ) : currentScreen === 3 ? (
        <AddMedications
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
        />
      ) : currentScreen === 4 ? (
        <EditMedication
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
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
                  setCurrentScreen(1);
                }}
              >
                Create Prescription
              </Button>
            </div>
            <Tabs defaultValue="all" className="w-[400px] mb-2">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="endocrinologist">Endocrinologist</TabsTrigger>
                <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
                <TabsTrigger value="gastroenterologist">Gastroenterologist</TabsTrigger>
              </TabsList>
              <TabsContent value="account">{/* Add contents here */}</TabsContent>
              <TabsContent value="endocrinologist">{/* Add contents here */}</TabsContent>
              <TabsContent value="cardiologist">{/* Add contents here */}</TabsContent>
              <TabsContent value="gastroenterologist">{/* Add contents here */}</TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="text-black text-sm text-base font-bold leading-5">
                  Rendering Options:
                </span>
                <select
                  className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-xs font-normal"
                  onChange={(e) => setRenderingOptions(parseInt(e.target.value))}
                  defaultValue="5"
                >
                  <option value="5" disabled hidden>
                    5
                  </option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                </select>
                <span className="ml-2 text-black text-base leading-5 text-sm font-normal">
                  Prescriptions
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center gap-1 px-1 py-1 rounded-md">
                    <Button variant="sortfilter">SORT</Button>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By Date</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortOptionDate} onValueChange={handleDateSort}>
                    <DropdownMenuRadioItem value="Recent">Sort by Most Recent</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Oldest">Sort By Oldest</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {prescriptions
              .sort((a, b) => {
                if (sortOptionDate === "Recent") {
                  return new Date(b?.created_at) - new Date(a?.created_at);
                } else {
                  return new Date(a?.created_at) - new Date(b?.created_at);
                }
              })
              .slice(0, renderingOptions)
              ?.map((prescription, index, sortedArray) => (
                <div
                  key={prescription.id}
                  className="flex justify-between items-center mt-4 text-xs leading-5 text-black w-full"
                >
                  <button
                    onClick={() => {
                      console.log(prescription.id);
                      setPrescriptionId(prescription.id);
                      setCurrentScreen(2);
                    }}
                    className="flex-grow text-left"
                  >
                    <div
                      key={index}
                      className="flex flex-col mt-5 items-start text-xs leading-5 text-black w-full"
                    >
                      <div className="flex gap-3.5 font-semibold whitespace-nowrap">
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

                        <div className="my-auto">
                          Prescription #
                          {sortOptionDate === "Recent"
                            ? prescriptions.length - prescriptions.findIndex(p => p.id === prescription.id)
                            : prescriptions.findIndex(p => p.id === prescription.id) + 1}
                        </div>
                      </div>

                      <div className="flex w-full justify-between text-xs">
                        <div className="flex gap-1 font-medium whitespace-nowrap ml-7">
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
                            {prescription.resource.requester.agent.reference}
                          </div>
                          <div className="grow my-auto ml-10">
                            Provided On: {new Date(prescription.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <Button
                    variant="download"
                    onClick={(e) => {
                      console.log("download button is clicked");
                    }}
                  >
                    ↓ Download (.pdf)
                  </Button>
                </div>
              ))}
            <div className="mt-5">
              <BackButton />
            </div>
          </div>
        </>
      )}
    </>
  );
}
