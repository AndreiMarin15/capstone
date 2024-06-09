import Image from "next/image";
import BackButton from "./BackButton";
import { useState, useEffect } from "react";
import RecordLabTest from "./recordLabTest";
import useLabTestStore from "@/app/labTestStore";
export default function ViewLabRequest({ 
  currentScreen,
  setCurrentScreen, 
  labTests,
  fetchEncounters
}) {
  const [selectedObservationId, setSelectedObservationId] = useState(null);
  const [selectedEncounterId, setSelectedEncounterId] = useState(null);
  const setObservationId = useLabTestStore((state) => state.setObservationId);
  const observationId = useLabTestStore((state) => state.observationId);

  useEffect(() => {
    fetchEncounters();
  }, []);

  const handleRowClick = (observationId, encounterId) => {
    setSelectedObservationId(observationId);
    setSelectedEncounterId(encounterId);
    setCurrentScreen(2);
    setObservationId(observationId);
    console.log(observationId) // Set the observation ID in Zustand
  };
  return (
    <>
      {(currentScreen === 1) && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            LAB TESTS
          </div>
          <div className="text-black text-sm font-semibold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            Lab Test Request {labTests[0]?.reqdate}
          </div>{" "}
          <div className="flex-1 mr-4 text-xs">
            <table className="max-w-fit border-spacing-y-3 border-separate">
              <tbody className="text-xs leading-5 text-black">
                {labTests.map((item, index) => (
                  <tr key={index} onClick={() => handleRowClick(item.id, item.encounterId)}>
                    <td className="pl-2 pr-0">
                      <Image
                        alt="image"
                        height={0}
                        width={0}
                        loading="lazy"
                        src={item.src}
                        className="self-start aspect-square fill-black w-[15px]"
                      />
                    </td>
                    <td className="border-l-[16px] border-transparent">
                      <button>
                        <div className="flex justify-between">
                          {item.variable}
                          <div className="text-xs ml-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', textAlign: "right" }}>
                            {item.status === "requested" ? (
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
                            ) : item.status === "final" ? (
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
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackButton
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      )}
        {(currentScreen === 2) && (
     <RecordLabTest
     currentScreen={currentScreen}
     setCurrentScreen={setCurrentScreen}
     observationId={observationId}
     labTests={labTests}
     encounterId={encounterId} // Add this line
     fetchEncounters={() => fetchEncounters()} 
   />
      )}
    </>
  );
}
