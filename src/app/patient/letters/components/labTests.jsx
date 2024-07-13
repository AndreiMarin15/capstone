"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LabTest } from "./pdfs/labtest";
import { useState, useEffect } from "react";
import ViewLab from "./sub_components/viewLab";
import PrickList from "./sub_components/prickList";
import AddPrick from "./sub_components/lab_components/addPrick";
import ViewPrick from "./sub_components/lab_components/viewPrick";
import UploadLab from "../../lab_tests/components/uploadLab";
import VisitLab from "../../lab_tests/components/viewLab";
import useLabTestStore from "@/app/labTestStore";
import { getEncounterByPatientId } from "@/backend/health_records/getEncounter";
import { getObservationsByPatientId } from "@/backend/health_records/getObservation";

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
// import { LabTest } from "./pdfs/labtest";
import { Reusable } from "./pdfs/reusable";

async function fetchEncounters(patientId, setLabTests) {
  console.log(patientId);
  try {
    const encountersData = await getEncounterByPatientId(patientId);
    console.log(encountersData);

    // Create a mapping of lab test IDs to encounter IDs
    const labTestToEncounterMap = {};
    encountersData.forEach((encounter) => {
      const encounterId = encounter.id;
      const encounterContained = encounter.resource.contained || [];
      encounterContained.forEach((labTestId) => {
        labTestToEncounterMap[labTestId] = encounterId;
      });
    });

    const observationsData = await getObservationsByPatientId(patientId);
    console.log(observationsData);

    const labTestObservations = observationsData
      .filter(
        (observation) =>
          observation.resource.id === "labtest" &&
          observation.resource.participant.license_id
      )
      .map((observation) => ({
        id: observation.id,
        doctor: observation.resource.participant.actor,
        license_id: observation.resource.participant.license_id,
        srcdoctor:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        remarks: observation.resource.remarks,
        variable: observation.resource.codeText,
        update: observation.resource.uploadedDateTime,
        date: observation.resource.effectiveDateTime,
        reqdate: observation.resource.requestedDateTime, // Include request date
        status: observation.resource.status,
        encounterId: labTestToEncounterMap[observation.id], // Map lab test to its encounter ID
      }));

    console.log(labTestObservations);
    const labTestsGrouped = labTestObservations.reduce((acc, labTest) => {
      acc[labTest.encounterId] = acc[labTest.encounterId] || [];
      acc[labTest.encounterId].push(labTest);
      return acc;
    }, {});

    console.log(labTestsGrouped);
    setLabTests(labTestsGrouped);
  } catch (error) {
    console.error("Error fetching encounters and observations:", error);
  }
}

export default function LabTests({ labtests, patientId, patientData }) {
  const [sortOptionDate, setSortOptionDate] = useState("Recent");
  const [renderingOptions, setRenderingOptions] = useState(5);

  const handleDateSort = (option) => {
    setSortOptionDate(option);
  };

  const fetchSelfPrickObservations = async () => {
    try {
      const observations = await getSelfPrickObservations(patientId);
      observations.sort(
        (a, b) =>
          new Date(b.resource.uploadedDateTime) -
          new Date(a.resource.uploadedDateTime)
      );
      setSelfPrickObservations(observations);
      console.log(observations);
    } catch (error) {
      console.error("Error fetching self-prick observations:", error);
    }
  };

  useEffect(() => {
    fetchSelfPrickObservations();
  }, []);

  const refetchSelfPrickObservations = () => {
    fetchSelfPrickObservations();
  };

  const [containedIDs, setContainedIDs] = useState([]);
  const [dateOfRequest, setDateOfRequest] = useState("");

  const [labTests, setLabTests] = useLabTestStore((state) => [
    state.labTests,
    state.setLabTests,
  ]);
  const [currentScreen, setCurrentScreen] = useLabTestStore((state) => [
    state.currentScreen,
    state.setCurrentScreen,
  ]);

  const [selectedEncounterId, setSelectedEncounterId] = useState(null);
  const observationId = useLabTestStore((state) => state.observationId);
  const setObservationId = useLabTestStore((state) => state.setObservationId);
  const resetLabTestStore = useLabTestStore((state) => state.reset);

  useEffect(() => {
    console.log(labtests);
    console.log(patientData);
  }, [labtests]);

  const handleRowClick = (encounterId) => {
    console.log(encounterId);
    setSelectedEncounterId(encounterId);

    setCurrentScreen(1);
  };

  useEffect(() => {
    fetchEncounters(patientId, setLabTests);
  }, [patientId]);

  useEffect(() => {
    console.log(labTests);
  }, [labTests]);

  const handleBackButtonClick = () => {
    setCurrentScreen(0);
    resetLabTestStore();
  };

  useEffect(() => {
    resetLabTestStore();
  }, []);

  console.log(labTests);

  return (
    <>
      {currentScreen === 0 ? (
        <TabsContent value="labtestrequest">
          <div className="flex justify-between items-center mt-10">
            <div className="font-semibold items-center self-center text-s ml-5">
              Lab Test Requests
            </div>
            <div className="flex gap-2">
              <div className="">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentScreen(2);
                  }}
                >
                  Self-Pricking
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <span className="ml-5 text-black text-base font-bold leading-5">
                Rendering Options:
              </span>
              <select
                className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-sm  font-normal"
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
              <span className="ml-2 text-black leading-5 text-base font-normal">
                Lab Test Requests
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

          <>
            {Object.entries(labTests)
              .sort((a, b) => {
                if (sortOptionDate === "Recent") {
                  return (
                    new Date(b[1][0]?.reqdate) - new Date(a[1][0]?.reqdate)
                  );
                } else {
                  return (
                    new Date(a[1][0]?.reqdate) - new Date(b[1][0]?.reqdate)
                  );
                }
              })
              .slice(0, renderingOptions)
              .map(([encounterId, labTestGroup], groupIndex) => (
                <div className="flex justify-between" key={groupIndex}>
                  <button
                    className="flex flex-col mt-5 items-start text-sm leading-5 text-black max-w-[650px]"
                    onClick={() => handleRowClick(encounterId)}
                  >
                    {labTestGroup && labTestGroup[0] && (
                      <div className="flex justify-between text-sm leading-5 text-black max-w-[650px] mt-5 ml-5">
                        <Image
                          alt="image"
                          src={labTestGroup[0]?.src}
                          height={0}
                          width={0}
                          loading="lazy"
                          style={{
                            aspectRatio: "1",
                            fill: "black",
                            width: "15px",
                            marginRight: "2px",
                            marginBottom: "0",
                          }}
                        />
                        <div className="grow text-sm font-semibold mr-20 ml-1">
                          Lab Test Request {labTestGroup[0]?.reqdate}
                        </div>
                      </div>
                    )}

                    {labTestGroup && labTestGroup[0] && (
                      <table style={{ width: "100%" }}>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <div
                              className="ml-5"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Image
                                alt="image"
                                src={labTestGroup[0]?.srcdoctor}
                                height={0}
                                width={0}
                                loading="lazy"
                                style={{
                                  aspectRatio: "1",
                                  fill: "black",
                                  width: "15px",
                                  marginRight: "2px",
                                }}
                              />
                              <div
                                className="text-sm"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Dr. {labTestGroup[0]?.doctor}
                              </div>
                            </div>
                          </td>
                          {/* Replace this with the complete and incomplete depending on whether all the statuses are final here */}
                          <td style={{ textAlign: "right" }}>
                            <div
                              className="text-sm"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {labTestGroup.every(
                                (test) => test.status === "final"
                              ) ? (
                                <>
                                  <svg
                                    className="h-3 w-3 ml-1 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle cx="10" cy="10" r="5" />
                                  </svg>
                                  <span style={{ marginLeft: "0.25rem" }}>
                                    Complete
                                  </span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="h-3 w-3 ml-1 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle cx="10" cy="10" r="5" />
                                  </svg>
                                  <span style={{ marginLeft: "0.25rem" }}>
                                    Incomplete
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </table>
                    )}
                  </button>

                  <Reusable
                    child={
                      <LabTest
                        patientData={patientData}
                        labTests={labTests[encounterId]}
                        referred_by_id={labTestGroup[0]?.license_id}
                      />
                    }
                    orientation={"p"}
                    filename="labtest"
                  />
                </div>
              ))}
          </>
        </TabsContent>
      ) : currentScreen === 1 && selectedEncounterId !== null ? (
        <ViewLab
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          labTests={labTests[selectedEncounterId]} // Pass lab test data for the selected encounter
          fetchEncounters={() => fetchEncounters(patientId, setLabTests)}
        />
      ) : currentScreen === 2 ? (
        <PrickList
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
        />
      ) : currentScreen === 3 ? (
        <AddPrick
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
          refetchSelfPrickObservations={refetchSelfPrickObservations}
        />
      ) : currentScreen === 4 ? (
        <ViewPrick
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
        />
      ) : currentScreen === 5 ? (
        <UploadLab
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          patientId={patientId}
        />
      ) : currentScreen === 6 ? (
        <VisitLab
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
        />
      ) : (
        ""
      )}
    </>
  );
}
