import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LabTest from "../labtest_components/labTest";
import VisitLabtests from "./visitLabTests";
import AddLabTest from "./recordLabTest";
import BackButton from "./BackButton";
import { getEncounters } from "../../../../../../../lib/backend/health_records/getEncounter";
import { getObservation } from "../../../../../../../lib/backend/health_records/getObservation";
export default function LabTestList( {currentScreen, setCurrentScreen, patientId, encounterId, clinicVisitNumber} ) {
  const router = useRouter();
  const [testName, setTestName] = useState("");
  const [isTest, setTest] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const handleSetCurrentScreen = (screen) => {
    // Reset isTest to false when navigating back to screen 2
    if (screen === 2) {
      setTest(false);
      setAdd(false);
    }
    setCurrentScreen(screen);
  };


  
  const [containedIDs, setContainedIDs] = useState([]);

  const [labTests, setLabTests] = useState([]); 

  useEffect(() => {
  
    async function fetchEncountersAndObservations() {
      
      try {
        // Fetch encounters
        const encountersData = await getEncounters();
  
        // Find the encounter with the matching ID
        const selectedEncounter = encountersData.find(encounter => encounter.id === encounterId);
        console.log(selectedEncounter);
        
        if (!selectedEncounter) {
          console.error("Encounter not found with ID:", encounterId);
          return;
        }
       
        

        // Extract contained IDs from the selected encounter
        const encounterContained = selectedEncounter.resource.contained;
        const uniqueContainedIDs = new Set();
        if (Array.isArray(encounterContained) && encounterContained.length > 0) {
          encounterContained.forEach(id => {
            uniqueContainedIDs.add(id);
          });
        }
  
        // Convert the Set back to an array and update state
        const newContainedIDs = Array.from(uniqueContainedIDs);
        setContainedIDs(newContainedIDs);
        console.log(newContainedIDs);
        // Fetch observations
        const observationsData = await getObservation();
        console.log(observationsData);
        
       


        const observationIds = observationsData.map(observation => observation.id);
       
  
        // Filter observationIds by newContainedIDs
        const filteredObservationIds = observationIds.filter(id => newContainedIDs.includes(id));
        
        console.log(filteredObservationIds);
        
        // Extract data within observation.resource based on filteredObservationIds
        const filteredObservationData = observationsData.filter(observation =>
          filteredObservationIds.includes(observation.id)
        ).map(observation => observation.resource);
   
        console.log(filteredObservationData);

        const labTestObservations = filteredObservationData
        .filter(observation => observation.id === "labtest")
        .map(observation => ({
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?", // Assuming your backend response contains a 'src' field
          variable: observation.codeText,
          date: observation.effectiveDateTime
        }));
      
      console.log(labTestObservations);



      // Set lab test observations state
      setLabTests(labTestObservations);



        console.log(labTests);
      } catch (error) {
        console.error("Error fetching encounters and observations:", error);
      }
    }
  
    fetchEncountersAndObservations();
  }, [patientId, encounterId]);







  return (
    <>
    
  
      {isTest ? (
        <VisitLabtests currentScreen={3} setCurrentScreen={handleSetCurrentScreen}/>
      ) : isAdd ? (
        <AddLabTest currentScreen={4} setCurrentScreen={handleSetCurrentScreen}/>
      ) : (
        
        <>
        
          <span className="flex max-w-full justify-between gap-5 items-start max-md:flex-wrap">
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            VISIT - LAB TESTS
          </div>
            <div className="flex aspect-[3.3333333333333335] flex-col justify-center items-stretch mt-1.5">
              <span className="flex gap-1.5 justify-between px-10 py-1 rounded border border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5">
                <button
                  onClick={() => {
                    setTest(false);
                    setAdd(true);
                  }}
                  className="text-xs font-semibold leading-5"
                >
                  Add
                </button>
              </span>
            </div>
          </span>
          {labTests.map((item) => (
            <button
              onClick={() => {
               
                setTest(true);
                setAdd(false);
              }}
              className="flex flex-col mt-8"
              key={item.variable}
            >
              <span className="flex items-stretch justify-between gap-4">
                <Image
                  height={0}
                  width={0}
                  loading="lazy"
                  src={item.src}
                  className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
                  alt="picture"
                />
                <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap self-start">
                  {item.variable}
                </div>
              </span>
              <span className="flex items-center gap-3 ml-8 mt-1 self-start w-full">
                <div className="text-black text-xs font-medium leading-5">
                  Date: <br />
                </div>
                <div className="text-black text-xs font-medium leading-5">
                  {item.date} <br />
                </div>
              </span>
            </button>
          ))}
            <BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </>
      )}

    </>
  );
}
