import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import ViewCarePlan from "./sub_components/viewCarePlan";
import AddCarePlan from "./sub_components/addCarePlan";
import ViewChatResult from "./sub_components/viewChatResult";
import { careplanInfo } from "@/backend/patient/careplan/careplan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function CarePlan({ patientId, patientData }) {
  const [careplanInfor, setCareplanInfor] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [carePlan, setCarePlan] = useState({});
  const [showActivePlans, setShowActivePlans] = useState(true); // Visibility state

  const fetchData = async () => {
    const careplanInformation = await careplanInfo.getCareplanInformation(patientId);
    console.log(careplanInformation);
    setCareplanInfor(careplanInformation);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isTest, setTest] = useState(false);  
  const [isAdd, setAdd] = useState(false);
  const [isResult, setResult] = useState(false);

  const handleSetCurrentScreen = () => {
    setTest(false);
    setAdd(false);
    setResult(false);
  };

  const isDateNotLaterThanToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date >= today;
  };

  const toggleActivePlansVisibility = () => {
    setShowActivePlans(!showActivePlans);
  };

  return (
    <>
      {isTest ? (
        <ViewCarePlan
          carePlan={carePlan?.activity}
          setCurrentScreen={handleSetCurrentScreen}
        />
      ) : isAdd ? (
        <AddCarePlan
          setCurrentScreen={handleSetCurrentScreen}
          patientData={patientData}
          patientId={patientId}
          fetchData={fetchData} // Pass fetchData here
        />
      ) : isResult ? (
        <ViewChatResult
          setCurrentScreen={handleSetCurrentScreen}
          patientData={patientData}
          patientId={patientId}
          isAdd={isAdd}
          setAdd={setAdd}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mt-8 mb-5">
            <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
              CARE PLANS
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAdd(true);
                }}
              >
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setResult(true);
                }}
              >
                View Collab Result
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="w-[400px] mb-10">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="endocrinologist">Endocrinologist</TabsTrigger>
              <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
              <TabsTrigger value="gastroenterologist">
                Gastroenterologist
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">{/* Add contents here */}</TabsContent>
            <TabsContent value="endocrinologist">
              {/* Add contents here */}
            </TabsContent>
            <TabsContent value="cardiologist">
              {/* Add contents here */}
            </TabsContent>
            <TabsContent value="gastroenterologist">
              {/* Add contents here */}
            </TabsContent>
          </Tabs>
          <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
            <div className="flex gap-1.5 mb-10">
              <div className="mt-3 grow font-semibold text-black">Status: </div>
              <button
                className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={toggleActivePlansVisibility}
              >
                <div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                  {showActivePlans ? "ACTIVE" : "INACTIVE"}
                </div>
              </button>
            </div>
          </div>
          {careplanInfor &&
            careplanInfor
              .filter((careplan) =>
                showActivePlans
                  ? isDateNotLaterThanToday(careplan.resource?.period.end)
                  : !isDateNotLaterThanToday(careplan.resource?.period.end)
              )
              .map((careplan, index) => (
                <button
                  key={index}
                  className="flex flex-col mt-5 mb-5 items-start text-xs leading-5 text-black max-w-[800px]"
                  onClick={() => {
                    setCarePlan(careplan.resource);
                    setTest(true);
                  }}
                >
                  <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      className="aspect-square fill-black w-[15px]"
                    />
                    <div className="my-auto">
                      {careplan["resource"]?.["title"]}
                    </div>
                  </div>

                  <div className="flex gap-5 self-stretch ml-7 w-full max-md:flex-wrap max-md:max-w-full">
                    <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                      <Image
                        alt="image"
                        height={0}
                        width={0}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                        className="w-4 aspect-square"
                      />
                     <div className="grow my-auto">
                      {careplan["resource"]?.contributor.length === 1
                        ? `${careplan["resource"]?.contributor[0].display}${
                            careplan["resource"]?.careTeam?.[0]?.display?.trim() ? ` & ${careplan["resource"]?.careTeam[0].display}` : ""
                          }`
                        : careplan["resource"]?.contributor.length === 2
                        ? `${careplan["resource"]?.contributor[0].display} & ${careplan["resource"]?.contributor[1].display}${
                            careplan["resource"]?.careTeam?.[0]?.display?.trim() ? ` & ${careplan["resource"]?.careTeam[0].display}` : ""
                          }`
                        : `${careplan["resource"]?.contributor[0].display} & ${careplan["resource"]?.contributor.length - 1} other/s${
                            careplan["resource"]?.careTeam?.[0]?.display?.trim() ? ` & ${careplan["resource"]?.careTeam[0].display}` : ""
                          }`}
                    </div>
                    </div>
                    <div>
                      <div className="flex-auto my-auto">{`${careplan.resource?.period.start} - ${careplan.resource?.period.end}`}</div>
                    </div>
                  </div>
                </button>
              ))}
          <div className="mt-12">
            <BackButton />
          </div>
        </>
      )}
    </>
  );
}
