import React from "react";
import Image from "next/image";
import BackButton from "../../my_health_record/components/sub_components/BackButton";
import doctor from "@/backend/health_records/doctor";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  getObservationById,
  updateObservation,
} from "@/backend/health_records/getObservation";
import { toast } from "react-toastify";
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

export default function UploadLab({
  currentPage,
  setCurrentPage,
  observationId,
  setCurrentScreen,
  patientId,
}) {
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observations, setObservations] = useState([]);
  const [dateTaken, setDateTaken] = useState("");
  const [labValues, setLabValues] = useState([{ labValueName: "", value: "", unit: "" }]);
  const [ranges, setRanges] = useState([{ level: "", min: "", max: "" }]);
  const [dateUntil, setDateUntil] = useState("")

  
  useEffect(() => {
    async function fetchObservations() {
      console.log(observationId);
      try {
        const observationsData = await getObservationById(observationId);
        console.log(observationsData);
        console.log(observationsData.resource.codeText)
        setObservations(observationsData);
       
      } catch (error) {
        console.error("Error fetching observations:", error);
      }
    }

    fetchObservations();
  }, []);


 console.log(observations)


  const handleSave = async () => {
   

    try {
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
          remarks: observations.resource.remarks,
          subject: {
            type: "Patient",
            reference: patientId
          },
          codeText: observations.resource.codeText,
          imageSrc: uploadedImageSrc,
          participant: {
            type: "Doctor",
            actor: observations.resource.participant.actor,
            license_id: observations.resource.participant.license_id,
          
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
          requestedDateTime: observations.resource.requestedDateTime
        }
      };

      // Send updated data to backend to update observation
      const response = await updateObservation(
        observationId,
        updatedObservationData
      );

      // Handle success response from backend
      console.log("Observation updated successfully:", response);

      toast.success("Lab Test Recorded", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });

      setCurrentPage(0);
    } catch (error) {
      console.error("Error updating observation:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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



  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddLabValueRow = () => {
    setLabValues([...labValues, { labValueName: "", value: "", unit: "" }]);
  };

  const handleAddRangeRow = () => {
    setRanges([...ranges, { level: "", min: "", max: "" }]);
  };

  const handleRemoveLabValueRow = (index) => {
    const updatedLabValues = [...labValues];
    updatedLabValues.splice(index, 1);
    setLabValues(updatedLabValues);
  };
  
  const handleRemoveRangeRow = (index) => {
    const updatedRanges = [...ranges];
    updatedRanges.splice(index, 1);
    setRanges(updatedRanges);
  };

  const handleDateTakenChange = (event) => {
    setDateTaken(event.target.value); // Update the dateTaken state
  };

   const handleLabValueNameChange = (value, index) => {
    const updatedlabValues = [...labValues];
    updatedlabValues[index].labValueName = value;
    setLabValues(updatedlabValues);
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
 

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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

  console.log(uploadedImageSrc)
  return (
    <>
      {currentPage === 2 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">
            RECORD LAB TEST
          </div>

                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
                  <table className="self-start w-full max-w-[925px] text-xs mt-12 mb-56 max-md:max-w-full max-md:my-10">
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
                            <div className="my-auto">Date Taken</div>
                          </div>
                          <td>
                            <input
                              className="justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
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
                            value={ observations?.resource?.codeText ?? ""}
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
                            <div className="my-auto">Valid Until</div>
                          </div>
                          <td>
                          <input
                              className="justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
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
                            className={`flex flex-col items-center px-20 py-8 text-xs leading-5 text-center bg-white border-black border-solid border-[0.5px] max-w-[600px]'
                            }`}
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
                                  Drag or drop here.
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
                    <table className="max-w-fit border-separate">
                      <tr>
                        <td>
                          <div className="flex gap-4 my-auto font-semibold text-black">
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
                        <td className="pl-80">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <div className="my-auto text-xs">Unit</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table className="max-w-fit border-spacing-y-2 border-separate">
                      <tbody className="text-xs leading-5 text-black">
                        <tr></tr>
                     
                        {labValues?.map((row, index) => (
                          <tr key={index}>
                            <td className="border-l-[16px] border-transparent">
                              <input
                                className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                type="text"
                                placeholder="Enter lab value name"
                                value={row.labValueName}
                                onChange={(e) =>
                                  handleLabValueNameChange(
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                            </td>
                            <td className="border-l-[8px] border-transparent flex items-center">
                              <span className="mt-2 flex items-center text-black font-medium">
                                =
                              </span>
                            </td>
                            <td className="border-l-[8px] border-transparent">
                              <input
                                className="justify-center py-2 pr-4 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                type="text"
                                placeholder="Enter value"
                                value={row.value}
                                onChange={(e) =>
                                  handleValueChange(e.target.value, index)
                                }
                              />
                            </td>
                            <td className="border-l-[20px] border-transparent">
                              <input
                                className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                type="text"
                                placeholder="Unit"
                                value={row.unit}
                                onChange={(e) =>
                                  handleUnitChange(e.target.value, index)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                       
                        <tr>
                          <td colSpan="4" className="text-center">
                            <button
                              className="mt-3 flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]"
                              onClick={handleAddLabValueRow}
                            >
                              <div className="justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[26px] w-[26px]">
                                +
                              </div>
                              <div className=" my-auto text-xs text-gray-400">
                                Add another lab value row
                              </div>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="max-w-fit border-separate mt-8">
                      <tr>
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
                      </tr>
                    </table>
                    <table className="max-w-fit border-spacing-y-2 border-separate">
                      <tbody className="text-xs leading-5 text-black">
                        <tr></tr>
                      
                        {ranges?.map((row, index) => (
                          <tr key={index}>
                            <td className="border-l-[16px] border-transparent">
                            <input
                                className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                                type="text"
                                placeholder="Normal"
                                value={row.level}
                                onChange={(e) => handleLevelChange(e.target.value, index)}
                              />
                            </td>
                            <td className="border-l-[8px] border-transparent flex items-center">
                              <span className="mt-2 flex items-center text-black font-lg font-bold">
                                :
                              </span>
                            </td>
                            <td className="border-l-[8px] border-transparent">
                            <input
                                className="justify-center py-2 px-2  font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                                type="text"
                                placeholder="Min"
                                value={row.min}
                                onChange={(e) => handleMinChange(e.target.value, index)}
                              />
                            </td>
                            <td className="border-l-[20px] border-transparent">
                              -
                            </td>
                            <td className="border-l-[20px] border-transparent">
                            <input
                                className="justify-center py-2 px-2  font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black w-16"
                                type="text"
                                placeholder="Max"
                                value={row.max}
                                onChange={(e) => handleMaxChange(e.target.value, index)}
                              />
                            </td>
                          </tr>
                        ))}
                 
                        <tr>
                          <td colSpan="4" className="text-center">
                            <button
                              className="mt-3 flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]"
                              onClick={handleAddRangeRow} // Assuming you have a function handleAddRow for adding rows
                            >
                              <div className=" justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[26px] w-[26px]">
                                +
                              </div>
                              <div className=" my-auto text-xs text-gray-400">
                                Add another range row
                              </div>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            
           
       
          <div className="flex justify-between items-center">
            <BackButton
              currentScreen={currentPage}
              setCurrentScreen={setCurrentPage}
            />

            <Button
              className="flex items-center ml-12 px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
              onClick={handleSave}
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