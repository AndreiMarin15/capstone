"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "next/link"; // Import Link component
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reports() {
  const router = useRouter(); // Initialize useRouter
  const [selectedOptions, setSelectedOptions] = React.useState("");

  const options = [
    "Late for Follow-up Patients",
    "Critical Condition Patients",
  ];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };

  const handleGenerateClick = () => {
    if (selectedOptions === 0) {
      router.push("reports/followup_list");
    } else if (selectedOptions === 1) {
      router.push("reports/critical_patients");
    } else {
      router.push("reports/selfprick_list");
    }
  };

  return (
    <div
      className="bg-white h-screen flex"
      style={{ overflowY: "scroll", maxHeight: "100vh" }}
    >
      <div className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full h-[100vh]">
        <div className="text-xl font-semibold text-black max-md:max-w-full">
          Reports
        </div>
        <div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
          GENERATE:
        </div>
        <div className="flex gap-16 items-start mt-4 w-full text-sm max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 px-0.5 mt-1 text-black">
            <div className="flex flex-col">
              <Select
                onValueChange={(value) => {
                  setSelectedOptions(value);
                }}
              >
                <SelectTrigger className="max-w-[40dvw] min-w-[15dvw]">
                  <SelectValue placeholder="Select Report" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option, index) => (
                    <SelectItem key={index} value={index}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="text-left mt-10">
          <Button onClick={handleGenerateClick}> Generate </Button>
        </div>
      </div>
    </div>
  );
}
