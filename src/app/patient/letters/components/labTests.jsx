"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ViewLab from "./sub_components/viewLab";
import PrickList from "./sub_components/prickList";
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

export default function LabTests() {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState(0);

  const handleButtonClick = () => {
    // Set currentScreen to the desired value when a medication item is clicked
    setCurrentScreen(1); // Assuming the desired value for the second screen is 1
    console.log("current Screen:", currentScreen);
  };

  return (
    <>
      {currentScreen === 0 ? (
        <TabsContent value="labtestrequest">
          <div className="flex justify-between items-center mt-4">
            <div className="font-semibold items-center self-center text-s ml-5">
              Lab Test Requests
            </div>
            <div className="flex gap-2">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
                      SORT
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort By Doctor Name</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup>
                      <DropdownMenuRadioItem value="asc">
                        A-Z
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">
                        Z-A
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentScreen(2);
                  }}
                >
                  Self-Pricking
                </Button>
              </div>
            </div>
          </div>
          <button
            className="flex flex-col mt-5 items-start text-xs leading-5 text-black max-w-[650px]"
            onClick={handleButtonClick}
          >
            <div className="ml-5 flex gap-2 items-center">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                }
                className="aspect-square fill-black w-[10px]"
              />
              {/* Name of Medicine */}
              <div className="text-xs font-semibold">
                {/*  {medication.resource.medicationCodeableConcept[0].text} */}
                Lab Test Request #1
              </div>
            </div>
            <div className="flex gap-5 justify-between ml-7  max-md:ml-2.5 w-[100%]">
              <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="grow my-auto">Dr. Harold Chiu</div>
              </div>
              <div
                className="flex-auto my-auto"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span className="font-semibold">Date Requested:</span>{" "}
                  2024/01/24
                </div>
              </div>

              <div className="text-black text-xs font-medium leading-5 flex items-center">
                <svg
                  className="h-3 w-3 ml-1 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="5" />
                </svg>
                Requested
              </div>

              <div className="text-xs text-blue-500 leading-5 flex ml-5 items-center">
                <Button variant="download"> ↓ Download (.pdf)</Button>
              </div>
            </div>
          </button>
        </TabsContent>
      ) : currentScreen === 1 ? (
        <ViewLab
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      ) : currentScreen === 2 ? (
        /* CHANGE TO SELF PRICK JSX HERE */
        <PrickList
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      ) : (
        ""
      )}
    </>
  );
}
