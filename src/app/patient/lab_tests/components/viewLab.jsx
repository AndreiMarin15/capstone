import React, { useState, useEffect } from "react";
import Image from "next/image";
import AddLabTest from "./addLab";
import BackButton from "../../my_health_record/components/sub_components/BackButton";
import { getObservationsWithLabTest } from "@/backend/health_records/getObservation";

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
export default function VisitLabtests({
  currentPage,
  setCurrentPage,
  currentScreen,
  setCurrentScreen,
  observationId,
}) {
  const [observations, setObservations] = useState([]);
  const [currentScreen3, setCurrentScreen3] = useState(0);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const observationsData = await getObservationsWithLabTest();
        setObservations(observationsData);
        console.log("Observations with lab test ID:", observationsData);

        const selected = observationsData.find(
          (observation) => observation.id === observationId
        );
        setSelectedObservation(selected);

        console.log(selected);
      } catch (error) {
        console.error("Error fetching observations with lab test ID:", error);
      }
    };

    fetchObservations();
  }, [observationId]);

  const handleOpenImageModal = (imageSrc) => {
    console.log("Selected Image Src:", imageSrc);
    setSelectedImageSrc(imageSrc);
    setIsImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  const labTestData = selectedObservation
    ? [
        {
          srclabtest:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
          labTestName: selectedObservation.resource.codeText,
          startdate: selectedObservation.resource.uploadedDateTime,
          untildate: selectedObservation.resource.effectiveDateTime,
          imageSrc: selectedObservation.resource.imageSrc,
          valueQuantities:
            selectedObservation.resource.valueQuantity?.valueQuantities || [],
          rangeQuantities:
          selectedObservation.resource.rangeQuantity?.rangeQuantities || [],
        },
      ]
    : [];

    console.log(labTestData)
  return (
    <>
      {
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            VISITS - TESTS
          </div>

       {labTestData?.map((labTestData, index) => (
            <div
              key={index}
              className="self-start w-full max-w-[925px] mt-12 mb-56 max-md:max-w-full max-md:my-10"
            >
               <div className="flex gap-3.5 px-5 font-semibold whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src={  "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{labTestData.labTestName}</div>
              </div>
              <div className="mt-5 ml-12 max-md:ml-2.5">
                <div className="flex-auto my-auto">
                  <span className="font-semibold">Laboratory Test Date: </span>
                  {`${labTestData.startdate}`}
                </div>
                <div className="flex-auto my-auto">
                

                  <span className="font-semibold">Valid Until: </span>
                  {`${labTestData.untildate}`}
                </div>
              </div>


                <div className="flex flex-col ml-5 w-[100%] mt-10 text-xs max-md:ml-0 max-md:w-full">
                <div className="flex gap-10">
                  <img
                    src={` ${labTestData.imageSrc}`} // Update the src attribute
                    alt="uploaded"
                    style={{ maxWidth: "600px", maxHeight: "600px" }} // Adjust max-width and max-height as needed
                    onClick={() =>
                      handleOpenImageModal(
                        ` ${labTestData.imageSrc}`
                      )
                    }
                  />
                 <div className="flex gap-16">
                    <div className=" self-start text-sm text-black">
                      <span className=" font-semibold">Lab Values:</span>
                      <div className="mt-5 text-sm">
                        {labTestData.valueQuantities?.map(
                          (valueQuantity, index) => (
                            <div key={index} style={{ whiteSpace: "nowrap" }}>
                              {valueQuantity.display} = {valueQuantity.value}{" "}
                              {valueQuantity.unit}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className=" self-start text-sm text-black">
                      <span className=" font-semibold">Value Range:</span>
                      {/* HARDCODED */}
                      <div className="mt-5 text-sm">
                        {labTestData.rangeQuantities?.map(
                          (rangeQuantity, index) => (
                            <div key={index} style={{ whiteSpace: "nowrap" }}>
                              {rangeQuantity.level} = {rangeQuantity.min} - {" "}
                              {rangeQuantity.max}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <BackButton
            currentPage={currentPage}
            currentScreen={5}
            setCurrentPage={setCurrentPage}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      }

      {isImageModalOpen && (
        <ImageModal src={selectedImageSrc} onClose={handleCloseImageModal} />
      )}
    </>
  );
}
