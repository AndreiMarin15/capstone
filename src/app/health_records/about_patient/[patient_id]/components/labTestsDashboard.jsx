import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import VisitLabTests from "./sub_components/visitLabTests";
import ViewLabRequest from "./sub_components/viewLabRequest";

import { useState, useEffect } from "react";
import {
  getEncounters,
  getEncounterByPatientId,
} from "@/backend//health_records/getEncounter";
import { getObservationsByPatientId } from "@/backend//health_records/getObservation";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LabTests({ patientId }) {
  const tests = [
    {
      srctest:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
    },
  ];

  const [containedIDs, setContainedIDs] = useState([]);
  const [dateOfRequest, setDateOfRequest] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [selectedObservationId, setSelectedObservationId] = useState(null);

  const [currentScreen, setCurrentScreen] = useState(0);
  const handleMedicationClick = (labTest) => {
    // Set currentScreen to the desired value when a medication item is clicked
    setCurrentScreen(1); // Assuming the desired value for the second screen is 1
    console.log("current Screen:", currentScreen);
  };

  useEffect(() => {
    async function fetchEncounters() {
      console.log(patientId);
      try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        const encountersData = await getEncounterByPatientId(patientId);
        console.log(encountersData);
        encountersData.forEach((encounter) => {
          const encounterContained = encounter.resource.contained;
          console.log(encounterContained);
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
            src:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            remarks: observation.resource.remarks,
            variable: observation.resource.codeText,
            update: observation.resource.uploadedDateTime,
            date: observation.resource.effectiveDateTime,
            reqdate: observation.resource.requestedDateTime, // Include request date
            status: observation.resource.status,
          }));

        const labTestsGrouped = labTestObservations.reduce((acc, labTest) => {
          acc[labTest.reqdate] = acc[labTest.reqdate] || [];
          acc[labTest.reqdate].push(labTest);
          return acc;
        }, {});

        console.log(labTestObservations);
        setLabTests(labTestsGrouped);
      } catch (error) {
        console.error("Error fetching encounters and observations:", error);
      }
    }

    fetchEncounters();
  }, [patientId]);

  useEffect(() => {
    console.log(labTests);
  }, [labTests]);

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
                <span className="flex items-center gap-1 px-1 py-1 mt-8 rounded-md font-normal mr-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentScreen(2);
                    }}
                  >
                    Self-Pricking
                  </Button>
                </span>
              </div>
            </div>
            <Tabs defaultValue="all" className="w-[400px]">
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

            {Object.entries(labTests).map(([reqDate, labTestGroup], groupIndex) => (
  <tr key={groupIndex}>
    <div className="flex justify-between text-xs leading-5 text-black max-w-[650px] mt-5">
      <Image
        alt="image"
        height={0}
        width={0}
        loading="lazy"
        src={labTestGroup[0].src}
        className="aspect-square fill-black w-[15px] mr-2"
      />
      <div className="grow my-auto text-sm font-medium">Lab Test {reqDate}</div>
    </div>

    <div key={groupIndex}>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                alt="image"
                src={labTestGroup[0].srcdoctor}
                height={0}
                width={0}
                loading="lazy"
                style={{ aspectRatio: '1', fill: 'black', width: '15px', marginRight: '2px' }}
              />
              <div className="text-xs" style={{ whiteSpace: 'nowrap' }}>
                Dr. {labTestGroup[0].doctor}
              </div>
            </div>
          </td>
          <td style={{ textAlign: 'right' }}>
            <div className="text-xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {labTestGroup[0].status === "requested" ? (
                <>
                  <svg
                    className="h-3 w-3 ml-1 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                  <span style={{ marginLeft: '0.25rem' }}>Requested</span>
                </>
              ) : labTestGroup[0].status === "final" ? (
                <>
                  <svg
                    className="h-3 w-3 ml-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                  <span style={{ marginLeft: '0.25rem' }}>Uploaded</span>
                </>
              ) : null}
            </div>
          </td>
          <td style={{ width: '50%' }}>
            <div className="text-xs text-blue-500 leading-5 flex ml-5 items-center">
              <Button variant="download"> ↓ Download (.pdf)</Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </tr>
))}
            <BackButton />
          </div>
        </>
      ) : currentScreen === 1 ? (
        <ViewLabRequest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={selectedObservationId}
        />
      ) : currentScreen === 2 ? (
        <ViewLabRequest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          observationId={selectedObservationId}
        />
      ) : (
        ""
      )}
    </>
  );
  }