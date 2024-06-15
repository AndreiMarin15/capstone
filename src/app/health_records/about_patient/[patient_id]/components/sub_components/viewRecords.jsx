"use client";
import Image from "next/image";
import BackButton from "./BackButton";
import { getRecordById } from "@/backend/health_records/getRecord";
import { useState,useRef, useEffect } from "react";

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

export default function ViewRecord({ currentScreen, setCurrentScreen, recordId }) {
 
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  useEffect(() => {
    const fetchRecordsById = async () => {
        console.log(recordId)
      try {
        const fetchedRecord = await getRecordById(recordId);
        setRecord(fetchedRecord);
        console.log(fetchedRecord)
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };

    fetchRecordsById();
  }, [recordId]);


  const handleOpenImageModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsImageModalOpen(true);
  };

    const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc(null);
  };



  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
       OTHER RECORDS
      </div>

      <div>
        <div className="flex flex-col max-w-full">
          <table className="max-w-fit border-spacing-y-5 border-separate">
          <tbody className="text-xs leading-5 text-black">
              {record.map((key, index) => (
                <tr key={index} className="align-top">
                  <td className="w-5">
                    <Image
                      alt="icon"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                      {key.resource.title}
                    </div>
                    <div className="text-black text-xs leading-5 self-center my-auto">
                      {key.resource.description}
                    </div>
                    
                  
                  {key.resource.upload && (
                  
                      <div className="flex gap-10 mt-6">
                        <img
                          src={key.resource.upload}
                          alt="uploaded"
                          style={{ maxWidth: "600px", maxHeight: "600px", cursor: "pointer" }}
                          onClick={() =>
                            handleOpenImageModal(`${key.resource.upload}`)}
                        />
                        </div>  
                  )}
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <BackButton
              currentScreen={1}
              setCurrentScreen={setCurrentScreen}
            />
            
            {isImageModalOpen && (
            <ImageModal src={modalImageSrc} onClose={handleCloseImageModal} />
          )}
          </div>
        </div>
      </div>
    </>
  );
}