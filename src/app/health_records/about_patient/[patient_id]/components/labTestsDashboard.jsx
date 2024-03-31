import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import VisitLabTests from "./sub_components/visitLabTests";
import { useState, useEffect } from "react";
import { getEncounters, getEncounterByPatientId } from "../../../../../../lib/backend/health_records/getEncounter";
import { getObservationsByPatientId} from "../../../../../../lib/backend/health_records/getObservation";
import doctor from "../../../../../../lib/backend/health_records/doctor";

export default function LabTests({ patientId }) {
    const tests = [
        {
            srctest: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
        
            srddoctor: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
        
        },
    ];

    const [containedIDs, setContainedIDs] = useState([]);
    const [dateOfRequest, setDateOfRequest] = useState(""); 
    const [labTests, setLabTests] = useState([]); 
    const [selectedObservationId, setSelectedObservationId] = useState(null);

    const [currentScreen, setCurrentScreen] = useState(0);
    const handleMedicationClick = (labTest) => {
       
        // Set currentScreen to the desired value when a medication item is clicked
        setCurrentScreen(1) // Assuming the desired value for the second screen is 1
        console.log("current Screen:", currentScreen);
    };


    useEffect(() => {
  
        async function fetchEncounters() {
            console.log(patientId);
            try {
            const doctorInfo = await doctor.getDoctorByCurrentUser();
            const encountersData = await getEncounterByPatientId(patientId);
            console.log(encountersData);
            encountersData.forEach(encounter => {
                const encounterContained = encounter.resource.contained;
                console.log(encounterContained);
              });

            const observationsData = await getObservationsByPatientId(patientId);
            console.log(observationsData);
            
            const labTestObservations = observationsData.filter(observation => observation.resource.id === "labtest").map(observation => ({
              id: observation.id,
              doctor: observation.resource.participant.actor,
              srcdoctor:"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
              src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?", 
              variable: observation.resource.codeText,
              date: observation.resource.effectiveDateTime,
              reqdate: observation.resource.requestedDateTime,
              status: observation.resource.status
          }));
          
          console.log(labTestObservations);
          setLabTests(labTestObservations);

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
            {currentScreen === 0 && (
                <div>
                    <div className="flex justify-between">
                        <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
                            LAB TESTS
                        </div>
                        <div className="flex items-center">
                            <span className="flex items-center gap-1 px-1 py-1 mt-8 rounded-md border-[0.5px] border-solid border-black font-normal mr-2">
                                <Image
                                    alt="picture"
                                    height={0}
                                    width={0}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/872489d37c6f07090c71fb194a8c077334f5ee8d7e865b4e470f49f5a27b95ba?apiKey=66e07193974a40e683930e95115a1cfd&"
                                    className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                                />
                                <div className="text-black text-xs leading-5 self-center whitespace-nowrap">
                                    FILTER
                                </div>
                            </span>
                            <span className="flex items-center gap-1 px-1 py-1 mt-8 rounded-md border-[0.5px] border-solid border-black font-normal">
                                <Image
                                    alt="picture"
                                    height={0}
                                    width={0}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/49eeb01b15c87289299d3123ede7ccfbf333d278cb9ddfc7f5674a94c5d52e26?apiKey=66e07193974a40e683930e95115a1cfd&"
                                    className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                                />
                                <div className="text-black text-xs leading-5 self-center">SORT</div>
                            </span>
                        </div>
                    </div>
                    {labTests.map((labTest, index) => (
                        <button 
                        key={index} 
                        className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]" 
                        onClick={() => {
                            handleMedicationClick(labTest);
                            setSelectedObservationId(labTest.id);
                        }}
                        >
                        <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                            <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src={labTest.src}
                                className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">{labTest.variable}</div>
                        </div>
                        <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                            <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                            <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src={labTest.srcdoctor}
                                className="aspect-square fill-black w-[15px]"
                            />
                                <div className="grow my-auto">{labTest.doctor}</div>
                            </div>
                            <div className="flex-auto my-auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {labTest.status !== "final" && labTest.reqdate && (
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Date Requested:</span> {labTest.reqdate}
                                    </div>
                                )}
                                {labTest.date && (
                                    <div>
                                        <span style={{ marginLeft: '9px', fontWeight: 'bold' }}>Date of Result:</span> {labTest.date}
                                    </div>
                                )}
                            </div>
                            {labTest.status === "requested" && (
                                <div className="text-black text-xs font-medium leading-5 flex items-center">
                                    <svg className="h-3 w-3 ml-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="5" />
                                    </svg>
                                    Requested
                                </div>
                            )}
                            {labTest.status === "final" && (
                                <div className="text-black text-xs font-medium leading-5 flex items-center">
                                    <svg className="h-3 w-3 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="5" />
                                    </svg>
                                    Uploaded
                                </div>
                            )}
                            </div>
                        </button>
                    ))}
                    <BackButton/>
                </div>
            )}
            {currentScreen === 1 && (
                <VisitLabTests currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} observationId={selectedObservationId}/>
            )}
        </>
    );
}