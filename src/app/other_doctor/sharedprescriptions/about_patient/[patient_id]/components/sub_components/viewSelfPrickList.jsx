import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { getSelfPrickObservations } from "@/backend/health_records/getObservation";
import useLabTestStore from "@/app/labTestStore";

export default function PrickList({
  currentScreen,
  setCurrentScreen,
  patientId,
  observationId,
}) {
  const [selfPrickObservations, setSelfPrickObservations] = useState([]);
  const setObservationId = useLabTestStore((state) => state.setObservationId);

  const fetchSelfPrickObservations = async () => {
    try {
      const observations = await getSelfPrickObservations(patientId);
      observations.sort(
        (a, b) =>
          new Date(b.resource.uploadedDateTime) -
          new Date(a.resource.uploadedDateTime)
      );
      setSelfPrickObservations(observations);
      console.log(observations);
    } catch (error) {
      console.error("Error fetching self-prick observations:", error);
    }
  };

  useEffect(() => {
    fetchSelfPrickObservations();
  }, []);

  const refetchSelfPrickObservations = () => {
    fetchSelfPrickObservations();
  };

  const handleButtonClick = (observationId) => {
    setObservationId(observationId);
    console.log(observationId); // Save the observationId
    setCurrentScreen(5);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="font-semibold items-center self-center text-s ml-5">
          Self Pricking
        </div>
      </div>
      {selfPrickObservations.map((observation, index) => (
        <button
          key={index}
          className="flex flex-col mt-5 items-start text-sm leading-5 text-black max-w-[650px]"
          onClick={() => handleButtonClick(observation.id)}
        >
          <div className="ml-5 flex gap-2 items-center">
            <Image
              alt="image"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
              className="aspect-square fill-black w-[10px]"
            />
            <div className="text-sm font-semibold">
              Self-Pricking {observation.resource.uploadedDateTime}
            </div>
          </div>
          <div className="flex gap-5 justify-between ml-7  max-md:ml-2.5 w-[100%]">
            <div
              className="flex-auto my-auto ml-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="font-semibold">Time:</span>{" "}
                {observation.resource.time}
              </div>
            </div>

            <div className="text-black text-sm font-normal leading-5 flex items-center">
              {observation.resource.when}
            </div>
          </div>
        </button>
      ))}
      <BackButton currentScreen={1} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}
