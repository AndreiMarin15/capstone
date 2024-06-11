import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackButton from "../../../../my_health_record/components/sub_components/BackButton";
import doctor from "@/backend//health_records/doctor";
import { uploadObservation } from "@/backend/health_records/uploadObservation";
export default function AddPrick ({ currentScreen, setCurrentScreen, patientId}) {
    
    const [doctorId, setDoctorId] = useState("");
    const [license, setLicense] = useState("");
    const [value, setValue] = useState("");
    const [unit, setUnit] = useState("");
    const [dateTaken, setDateTaken] = useState("");
    const [time, setTime] = useState("");
    const [when, setWhen] = useState("");
    const [machine, setMachine] = useState("");
    const [ranges, setRanges] = useState([{ level: "", min: "", max: "" }]);


    useEffect(() => {
        const fetchDoctor = async () => {
          try {
            const doctorInfo = await doctor.getDoctorByCurrentUser();
            setDoctorId(doctorInfo.fullName);
            setLicense(doctorInfo.license);
          } catch (error) {
            console.error("Error fetching doctor:", error);
          }
        };
    
        fetchDoctor();
      }, []);


    const [observation, setObservation] = useState({
        id: "selfprick",
        status: "created",
        code: {
          coding: [
            {
              code:  "YOUR_LOINC_CODE",// Set your observation code
              system: "http://loinc.org" // Set your observation system
            },
          ],
        },
        subject: {
            type: "Patient",
            reference: patientId
          },
          participant: {
            type: "Doctor",
            actor: doctorId,
            license_id: license,
          
          },
        resource_type: "Observation", // Set your resource type
         rangeQuantity: {
            rangeQuantities: ranges.map((range) => ({
              level: range.level,
              min: range.min,
              max: range.max
            }))
          },
        valueQuantity: {
              value: value,
              unit: unit,
          },
        uploadedDateTime: dateTaken,
        machine: machine,
        time: time, 
        when: when,
      });
    
      const handleSave = async () => {

        
        // Call the uploadObservation function with the observation data
        const result = await uploadObservation(observation);
        // Handle the result if needed
        console.log("Observation saved:", result);
      };
    
 

  const labtest = [
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
      variable: "Date Taken",
      value: (
        <input
          type="date"
          className="text-zinc-400 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="YYYY-MM-DD"
        />
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
      variable: "Time",
      value: (
        <input
          type="time"
          className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="00:00"
        />
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
      variable: "When",
      value: (
        <select className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start">
          <option value="test1">After Eating</option>
          <option value="test2">Before Eating</option>
        </select>
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/629161d56926e554813699b5b55238dbaa9e1f8d86dd945077ab737732efda15?",
      variable: "Machine Used",
      value: (
        <input
          type="text"
          className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="ABC Machine"
        />
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fa7bbcb39aa8476a8ef65b6cebfbb0385029750dafba0401c696d3d62d2caed6?",
      variable: "Value",
      value: (
        <input
          type="text"
          className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="120"
        />
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c89dc9b514825602c60719ec8014192881b974324619a7a625dcbbe9b49e9f56?",
      variable: "Unit",
      value: (
        <input
          type="text"
          className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="g/moL"
        />
      ),
    },
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/04feedd180d99a276d32b47268955875856411c5fd622922cd3c35776c289845?",
      variable: "Ranges",
      value: (
        <div className="flex flex-col mt-3">
          <input
            type="text"
            className="text-xs font-semibold leading-5 text-black"
            placeholder="Low"
          />
          <div className="flex gap-4 px-px mt-1.5">
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
            <input
              type="text"
              className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]"
            />
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
          </div>
          <input
            type="text"
            className="mt-7 text-xs font-semibold leading-5 text-black"
            placeholder="Normal"
          />
          <div className="flex gap-4 px-px mt-1.5">
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
            <input
              type="text"
              className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]"
            />
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
          </div>
          <input
            type="text"
            className="mt-7 text-xs font-semibold leading-5 text-black"
            placeholder="High"
          />
          <div className="flex gap-4 px-px">
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
            <input
              type="text"
              className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]"
            />
            <input
              type="text"
              className="shrink-0 w-14 rounded border border-black border-solid h-[23px]"
            />
          </div>
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
          <table className="max-w-fit  border-separate">
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
                      className="w-5"
                    />
                  )}
                </td>
                <td className="border-l-[16px] border-transparent">
                  <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    {item.variable}
                  </div>
                </td>
                <td className="border-l-[5rem] border-transparent">
                  <div className="text-black text-xs leading-5 ml-auto">
                    {item.variable === "Date Taken" && (
                      <input
                        type="date"
                        className="text-black text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        placeholder="YYYY-MM-DD"
                        onChange={(e) => setDateTaken(e.target.value)}
                      />
                    )}
                    {item.variable === "Time" && (
                      <input
                        type="time"
                        className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        placeholder="00:00"
                        onChange={(e) => setTime(e.target.value)}
                      />
                    )}
                    {item.variable === "When" && (
                      <select
                        className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        onChange={(e) => setWhen(e.target.value)}
                      >
                        <option value="test1">After Eating</option>
                        <option value="test2">Before Eating</option>
                      </select>
                    )}
                    {item.variable === "Machine Used" && (
                      <input
                        type="text"
                        className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        placeholder="ABC Machine"
                        onChange={(e) => setMachine(e.target.value)}
                      />
                    )}
                    {item.variable === "Value" && (
                      <input
                        type="text"
                        className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        placeholder="120"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                    {item.variable === "Unit" && (
                      <input
                        type="text"
                        className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
                        placeholder="g/moL"
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    )}
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
              <button
                className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch px-14 py-2.5 rounded self-end"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};



