import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import VisitLabTests from "./sub_components/visitLabTests";
import { useState } from "react";
export default function LabTests() {
    const tests = [
        {
            srctest: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            testname: "2D ECHO",
            srddoctor: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
            doctor: "Dr. Johnny Santos",
            datereq: "2020-01-10",
            dateup: "2020-01-13",
        },
        {
            srctest: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            testname: "Hb1A1C",
            srddoctor: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
            doctor: "Dr. Maria Santos",
            datereq: null,
            dateup: null,
        },
        
    ];
    const [currentScreen, setCurrentScreen] = useState(0);
    const handleMedicationClick = (medication) => {
       
        // Set currentScreen to the desired value when a medication item is clicked
        setCurrentScreen(1) // Assuming the desired value for the second screen is 1
        console.log("current Screen:", currentScreen);
    };


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
                    {tests.map((medication, index) => (
                        <button key={index} className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]" onClick={() => handleMedicationClick(medication)}>
                            <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                                <Image
                                    alt="image"
                                    height={0}
                                    width={0}
                                    loading="lazy"
                                    src={medication.srctest}
                                    className="aspect-square fill-black w-[15px]"
                                />
                                <div className="my-auto">{medication.testname}</div>
                            </div>
                            <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                                <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                                    <Image
                                        alt="image"
                                        height={0}
                                        width={0}
                                        loading="lazy"
                                        src={medication.srddoctor}
                                        className="w-4 aspect-square"
                                    />
                                    <div className="grow my-auto">{medication.doctor}</div>
                                </div>
                                <div className="flex-auto my-auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Date Requested:</span> {medication.datereq}
                                    </div>
                                    <div>
                                        {medication.dateup ? (
                                            <>
                                                <span style={{ marginLeft: '9px', fontWeight: 'bold' }}>Date Uploaded:</span> {medication.dateup}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                {medication.dateup && (
                                    <div className="flex-auto my-auto justify-between" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'green', marginRight: '5px' }}></div>
                                        <div className="flex-auto my-auto">Uploaded</div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                    <BackButton/>
                </div>
            )}
            {currentScreen === 1 && (
                <VisitLabTests currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
            )}
        </>
    );
}