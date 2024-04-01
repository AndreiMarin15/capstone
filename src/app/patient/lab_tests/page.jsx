"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react"; // <-- Import useState from React
import Image from "next/image";
import UploadLab from "./components/uploadLab";
import AddLab from "./components/addLab";
import ViewLab from "./components/viewLab";
import doctor from "../../../../lib/backend/health_records/doctor";
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../personal_details/components/sub_components/BackButton";
import { getEncounters, getEncounterById, updateEncounterContained } from "../../../../lib/backend/health_records/getEncounter";
import { getObservation } from "../../../../lib/backend/health_records/getObservation";
import { uploadObservation } from "../../../../lib/backend/health_records/uploadObservation";

export default function LaboratoryList( {currentScreen, setCurrentScreen, patientId, encounterId}) {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const [testName, setTestName] = useState("");
  const [isTest, setTest] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const handleSaveRef = useRef();

  const [containedIDs, setContainedIDs] = useState([]);
  const [dateOfRequest, setDateOfRequest] = useState(""); 
  const [labTests, setLabTests] = useState([]); 
  const [selectedObservationId, setSelectedObservationId] = useState(null);

  useEffect(() => {
    // Fetch encounters and observations
    fetchEncountersAndObservations();
}, [currentScreen, encounterId]);
  
  useEffect(() => {
    // Log labTests whenever it changes
    console.log(labTests);
  }, [labTests]);
  

  // Function to fetch encounters and observations
  async function fetchEncountersAndObservations() {
    try {
      // Fetch encounters
      const encountersData = await getEncounters();
      // Find the encounter with the matching ID
      const selectedEncounter = encountersData.find(encounter => encounter.id === encounterId);
  
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
  
      // Fetch observations
      const observationsData = await getObservation();
      console.log(observationsData);

      const observationIds = observationsData.map(observation => observation.id);

      const filteredObservationIds = observationIds.filter(id => newContainedIDs.includes(id));

      console.log(filteredObservationIds);
  
      // Extract data within observation.resource based on filteredObservationIds
      const filteredObservationData = observationsData
        .filter(observation => filteredObservationIds.includes(observation.id))
        .map(observation => observation.resource);
  
        console.log(filteredObservationData);

        const labTestObservations = observationsData
        .filter(observation => newContainedIDs.includes(observation.id) && observation.resource.id === "labtest")
        .map(observation => ({
          id: observation.id,
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?", 
          variable: observation.resource.codeText,
          update: observation.resource.uploadedDateTime,
          date: observation.resource.effectiveDateTime,
          reqdate: observation.resource.requestedDateTime,
          status: observation.resource.status
      }));
      
      console.log(labTestObservations);
      // Set lab test observations state
      setLabTests(labTestObservations);
      setCurrentScreen(currentScreen);

    } catch (error) {
      console.error("Error fetching encounters and observations:", error);
    }
  }

  const handleSave = async (observation) => {
    try {
      	
     
        if (observation !== undefined && observation !== null) {
            
          const savedData= await uploadObservation(observation);
            console.log("Data saved successfully:", savedData);
            if (Array.isArray(savedData) && savedData.length > 0) {
              const observationId = savedData[0].id; // Accessing the id property of the first observation
              console.log("Observation ID:", observationId);

              // Now proceed with updating the encounter or any other necessary action
          
            console.log(encounterId);
            const encounterToUpdate = await getEncounterById(encounterId);
            console.log(encounterToUpdate);
            if (encounterToUpdate) {

             
              // Update the encounter's contained array with the observation ID
              console.log(encounterToUpdate.resource.contained)
              setDateOfRequest(encounterToUpdate.resource.period.start);
              console.log(dateOfRequest);
              encounterToUpdate.resource.contained.push(observationId);
              await updateEncounterContained(encounterToUpdate.resource.contained, encounterToUpdate);
              console.log("updated" , encounterToUpdate.resource.contained)
         
              setCurrentScreen(currentScreen);
              
          } else {
              console.error("Encounter not found with ID:", encounterId);
          }
        }
        }
          
         
        
    } catch (error) {
        console.error("Error saving data:", error);
    }
};


const addLabTestData = async (data) => {
 
 console.log(data)
    try {
        const newObservation = {
            id: `labtest`,
            status: data.status,
            code: {
                coding: [
                    {
                        code: "YOUR_LOINC_CODE",
                        system: "http://loinc.org",
                    }
                ]
            },
            subject: {
                type: "Patient",
                reference: patientId,
            },
            participant: {
              type: "Doctor",
              actor: data.participant.actor,
            },
            resource_type: "Observation",
            valueQuantity: {
                valueQuantities: data.valueQuantities.map((val) => ({
                    display: val.display,
                    unit: val.unit,
                    value: val.value,
                })),
            },
            uploadedDateTime: data.dateOfUpdate,
            effectiveDateTime: data.dateOfResult,
            requestedDateTime: data.dateOfRequest,
            codeText: data.labTestName,
            imageSrc: data.base64Image,
        };

        console.log(newObservation);
  
        handleSave(newObservation);
  
    } catch (error) {
        console.error("Error adding lab test data:", error);
    }
};





  return [
    currentPage === 0 ? (
      <div className="w-full bg-white flex flex-col items-center px-20 py-12 h-auto max-md:px-5">
        <span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
          <span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
            <div className="text-black text-xl text-base font-semibold leading-6 my-auto">
              Lab Tests
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-2.5">
              <button className="flex gap-1 px-5 py-2 text-xs rounded-md border border-black border-solid">
                <Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                  width="100"
                  height="100"
                  className="shrink-0 w-3 aspect-[0.85]"
                />
                <div className="self-start">FILTER</div>
              </button>
              <button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
                SORT
              </button>
            </div>
          </span>
        </span>

        <button
          className="flex gap-1.5 justify-center self-end px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
          onClick={() => {

            setCurrentPage(3);
          }}
        >
          Add
        </button>
        <div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
          <div className="w-full max-md:max-w-full h-full">
          {labTests.map((item) => (
            <button
              onClick={() => {
                if (item.status === "requested") {
                  setCurrentPage(2);
                } else if (item.status === "final") {
                  setCurrentPage(4);
                }
                setSelectedObservationId(item.id);
                console.log(selectedObservationId);
              }}
              className={`flex flex-col mt-8`}
              key={item.variable}
            >
              <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                <Image
                  height={0}
                  width={0}
                  loading="lazy"
                  src={item.src}
                  className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
                  alt="picture"
                />
                <div className="my-auto text-sm">{item.variable}</div>
              </div>
              <div className="flex gap-5 justify-between ml-7 text-sm max-md:ml-2.5">
                
                
              

                <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                  Requested on:
                  <div className="grow my-auto text-sm">{item.reqdate}</div>
                </div>
               
                {item.status !== "requested" && (
                  <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                    Uploaded on:
                    <div className="grow my-auto ">{item.update}</div>
                  </div>
                )}
                {item.status === "requested" && (
                  <div className="text-black font-medium text-sm leading-5 flex items-center">
                    <svg
                      className="h-3 w-3 ml-1 text-red-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="5" />
                    </svg>
                    Requested
                  </div>
                )}
                {item.status === "final" && (
                  <div className="text-black text-m font-medium leading-5 text-sm flex items-center">
                    <svg
                      className="h-3 w-3 ml-1 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="5" />
                    </svg>
                    Uploaded
                  </div>
                )}
              </div>
            </button>
          
          ))}
            <BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
          </div>
        </div>
      </div>
    ) : currentPage === 3 ? (
      <div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
            <AddLab
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        patientId={patientId} 
        encounterId={encounterId}
        setCurrentScreen={setCurrentScreen}  // Pass setCurrentScreen as prop
        handleSave={(data) => {
          addLabTestData(data);
          handleSave();
        }} 
      />
      </div>
    ) : currentPage === 2 ? (
      <div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
        <UploadLab currentPage={currentPage} setCurrentPage={setCurrentPage} observationId={ selectedObservationId }  setCurrentScreen={setCurrentScreen}/>
      </div>
    ) :  currentPage === 4 ? (
      <div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
        <ViewLab currentPage={currentPage} setCurrentPage={setCurrentPage} observationId={ selectedObservationId }/>
      </div>


    ) : (
      <></>
    ),
  ];
}
