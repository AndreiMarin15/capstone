import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackButton from "../../../../my_health_record/components/sub_components/BackButton";
import { getObservationById } from "@/backend/health_records/getObservation";


export default function ViewPrick ({ currentScreen, setCurrentScreen, observationId }) {
    
    const [value, setValue] = useState("");

    const [unit, setUnit] = useState("");
    const [dateTaken, setDateTaken] = useState("");
    const [time, setTime] = useState("");
    const [when, setWhen] = useState("Before Eating");
    const [machine, setMachine] = useState("");
    const [ranges, setRanges] = useState([
      { level: "Low", min: "", max: "" },
      { level: "Normal", min: "", max: "" },
      { level: "High", min: "", max: "" }
  ]);

  useEffect(() => {
    if (observationId) {
        const fetchObservationData = async () => {
            try {
                const observation = await getObservationById(observationId);
                console.log(observation)
                setDateTaken(observation.resource.uploadedDateTime);
                setTime(observation.resource.time);
                setWhen(observation.resource.when);
                setMachine(observation.resource.machine);
                setValue(observation.resource.valueQuantity.value);
                setUnit(observation.resource.valueQuantity.unit);
                
                // Update ranges
                setRanges(observation.resource.rangeQuantity.rangeQuantities.map(range => ({
                    level: range.level,
                    min: range.min,
                    max: range.max
                })));
            } catch (error) {
                console.error("Error fetching observation:", error);
            }
        };
        fetchObservationData();
    }
}, [observationId]);



  const labtest = [
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
        variable: "Date Taken",
        value: dateTaken,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
        variable: "Time",
        value: time,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
        variable: "When",
        value: when,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/629161d56926e554813699b5b55238dbaa9e1f8d86dd945077ab737732efda15?",
        variable: "Machine Used",
        value: machine,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa7bbcb39aa8476a8ef65b6cebfbb0385029750dafba0401c696d3d62d2caed6?",
        variable: "Value",
        value: value,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c89dc9b514825602c60719ec8014192881b974324619a7a625dcbbe9b49e9f56?",
        variable: "Unit",
        value: unit,
    },
    {
        imgsrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/04feedd180d99a276d32b47268955875856411c5fd622922cd3c35776c289845?",
        variable: "Ranges",
        value: (
            <div className="flex flex-col mt-3">
                {ranges.map((range, index) => (
                    <div className="flex gap-2 mt-3" key={index}>
                        <input
                            type="text"
                            className="text-xs leading-5 text-black px-1 py-1 rounded  w-16"
                            placeholder={range.level}
                            value={range.level}
                            readOnly
                        />
                        <input
                            type="text"
                            className="text-xs text-center leading-5 text-black px-1 py-1 rounded w-12"
                            placeholder="Min"
                            value={range.min}
                            readOnly
                        />
                        <span className="self-center">-</span>
                        <input
                            type="text"
                            className="text-xs text-center leading-5 text-black px-1 py-1 rounded w-12"
                            placeholder="Max"
                            value={range.max}
                            readOnly
                        />
                    </div>
                ))}
            </div>
        ),
    },
];
    
    
  

  return (
    <span className="bg-white flex flex-col px-20 h-auto max-md:px-5">
      <div className="text-black text-xl font-semibold leading-8 mt-12 self-start max-md:max-w-full max-md:mt-10">
        Self-Pricking
      </div>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="self-start w-full max-w-[925px] mt-12 mb-56 max-md:max-w-full max-md:my-10">
          <table className="max-w-fit  border-separate ">
        
            {labtest?.map((item) => (
              <tr key={item.variable}>
                <td className="w-5">
                  {item.imgsrc && (
                    <Image
                      alt="picture"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={item.imgsrc}
                      className="w-5 mt-5"
                    />
                  )}
                </td>
                <td className="border-l-[16px] border-transparent">
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto mt-5">
                    {item.variable}
                  </div>
                </td>
                <td className="border-l-[5rem] border-transparent">
                  <div className="text-black text-xs leading-5 ml-auto mt-5">
                    {item.value}
                  </div>
                </td>
              </tr>
            ))}
          
          </table>
          <div className="flex flex-col items-stretch w-full ml-5 max-md:w-full max-md:ml-0">
            <div className="flex justify-between ">
              <BackButton
                currentScreen={1}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};



