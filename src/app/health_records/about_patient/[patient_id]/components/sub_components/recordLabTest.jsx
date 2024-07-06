import Image from "next/image";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import BackButton from "./BackButton";
import doctor from "@/backend//health_records/doctor";
import { getEncounterById } from "@/backend//health_records/getEncounter";
import { getObservationsByPatientId, updateObservation } from "@/backend//health_records/getObservation";
import { healthRecords } from "@/backend//health_records/health_records";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import useLabTestStore from "@/app/labTestStore";

import "react-toastify/dist/ReactToastify.css";

const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="max-w-screen-lg">
        <img src={src} alt="full" className="max-w-full max-h-full" />
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default function RecordLabTest({
  currentScreen,
  setCurrentScreen,
  patientId,
  encounterId,
}) {

  const observationId = useLabTestStore((state) => state.observationId);
  console.log("observationID: ", observationId)
  const [doctorId, setDoctorId] = useState("");
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [labTestsList, setLabTestsList] = useState([]);
  const [filteredLabTests, setFilteredLabTests] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        setDoctorId(doctorInfo.fullName);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchEncounter = async () => {
      try {
        const encounter = await getEncounterById(encounterId);
        const observationsData = await getObservationsByPatientId(patientId);
        
        // Filter lab tests based on observationId
        const labTestObservations = observationsData
          .filter((observation) => observation.resource.id === 'labtest')
          .filter((observation) => observation.id === observationId)
          .map((observation) => ({
            id: observation.resource.id,
            doctor: encounter.resource.participant.actor,
            srcdoctor:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
            variable: observation.resource.codeText,
            remarks: observation.resource.remarks,
            update: observation.resource.uploadedDateTime,
            date: observation.resource.effectiveDateTime,
            reqdate: encounter.resource.period.start,
            status: observation.resource.status,
          }));
    
        setLabTestsList(labTestObservations);
      } catch (error) {
        console.error("Error fetching encounter:", error);
      }
    };
  
    if (encounterId) {
      fetchEncounter();
    }
  }, [encounterId]);

  const handleSaveLabTest = async () => {
    setFormSubmitted(true);
    if (!validateFields()) {
      return;
    }
    try {
      const doctorInfo = await doctor.getDoctorByCurrentUser();
      // Get the observation data from labTestsList
  
  
      // Construct payload with updated data
      const updatedObservationData = {
        resource: {
          id: "labtest",
          code: {
            coding: [
              {
                code: "YOUR_LOINC_CODE",
                system: "http://loinc.org"
              }
            ]
          },
          status: "final",
          remarks: labTestsList[0]?.remarks,
          subject: {
            type: "Patient",
            reference: patientId
          },
          codeText: labTestsList[0]?.variable,
          // Assuming uploadedImageSrc is defined elsewhere
          imageSrc: uploadedImageSrc,
          participant: {
            type: "Doctor",
            actor: doctorId,
            license_id: doctorInfo.license,
          
          },
          
          resource_type: "Observation",
          rangeQuantity: {
            rangeQuantities: ranges.map((range) => ({
              level: range.level,
              min: range.min,
              max: range.max
            }))
          },
          valueQuantity: {
            valueQuantities: labValues.map((labValues) => ({
              display: labValues.labValueName,
              value: labValues.value,
              unit: labValues.unit
            }))
          },
          uploadedDateTime: dateTaken,
          effectiveDateTime: dateUntil,
          requestedDateTime: labTestsList[0]?.reqdate
        }
      };
  
      // Send updated data to backend to update observation
      const response = await updateObservation(observationId, updatedObservationData);
  
      // Handle success response from backend
      console.log("Observation updated successfully:", response);
  
      toast.success("Lab Test Recorded", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000
      });
  
      setCurrentScreen(1);
    } catch (error) {
      console.error("Error updating observation:", error);
      toast.error("Error updating observation", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000
      });
    }
  };
  
  const [labTestResults, setLabTestResults] = useState([]);
  const [dateOfResult, setDateOfResult] = useState("");
  const [dateOfRequest, setdateOfRequest] = useState("");
  const [labValueName, setLabValueName] = useState("");
  const [labTestName, setLabTestName] = useState("");
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTaken, setDateTaken] = useState("")
  const [dateUntil, setDateUntil] = useState("")

  
  const validateFields = () => {
    let valid = true;
  
    if (!dateTaken) {
      valid = false;
    
        toast.error("Date Taken is required.", {
          autoClose: 2000,
        });
      
    }
    if (!dateUntil) {
      valid = false;
     
        toast.error("Valid Until is required.", {
          autoClose: 2000,
        });
      
    }
   
    if (!uploadedImageSrc) {
      valid = false; 
        toast.error("Upload is required.", {
          autoClose: 2000,
        });
    }

  
    return valid;
  };
  
  const [labValues, setLabValues] = useState([{ labValueName: "", value: "", unit: "" }]);
  const [ranges, setRanges] = useState([
    { level: "High", min: "", max: "" },
    { level: "Medium", min: "", max: "" },
    { level: "Low", min: "", max: "" },
  ]);


  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const fileInputRef = useRef(null);

  const getImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (files) => {
    const file = files[0];
    try {
      const base64Image = await getImageBase64(file);
      setUploadedImageSrc(base64Image);
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 
  const handleAddRow = () => {
    setLabValues([...labValues, { labValueName: "", value: "", unit: "" }]);
    setRanges([
      ...ranges,
      { level: "High", min: "", max: "" },
      { level: "Medium", min: "", max: "" },
      { level: "Low", min: "", max: "" },
    ]);
  };

  const handleValueChange = (value, index) => {
    const updatedlabValues = [...labValues];
    updatedlabValues[index].value = value;
    setLabValues(updatedlabValues);
  };

  const handleUnitChange = (unit, index) => {
    const updatedlabValues = [...labValues];
    updatedlabValues[index].unit = unit;
    setLabValues(updatedlabValues);
  };

  const handleLevelChange = (value, index) => {
    const updatedranges = [...ranges];
    updatedranges[index].level = value;
    setRanges(updatedranges);
  };

  
  const handleMinChange = (value, index) => {
    const updatedranges = [...ranges];
    updatedranges[index].min = value;
    setRanges(updatedranges);
  };

  const handleMaxChange = (value, index) => {
    const updatedranges = [...ranges];
    updatedranges[index].max = value;
    setRanges(updatedranges);
  };


  const handleAddLabTest = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const newDateFieldValue = `${year}-${month}-${day}`;
    setNewDateField(newDateFieldValue);
    console.log(newDateFieldValue);

    let base64Image = null;
    if (uploadedImageSrc) {
      base64Image = uploadedImageSrc.split(",")[1];
    }

    const valueQuantities = rows?.map((row) => ({
      display: row.labValueName,
      unit: row.unit,
      value: row.value,
    }));

    const reqdate = labTestsList.length > 0 ? labTestsList[0].reqdate : null;

    
    const labTestData = {
      
      loincCode: "YOUR_LOINC_CODE",
      status: "final",
      valueQuantities: rows?.map((row) => ({
        display: row.labValueName,
        unit: row.unit,
        value: row.value,
      })),

      subject: {
        type: "Patient",
        reference: patientId,
      },
      participant: {
        type: "Doctor",
        actor: doctorId,
        license_id: doctorInfo.license,
      },

      dateOfUpdate: dateTaken,
      dateOfRequest: reqdate,

      dateOfResult: dateUntil,
      labTestName: labTestName,
      base64Image: base64Image,
    };
    console.log(labTestData);
    handleSave(labTestData, false);

    toast.success("Lab Test Recorded", {
      position: "top-left",
      theme: "colored",
      autoClose: 2000,
    });

    setCurrentScreen(0);
  };

  const handleLabValueNameChange = (value, index) => {
    const updatedlabValues = [...labValues];
    updatedlabValues[index].labValueName = value;
    setLabValues(updatedlabValues);
  };


  const handleLabInputChange = (e, rowIndex) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredTests = ["Total Cholesterol", "Glucose"].filter((test) =>
      test.toLowerCase().includes(inputValue)
    );
  
    // Update the filteredLabTests state specific to the current lab value index
    setFilteredLabTests(prevState => ({
      ...prevState,
      [rowIndex]: filteredTests,
    }));
  };
  
console.log(labTestsList)
  return (
    <>
      {currentScreen === 2 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">
            RECORD LAB TEST
          </div>

          <div>
            <div className="flex flex-col max-w-full">
              <div className="w-full max-md:max-w-full">
            

                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
                  <table className="ml-5 w-[50%] max-md:ml-0 max-md:w-full text-xs">
                    <tbody>
                      <tr>
                        <td className="flex gap-16 pr-14 mt-4 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">*Date Taken</div>
                          </div>
                          <td>
                            <input
                               className={`justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 ${
                                formSubmitted && !dateTaken ? "border-red-500" : ""
                              }`}
                              type="date"
                              onChange={(e) => {
                                console.log("date Taken:", e.target.value);
                                setDateTaken(e.target.value);
                              }}
                            />
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td className="flex pr-14 mt-6 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/05dd7068174eb76cbab2ba8d9608b143eabae9c2e3d1be451a944916466c9ae8?"
                              className="mr-4 aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">Name of Lab Test</div>
                          </div>
                          <td>
                          <input
                            className="ml-6 justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
                            value={labTestsList[0]?.variable}
                            readOnly
                          />
                          </td>
                        </td>
                        <td className="flex gap-16 pr-14 mt-4 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">*Valid Until</div>
                          </div>
                          <td>
                          
                          <input
                              className={`justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 ${
                                formSubmitted && !dateUntil ? "border-red-500" : ""
                              }`}
                              type="date"
                              onChange={(e) => {
                                console.log("date Until:", e.target.value);
                                setDateUntil(e.target.value);
                              }}
                            />
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td className="flex gap-10 mt-6">
                          <div
                            className={`flex flex-col items-center px-20 py-8 text-xs leading-5 text-center bg-white border-black border-solid border-[0.5px] max-w-[600px] ${
                              formSubmitted && !uploadedImageSrc ? "border-red-500" : "border-black"
                            }
                            `}
                            onDrop={(e) => handleDrop(e)}
                            onDragOver={(e) => handleDragOver(e)}
                          >
                            {uploadedImageSrc ? (
                              <>
                                <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
                                  <div
                                    className="w-auto max-w-full h-[400px] cursor-pointer flex justify-center" // Adjusted classes
                                    onClick={handleOpenModal}
                                  >
                                    <img
                                      src={uploadedImageSrc}
                                      alt="uploaded"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "80%",
                                      }}
                                    />
                                  </div>
                                </div>
                                <button
                                  className="mt-2 text-sky-600 underline cursor-pointer"
                                  onClick={() => setUploadedImageSrc(null)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <Image
                                  alt="image"
                                  height={0}
                                  width={0}
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d670cd5944e41d3f0d0ba9e28820c872d801df2a901fa93765c19dc39e0b53f7?"
                                  className="aspect-[1.03] w-[38px]"
                                />
                                <div className="self-stretch mt-1.5 text-black">
                                *Drag or drop here.
                                </div>
                                <div
                                  className="mt-3.5 font-light text-sky-600 underline"
                                  onClick={handleUploadClick}
                                >
                                  Upload
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload(e.target.files)
                                  }
                                  ref={fileInputRef}
                                />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                
                  <table className="max-w-fit border-spacing-y-2 border-separate">
                    <tbody className="text-xs leading-5 text-black">
                      {labValues?.map((row, index) => (
                          <React.Fragment key={index}>
                              <td>
                                  <div className="flex gap-4 mt-10 my-auto font-semibold text-black">
                                    <Image
                                      alt="image"
                                      height={0}
                                      width={0}
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/835c2c533b5709aa853e0418efd68df6d00f1c923dd0dedb18dc8516044c5f8b?"
                                      className="aspect-square fill-black w-[15px]"
                                    />
                                    <div className="my-auto text-xs">Lab Values</div>
                                  </div>
                            </td>
                            <tr>
                              <td className="border-l-[16px] border-transparent">
                            
                              <div className="inline-block relative">
                              <input
                                className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                type="text"
                                placeholder={`Lab Value ${index + 1}`}
                                value={row.labValueName}
                                onChange={(e) => handleLabValueNameChange(e.target.value, index)}
                                onInput={(e) => handleLabInputChange(e, index)} // Pass rowIndex to handleLabInputChange
                              />
                              {filteredLabTests[index]?.length >= 0 && (
                                  <ul
                                  style={{
                                    listStyle: "none",
                                    padding: "unset",
                                    margin: "unset",
                                    position: "absolute",
                                    width: "175px", // Adjust width as needed
                                    maxHeight: "100px", // Adjust max height as needed
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                  }}>
                                    {filteredLabTests[index].map((labTest, idx) => (
                                      <li  
                                      className="border text-black text-sm border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300" 
                                      key={idx}>
                                        <button
                                          className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
                                          onClick={() => {
                                            const updatedLabValues = [...labValues];
                                            updatedLabValues[index] = {
                                              ...updatedLabValues[index],
                                              labValueName: labTest,
                                            };
                                            setLabValues(updatedLabValues);
                                            // Reset filteredLabTests for this index after selection
                                            setFilteredLabTests(prevState => ({
                                              ...prevState,
                                              [index]: [],
                                            }));
                                          }}
                                        >
                                          {labTest}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              </td>
                              <td className="border-l-[8px] border-transparent flex items-center">
                                <span className="mt-2 flex items-center text-black font-medium">=</span>
                              </td>
                              <td className="border-l-[8px] border-transparent">
                            
                                <input
                                  className="justify-center py-2 pr-4 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                  type="text"
                                  placeholder="Enter value"
                                  value={row.value}
                                  onChange={(e) => handleValueChange(e.target.value, index)}
                                />
                              </td>
                              <td className="border-l-[20px] border-transparent">
                              
                                <input
                                  className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                  type="text"
                                  placeholder="Unit"
                                  value={row.unit}
                                  onChange={(e) => handleUnitChange(e.target.value, index)}
                                />
                              </td>
                            </tr>
                            {/* Ranges */}
                            <td>
                            <div className="flex gap-4 my-auto font-semibold text-black">
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/04feedd180d99a276d32b47268955875856411c5fd622922cd3c35776c289845?"
                                className="aspect-square fill-black w-[22px]"
                              />
                              <div className="my-auto text-xs">Ranges</div>
                            </div>
                          </td>
                            {ranges.slice(index * 3, index * 3 + 3).map((range, rangeIndex) => (
                              <tr key={`${index}-${rangeIndex}`}>
                                <td colSpan="4" className="border-l-[16px] border-transparent">
                              
                                  <input
                                    className="justify-center py-2 pr-2 pl-2 mr-4 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-[100px]"
                                    type="text"
                                    value={range.level}
                                    onChange={(e) => handleLevelChange(e.target.value, index * 3 + rangeIndex)}
                                  />
                              
                                  <input
                                    className="justify-center py-2 px-2 mr-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16 ml-1"
                                    type="text"
                                    placeholder="Min"
                                    value={range.min}
                                    onChange={(e) => handleMinChange(e.target.value, index * 3 + rangeIndex)}
                                  />
                                <span>-</span>
                                  <input
                                    className="justify-center py-2 px-2 ml-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                                    type="text"
                                    placeholder="Max"
                                    value={range.max}
                                    onChange={(e) => handleMaxChange(e.target.value, index * 3 + rangeIndex)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      <tr>
                        <td colSpan="4" className="text-center">
                          <button
                            className="mt-3 flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]"
                            onClick={() => handleAddRow()}
                          >
                            <div className="justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[26px] w-[26px]">
                              +
                            </div>
                            <div className=" my-auto text-xs text-gray-400">
                              Add another row
                            </div>
                          </button>
                        
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />

            <Button
              className="flex items-center ml-12 px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
              onClick={handleSaveLabTest}
            >
              Save
            </Button>
          </div>
          {isModalOpen && (
            <ImageModal src={uploadedImageSrc} onClose={handleCloseModal} />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
