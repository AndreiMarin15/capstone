"use client";
import * as React from "react";
import Navbar from "../../navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { currentUser, usePatientHRNav } from "@/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LabTest from "./components/labTests";
import { useEffect, useState } from "react";
import { Reusable } from "@/app/patient/letters/components/pdfs/reusable";
import { ReferralLetterPDF } from "./components/pdfs/referralletter";
import { Prescription } from "./components/pdfs/prescription";
import referralLetters from "@/backend/referral_letters/getData";
import {
  getPatient,
  getMedications,
  getRequestedLabTests,
  getLabTests,
} from "@/backend/pdfBackend/getPDFData";
import { getPrescriptionsByPatient } from "@/backend/health_records/getPrescription";
import ViewPrescription from "./components/sub_components/viewPrescription";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Letters() {
  const [written_referrals, setWrittenReferrals] = useState([]);
  const [patientData, setPatientData] = useState({});
  const [selectedTab, setSelectedTab] = React.useState("prescription");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionId, setPrescriptionId] = useState("");
  const [labtests, setLabTests] = useState([]);
  const handleTabChange = (value) => {
    setSelectedTab(value);
  };
  const [sortOptionDate, setSortOptionDate] = useState("Recent");
  const [renderingOptions, setRenderingOptions] = useState(5);
  const handleDateSort = (option) => {
    setSortOptionDate(option);
  };

  useEffect(() => {
    if (selectedTab === "referral") {
      const fetchLetters = async () => {
        const letters = await referralLetters.getLetters();
        const patient = await referralLetters.getPatient();

        setPatientData(patient);
        setWrittenReferrals(letters);
      };
      fetchLetters();
    } else if (selectedTab === "prescription") {
      const fetchLetters = async () => {
        const patient = await getPatient();
        console.log(patient.id);
        const medications = await getPrescriptionsByPatient(patient.id);
        console.log(medications);

        setPatientData(patient);
        setPrescriptions(medications);
      };
      fetchLetters();
    } else if (selectedTab === "labtestrequest") {
      const fetchLabTests = async () => {
        // const labTests = await getLabTests(null);
        const labTests = await getRequestedLabTests();
        const patient = await getPatient();

        console.log(labTests);

        setPatientData(patient);
        setLabTests(labTests);
      };
      fetchLabTests();
    }
  }, [selectedTab]);

  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen min-w-full">
        {currentScreen === 1 ? (
          <ViewPrescription
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            prescriptionId={prescriptionId}
          />
        ) : (
          <div className="w-full max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
                <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                  <span className="flex w-[100%] max-w-full flex-col items-stretch self-start mb-5">
                    <div className="text-black text-xl font-semibold leading-8">
                      Letters
                    </div>
                  </span>
                  <hr
                    style={{ borderTop: "1px solid #9CA3AF", width: "100%" }}
                  />
                </span>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-10 mt-5">
                    <Tabs
                      defaultValue="prescription"
                      onValueChange={handleTabChange}
                      className="w-[800px]"
                    >
                      <TabsList>
                        <TabsTrigger value="prescription" color="#003168">
                          Prescription
                        </TabsTrigger>
                        <TabsTrigger value="referral" color="#003168">
                          Referral
                        </TabsTrigger>
                        <TabsTrigger value="labtestrequest" color="#003168">
                          Lab Test Request
                        </TabsTrigger>
                      </TabsList>
                      {/*Prescription */}
                      <TabsContent value="prescription">
                        <div className="font-semibold text-s ml-5 mt-10">
                          Prescriptions
                        </div>
                        <Tabs defaultValue="all" className="w-[100%] mt-5 ml-4">
                          <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="endocrinologist">
                              Endocrinologist
                            </TabsTrigger>
                            <TabsTrigger value="cardiologist">
                              Cardiologist
                            </TabsTrigger>
                            <TabsTrigger value="gastroenterologist">
                              Gastroenterologist
                            </TabsTrigger>
                          </TabsList>

                          <div className="flex justify-between ml-2 mt-2">
                            <div className="flex items-center">
                              <span className="text-black text-base font-bold leading-5">
                                Rendering Options:
                              </span>
                              <select
                                className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-sm font-normal"
                                onChange={(e) =>
                                  setRenderingOptions(parseInt(e.target.value))
                                }
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
                              <span className="ml-2 text-black leading-5 text-base font-normal">
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
                                <DropdownMenuLabel>
                                  Sort By Date
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                  value={sortOptionDate}
                                  onValueChange={handleDateSort}
                                >
                                  <DropdownMenuRadioItem value="Recent">
                                    Sort by Most Recent
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Oldest">
                                    Sort By Oldest
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <TabsContent value="all">
                          {prescriptions
  .filter(prescription => prescription.resource.status === "complete") // Filter for complete prescriptions
  .sort((a, b) => {
    if (sortOptionDate === "Recent") {
      return new Date(b?.created_at) - new Date(a?.created_at);
    } else {
      return new Date(a?.created_at) - new Date(b?.created_at);
    }
  })
  .slice(0, renderingOptions)
  ?.map((prescription, index, sortedArray) => (
    <div key={prescription.id} className="flex">
      <button
        onClick={() => {
          console.log(prescription.id);
          setPrescriptionId(prescription.id);
          setCurrentScreen(1);
        }}
      >
        <div
          key={index}
          className="flex flex-col mt-5 items-start text-sm leading-5 text-black w-full"
        >
          <div className="flex gap-1.5 font-semibold whitespace-nowrap mt-3 ml-2">
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
              Prescription{" "}
              {new Date(prescription.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="flex w-full justify-between text-sm ml-2 mt-1">
            <div className="flex gap-1 font-regular whitespace-nowrap ">
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
                Dr.{" "}
                {
                  prescription.resource.requester.agent.reference
                }
              </div>
              <div className="grow my-auto ml-10">
              </div>
            </div>
          </div>
        </div>
      </button>
      <div className="flex w-full ml-[350px] mt-5">
        <Reusable
          child={
            <>
              <Prescription
                medicationData={prescription}
                patientData={
                  currentUser.getState().user
                }
                doctor_id={
                  prescription.resource.requester.agent.license_id
                }
              />
            </>
          }
          w={1920}
          h={1080}
          orientation={"p"}
          filename={`prescription_${prescription.id}`}
        />
      </div>
    </div>
  ))}
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
                      </TabsContent>

                      <TabsContent value="referral">
                        <div className="font-semibold text-base ml-5 mt-10">
                          Referral Letters
                        </div>
                        {written_referrals?.map((referral, index) => (
                          <div
                            key={index}
                            className="flex justify-between mt-5"
                          >
                            <div className="ml-5 flex gap-2 items-center">
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src={
                                  "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                                }
                                className="aspect-square fill-black w-[10px]"
                              />
                              {/* Name of Medicine */}
                              <div className="text-sm font-semibold">
                                {/*  {medication.resource.medicationCodeableConcept[0].text} */}
                                Referral Letter to Dr.{" "}
                                {referral.referral_data?.doctor_name}
                              </div>
                            </div>

                            <Reusable
                              child={
                                <ReferralLetterPDF
                                  referralData={referral}
                                  patientData={patientData}
                                  referred_by_id={referral.doctor_license}
                                />
                              }
                              orientation={"p"}
                              filename={`referral_letter_${referral.referral_data?.doctor_name}`}
                            />
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent
                        value="labtestrequest"
                        className="flex-1 max-h-screen w-full"
                      >
                        <LabTest
                          labtests={labtests}
                          patientId={patientData.id}
                          patientData={patientData}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
