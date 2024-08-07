import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import ViewLabRequest from "./sub_components/viewLabRequest";
import RecordLabTest from "./sub_components/recordLabTest";
import VisitLabTests from "./sub_components/visitLabTests";
import { useState, useEffect } from "react";
import { getEncounterByPatientId } from "@/backend/health_records/getEncounter";
import { getObservationsByPatientId } from "@/backend/health_records/getObservation";
import doctor from "@/backend/health_records/doctor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewSelfPrick from "./sub_components/viewSelfPrick";
import ViewSelfPrickList from "./sub_components/viewSelfPrickList";
import useLabTestStore from "@/app/labTestStore";
import { LabTest } from "@/app/patient/letters/components/pdfs/labtest";
import { currentUser } from "@/app/store";
import { getFullPatientData } from "@/backend/pdfBackend/getPatientData";
import { ReusableLabTest } from "./reusable";
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

async function fetchEncounters(patientId, setLabTests) {
  console.log(patientId);
  try {
    const doctorInfo = await doctor.getDoctorByCurrentUser();
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
      .filter((observation) => observation.resource.id === "labtest")
      .map((observation) => ({
        id: observation.id,
        doctor: observation.resource.participant.actor,
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

export default function LabTests({ patientId }) {
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
  const [patientData, setPatientData] = useState({});
  const handleRowClick = (observationId, encounterId) => {
    setSelectedEncounterId(encounterId);
    setCurrentScreen(1); // Assuming 1 is the screen for ViewLabRequest
  };

  const [sortOptionDate, setSortOptionDate] = useState("Recent");
  const [renderingOptions, setRenderingOptions] = useState(5);

  const handleDateSort = (option) => {
    setSortOptionDate(option);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      const data = await getFullPatientData(patientId);
      setPatientData(data);
    };
    fetchPatientData();
    fetchEncounters(patientId, setLabTests); // Call fetchEncounters when patientId changes
  }, [patientId]);

  const handleBackButtonClick = () => {
    setCurrentScreen(0);
    resetLabTestStore(); // Reset the lab test store when navigating back
  };

  useEffect(() => {
    resetLabTestStore();
  }, []);

  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div>
            <div className="flex justify-between">
              <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
                LAB TESTS
              </div>
              <div className="flex items-center">
                <span className="flex items-center py-1 mt-8 rounded-md font-normal">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentScreen(4);
                    }}
                  >
                    Self-Pricking
                  </Button>
                </span>
              </div>
            </div>
            {/* <Tabs defaultValue="all" className="w-[400px]">
							<TabsList>
								<TabsTrigger value="all">All</TabsTrigger>
								<TabsTrigger value="endocrinologist">Endocrinologist</TabsTrigger>
								<TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
								<TabsTrigger value="gastroenterologist">Gastroenterologist</TabsTrigger>
							</TabsList>
							<TabsContent value="account"></TabsContent>
							<TabsContent value="endocrinologist"></TabsContent>
							<TabsContent value="cardiologist"></TabsContent>
							<TabsContent value="gastroenterologist"></TabsContent>
						</Tabs> */}
            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="text-black text-base text-base font-bold leading-5">
                  Rendering Options:
                </span>
                <select
                  className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-sm  font-normal"
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
                <span className="ml-2 text-black text-base leading-5 text-basefont-normal">
                  Lab Test Requests
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center py-1 rounded-md">
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
                <div key={groupIndex} className="w-full flex justify-between">
                  <div className="mb-5">
                    <tr
                      key={groupIndex}
                      onClick={() =>
                        handleRowClick(labTestGroup[0]?.id, encounterId)
                      }
                    >
                      {labTestGroup && labTestGroup[0] && (
                        <div className="flex justify-between text-sm leading-5 text-black w-[100%] mt-5 mb-3">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={labTestGroup[0]?.src}
                            className="aspect-square fill-black w-[15px] mr-2"
                          />
                          <div className="grow my-auto text-sm font-semibold">
                            Lab Test Request {labTestGroup[0]?.reqdate}
                          </div>
                        </div>
                      )}

                      {labTestGroup && labTestGroup[0] && (
                        <div key={groupIndex}>
                          <table style={{ width: "100%" }}>
                            <tr>
                              <div className="w-full">
                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
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
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                    }}
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
                              </div>
                            </tr>
                            <tr></tr>
                          </table>
                        </div>
                      )}
                    </tr>
                  </div>
                  <div className="text-sm text-blue-500 leading-5 flex ml-5 items-center">
                    <ReusableLabTest
                      child={
                        // <ViewLabRequest
                        // 	currentScreen={1}
                        // 	setCurrentScreen={setCurrentScreen}
                        // 	observationId={observationId}
                        // 	labTests={labTests[encounterId]}
                        // 	fetchEncounters={() => fetchEncounters(patientId, setLabTests)}
                        // 	hideBackButton={true}
                        // />

                        <LabTest
                          labTests={labTests[encounterId]}
                          referred_by_id={
                            currentUser.getState().user.license_id
                          }
                          patientData={patientData}
                        />
                      }
                      filename={"Lab Test"}
                    />
                  </div>
                </div>
              ))}
            <BackButton onClick={handleBackButtonClick} />
          </div>
        </>
      ) : currentScreen === 1 ? (
        <ViewLabRequest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          labTests={labTests[selectedEncounterId]}
          fetchEncounters={() => fetchEncounters(patientId, setLabTests)}
        />
      ) : currentScreen === 2 ? (
        <RecordLabTest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          patientId={patientId}
          labTests={labTests}
          encounterId={selectedEncounterId}
          fetchEncounters={() => fetchEncounters()}
        />
      ) : currentScreen === 3 ? (
        <VisitLabTests
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
        />
      ) : currentScreen === 4 ? (
        <ViewSelfPrickList
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          patientId={patientId}
        />
      ) : currentScreen === 5 ? (
        <ViewSelfPrick
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={observationId}
          patientId={patientId}
        />
      ) : (
        ""
      )}
    </>
  );
}
