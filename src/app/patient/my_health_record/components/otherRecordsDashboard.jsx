"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "../../my_health_record/components/sub_components/BackButton";
import { Button } from "@/components/ui/button";
import { getPatientRawData } from "@/backend//patient/personal_details/master_data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import AddRecord from "./sub_components/addRecord";
import ViewRecords from "./sub_components/viewRecord"; 
import { getRecord } from "@/backend/health_records/getRecord";


export default function OtherRecords() {
  const [date, setDate] = useState();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [records, setRecords] = useState([]); 
  const [recordId, setRecordId] = useState(""); 
  const [patientData, setPatientData] = useState(null)
  const handleRecordClick = (record) => {
    setCurrentScreen(2);
    setRecordId(record)
    console.log(record)
    console.log("current Screen:", currentScreen);
  };

  useEffect(() => {
    async function fetchData() {
        try {
            const data = await getPatientRawData(); // Fetch patient data
            setPatientData(data.id);
            console.log(data.id)
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    fetchData();
}, []);


  const fetchRecords = async () => {
    try {
      const otherRecords = await getRecord();
      console.log(otherRecords);
      setRecords(otherRecords.reverse());
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      {currentScreen === 0 && (
        <>
          <div className="flex gap-3 text-black text-base justify-between items-center leading-5 mt-8 max-md:ml-1 max-md:mt-10 mb-10">
            <span className="inline-block  font-bold  align-middle">
              UPLOADED RECORDS
            </span>
            <div className="flex gap-2 justify-end">
              <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] max-w-[50%]  border-solid border-black">
                <Image
                  alt="picture"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
                  className="aspect-square ml-2 object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
                />
                <div
                  className="text-stone-300 text-xs leading-5 my-auto"
                  style={{ paddingRight: "300px" }}
                >
                  SEARCH
                </div>
              </span>
              <span className="flex items-center gap-1 px-1 py-1  rounded-md border-[0.5px] border-solid border-black font-normal mr-2">
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild></DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By Date</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="Recent">
                      Sort by Most Recent
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Oldest">
                      Sort By Oldest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button className="self-end max-w-[20%]" variant="outline" onClick={() => setCurrentScreen(1)}>
              Add Record
          </Button>


          {records.map((record, index) => (
            <button
              key={index}
              onClick={() => 
                handleRecordClick(record.id)}
              className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[100%]"
            >
              <div className="flex gap-3.5 justify-between font-semibold whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{record.resource.title}</div>
              </div>
            </button>
          ))}
        </>
      )}

      {currentScreen === 1 && (
        <AddRecord
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientData}
          fetchRecords={fetchRecords}
        />
      )}

      {currentScreen === 2 && (
        <ViewRecords
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          recordId={recordId}
        />
      )}
    </>
  );
}
