import Image from "next/image";
import * as React from "react";
import { useState, useRef } from "react";
import BackButton from "./BackButton";
import { uploadObservation } from "../../../../../../../lib/backend/health_records/uploadObservation";
import { healthRecords } from "../../../../../../../lib/backend/health_records/health_records";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


export default function AddLabTest({currentScreen, setCurrentScreen, patientId, handleSave}) {
  console.log("Patient ID:", patientId);
  const [labTestResults, setLabTestResults] = useState([]);
  const [dateOfResult, setDateOfResult] = useState("");
  const [dateOfRequest, setdateOfRequest] = useState("");
  const [labValueName, setLabValueName] = useState("");
  const [labTestName, setLabTestName] = useState("");
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    custom: { value: "", unit: "" }
  });
  const [rows, setRows] = useState([{ labValueName: "", value: "", unit: "" }]);
  
  

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
    setRows([...rows, { labValueName: "", value: "", unit: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleLabValueNameChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].labValueName = value;
    setRows(updatedRows);
  };

  const handleValueChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].value = value;
    setRows(updatedRows);
  };


  const handleUnitChange = (unit, index) => {
    const updatedRows = [...rows];
    updatedRows[index].unit = unit;
    setRows(updatedRows);
  };

  const handleAddLabTest = async () => {



    let base64Image = null;
    if (uploadedImageSrc) {
      base64Image = uploadedImageSrc.split(",")[1]; 
    }

    const valueQuantities = rows.map(row => ({
      display: row.labValueName,
      unit: row.unit,
      value: row.value,
  }));
  


  const labTestData = {
    loincCode: "YOUR_LOINC_CODE",
    status: "final",
    valueQuantities: rows.map(row => ({
        display: row.labValueName,
        unit: row.unit,
        value: row.value,
    })),
    subject: {
      type: "Patient",
      reference: patientId
    },
    dateOfRequest: dateOfRequest,
    dateOfResult: dateOfResult,
    labTestName: labTestName,
    base64Image: base64Image,
};
console.log(labTestData)
handleSave(labTestData, false);


  

  toast.success("Lab Test Recorded", {
    position: "top-left",
    theme: "colored",
    autoClose: 2000,
  });

  setCurrentScreen(0);

    
    
};

  return (
    <>
      {currentScreen === 2 || currentScreen === 4 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
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
                          <div className="flex gap-1 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">Date of Result</div>
                          </div>
                          <td>
                          <input
                                className="justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
                                type="date"
                                onChange={(e) => {
                                  console.log("date of result:", e.target.value);
                                  setDateOfResult(e.target.value);
                                }}
                            />
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td className="flex gap-12 pr-14 mt-6 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/05dd7068174eb76cbab2ba8d9608b143eabae9c2e3d1be451a944916466c9ae8?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">Name of Lab Test</div>
                          </div>
                          <td>
                          <input
                              className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
                              onChange={(e) => {
                                console.log("Lab Test Name Changed:", e.target.value);
                                setLabTestName(e.target.value);
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
                                      style={{ maxWidth: "100%" , maxHeight: "80%" }}
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
                                <div className="self-stretch mt-1.5 text-black">Drag or drop here.</div>
                                <div className="mt-3.5 font-light text-sky-600 underline" onClick={handleUploadClick}>Upload</div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e.target.files)}
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
                      </tr>
                    </table>
                    <table className="max-w-fit border-spacing-y-7 border-separate">
                      <tbody className="text-xs leading-5 text-black">
                      <tr>
      </tr>
        {/* Your existing row */}
        {rows.map((row, index) => (
  <tr key={index}>
    <td className="border-l-[16px] border-transparent">
      <input
        className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
        type="text"
        placeholder="Enter lab value name"
        value={row.labValueName}
        onChange={(e) => handleLabValueNameChange(e.target.value, index)}
      />
    </td>
    <td className="border-l-[8px] border-transparent flex items-center">
      <span className="mt-2 flex items-center text-black font-medium">=</span>
    </td>
    <td className="border-l-[8px] border-transparent">
      <input
        className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
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
))}
        {/* Add another row button */}
        <tr>
          <td colSpan="4" className="text-center">
          <button
              className="flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]"
              onClick={handleAddRow} // Assuming you have a function handleAddRow for adding rows
            >
              <div className="justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[20] w-[24]">
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
            <BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
              
              <button
                className="flex items-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
                onClick={handleAddLabTest}
              >
                  Save
              </button>
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
