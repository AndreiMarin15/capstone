import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { addAttendingDoctor } from "@/backend/attending_doctors/attending_doctors";

export default function AddAttendingDoctors({
  currentScreen,
  setCurrentScreen,
  patientId,
}) {
  function splitName(name) {
    const lastSpaceIndex = name.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return [name]; // Return the original name in an array if there's no space.
    }
    return [
      name.substring(0, lastSpaceIndex),
      name.substring(lastSpaceIndex + 1),
    ];
  }

  const [attendingDoctors, setAttendingDoctors] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      variable: "Name of Doctor",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Specialization",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Place of Clinic",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f5262fe18cacfe2ba811c7540eac580928c9def3078b6ed62ce856926ce2393?",
      variable: "Contact",
      value: "",
    },
  ]);

  const handleSave = async () => {
    const splitname = splitName(attendingDoctors[1].value);
    const attendingDoctorData = {
      patient: {
        id: patientId,
      },
      doctor: {
        first_name: splitname[0],
        last_name: splitname[1],
        doctor_specialization: attendingDoctors[2].value,
        clinic: attendingDoctors[3].value,
        contact: attendingDoctors[4].value,
      },
    };
    console.log(attendingDoctorData);
    await addAttendingDoctor(
      attendingDoctorData.doctor,
      attendingDoctorData.patient
    );
    setCurrentScreen(2);
  };
  const handleChange = (index, newValue) => {
    setAttendingDoctors((currentDoctors) =>
      currentDoctors.map((doctor, i) =>
        i === index ? { ...doctor, value: newValue } : doctor
      )
    );
  };

  useEffect(() => {
    console.log(attendingDoctors);
  }, [attendingDoctors]);
  return (
    <>
      {currentScreen === 3 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD ATTENDING DOCTOR/S
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-sm max-md:ml-0 max-md:w-full">
                      <table className="w-full">
                        <tbody>
                          {attendingDoctors?.map((item, index) => (
                            <tr
                              key={index}
                              className="flex gap-5 justify-between mt-6 w-full"
                            >
                              <td className="flex gap-2 my-auto font-semibold text-black">
                                <Image
                                  alt="image"
                                  height={0}
                                  width={0}
                                  loading="lazy"
                                  src={item.src}
                                  className="aspect-[1.14] fill-black w-[17px]"
                                />
                                <div className="flex-auto my-auto">
                                  {item.variable}
                                </div>
                              </td>
                              <td className="flex-start">
                                {" "}
                                {/* Apply flex-start alignment */}
                                {item.variable === "Date" ? (
                                  <div className="inline-block relative justify-start mr-20">
                                    <input
                                      type="date"
                                      className="text-black rounded shadow-sm mt-2 mr-6 border-[0.5px] px-4 py-2 border-solid border-black"
                                      onChange={(e) => {
                                        // Handle date change if needed
                                      }}
                                      defaultValue={
                                        new Date().toISOString().split("T")[0]
                                      } // Set default value to today's date
                                    />
                                  </div>
                                ) : (
                                  <input
                                    className="flex grow justify-center items-start py-1.5 pr-3 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-10 w-[250px]"
                                    onChange={(e) => {
                                      console.log(
                                        "Input changed:",
                                        e.target.value
                                      );
                                      handleChange(index, e.target.value);
                                      // Update the state for the corresponding item.value
                                      // For example: setRegis(e.target.value) for "Registration Number"
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <BackButton currentScreen={2} setCurrentScreen={setCurrentScreen} />
            <div>
              <Button
                onClick={() => {
                  handleSave(); // Save the medication
                  setCurrentScreen(2); // Navigate back to the medication list screen
                }}
              >
                SAVE
              </Button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
