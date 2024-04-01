import React from "react";
import Image from "next/image";
import BackButton from "../../personal_details/components/sub_components/BackButton";
import { useState, useRef } from "react";


export default function UploadLab({currentPage, setCurrentPage}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [rows, setRows] = useState([{ labValueName: "", value: "", unit: "" }]); // Define the rows state variable

  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
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

  const handleAddRow = () => {
    setRows([...rows, { labValueName: "", value: "", unit: "" }]);
  };


  const handleUnitChange = (unit, index) => {
    const updatedRows = [...rows];
    updatedRows[index].unit = unit;
    setRows(updatedRows);
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
      setUploadedFile(base64Image); // Set the uploaded file state
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  const getImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  return (
    <span className="bg-white flex flex-col px-20 py-12 h-auto max-md:px-5" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}>
      <div className="text-black text-xl font-semibold leading-8 mt-12 self-start max-md:max-w-full max-md:mt-10">
        2D ECHO
      </div>
      <span className="flex items-stretch gap-1 self-start max-md:ml-2.5">
        <Image alt="picture" height={0} width={0} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffed27d8f8f3d85f5105fad0503fc6ac77abb4c40a584f2c8be2dd0494e2e313?" className="aspect-[1.06] object-contain object-center w-[19px] overflow-hidden shrink-0 max-w-full" />
        <div className="text-black text-sm font-semibold leading-5 self-center grow whitespace-nowrap my-auto">
          REQUESTED ON: <span className="">2023-01-07</span>
        </div>
      </span>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="self-start w-full max-w-[925px] mt-12 mb-56 max-md:max-w-full max-md:my-10">
          <table className="max-w-fite">
            {/* Directly include the labtest data */}
            <tr>
              <td className="flex items-center"> {/* Use items-center to align items vertically */}
                <div className="mr-4"> {/* Add margin-right to create a gap */}
                  <Image alt="picture" height={0} width={0} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?" className="w-fit" />
                </div>
                <div className="text-black text-xs mr-10 font-semibold leading-5 self-start my-auto">Date Taken</div>
                <input
                  type="date"
                  className="text-black text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                  placeholder="YYYY-MM-DD"
                />
              </td>
            </tr>
            <tbody>
            <tr>
              <td className="w-full">
                <div className="flex items-center"> {/* Flex container */}
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto  ml-10">Upload Image</div> {/* Text */}
                  <span
                    className="bg-white flex w-[275px] max-w-full flex-col items-center mt-6 px-20 py-10 border-[0.5px] ml-6 border-solid border-black self-start max-md:px-5"
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={(e) => handleDragOver(e)}
                  >
                    {uploadedFile ? (
                      <>
                        <img
                          src={URL.createObjectURL(uploadedFile)}
                          alt="uploaded"
                          className="w-full max-w-full h-auto"
                        />
                        <button
                          className="text-sky-600 text-xs font-light leading-5 underline whitespace-nowrap mt-3.5"
                          onClick={() => handleCancelUpload()}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Image
                          alt="picture"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/79b0db0334145eb24b0da5efd53f459ffdf3d0197e5eebe803fde6e67e9ed598?"
                          className="aspect-[1.05] object-contain object-center w-[39px] overflow-hidden max-w-full"
                        />
                        <div className="text-black text-center text-xs leading-5 mt-1.5">
                          Drag or drop here.
                        </div>
                        <button
                          className="text-sky-600 text-center text-xs font-light leading-5 underline whitespace-nowrap mt-3.5"
                          onClick={handleUploadClick}
                        >
                          Upload
                        </button>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          ref={fileInputRef}
                        />
                      </>
                    )}
                  </span>
                </div>
              </td>
            </tr>
            </tbody>
            <tr>
              <td className="h-6"></td>
            </tr>
            {rows.map((row, index) => (
              <tbody key={index} className="ml-4">
                <tr className="flex">
                  <td className="border-l-[8px] border-transparent flex items-center">
                    <span className="text-black text-xs font-semibold leading-5 self-center my-auto ml-12 mr-4">
                      Lab Value {index + 1}
                    </span>
                  </td>
                  <td className="border-transparent text-xs">
                    <input
                      className="py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                      type="text"
                      placeholder="Enter lab value name"
                      value={row.labValueName}
                      onChange={(e) => handleLabValueNameChange(e.target.value, index)}
                    />
                  </td>
                  <td className="border-l-[8px] border-transparent flex items-center">
                    <span className="flex items-center text-black font-medium">=</span>
                  </td>
                  <td className="border-l-[8px] border-transparent text-xs">
                    <input
                      className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                      type="text"
                      placeholder="Enter value"
                      value={row.value}
                      onChange={(e) => handleValueChange(e.target.value, index)}
                    />
                  </td>
                  <td className="border-l-[20px] border-transparent text-xs">
                    <input
                      className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-black"
                      type="text"
                      placeholder="Unit"
                      value={row.unit}
                      onChange={(e) => handleUnitChange(e.target.value, index)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  <button
                    className="flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%] mt-4 ml-12"
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
          <div className="flex justify-between items-stretch w-full ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col mt-8 max-md:max-w-full max-md:mt-7">
              <BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className="flex flex-col max-md:max-w-full max-md:mt-7">
              <button className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-12 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
            }
