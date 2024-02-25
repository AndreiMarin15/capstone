import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LabTest from "../labtest_components/labTest";
import VisitLabtests from "./visitLabTests";
import AddLabTest from "./addLabTest";

export default function LabTestList() {
  const router = useRouter();
  const [testName, setTestName] = useState("");
  const [isTest, setTest] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const lTest = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "A1C Test (Glycated Hemoglobin)",
      date: "2023-07-21",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "Fasting Blood Sugar (FBS) Test",
      date: "2023-07-21",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "Postprandial Blood Sugar (PPBS) Test",
      date: "2023-07-21",
    },
  ];
  return (
    <>
      {isTest ? (
        <VisitLabtests />
      ) : isAdd ? (
        <AddLabTest />
      ) : (
        <>
          <span className="flex max-w-full justify-between gap-5 items-start max-md:flex-wrap">
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            VISITS - LAB TESTS
          </div>
            <div className="flex aspect-[3.3333333333333335] flex-col justify-center items-stretch mt-1.5">
              <span className="flex gap-1.5 justify-between px-10 py-1 rounded border border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5">
                <button
                  onClick={() => {
                    setTest(false);
                    setAdd(true);
                  }}
                  className="text-xs font-semibold leading-5"
                >
                  Add
                </button>
              </span>
            </div>
          </span>
          {lTest.map((item) => (
            <button
              onClick={() => {
                setTest(true);
                setAdd(false);
              }}
              className="flex flex-col mt-8"
              key={item.variable}
            >
              <span className="flex items-stretch justify-between gap-4">
                <Image
                  height={0}
                  width={0}
                  loading="lazy"
                  src={item.src}
                  className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
                  alt="picture"
                />
                <div className="text-black text-xs font-semibold leading-5 grow whitespace-nowrap self-start">
                  {item.variable}
                </div>
              </span>
              <span className="flex items-center gap-3 ml-8 mt-1 self-start w-full">
                <div className="text-black text-xs font-medium leading-5">
                  Date: <br />
                </div>
                <div className="text-black text-xs font-medium leading-5">
                  {item.date} <br />
                </div>
              </span>
            </button>
          ))}
        </>
      )}
    </>
  );
}
