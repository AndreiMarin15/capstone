import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../../BackButton";
import uploadMedication from "@/backend//health_records/uploadMedication";
import { retrieveMedications } from "@/backend//health_records/getMedication";
import { formatDuration } from "date-fns/esm";
import { healthRecords } from "@/backend//health_records/health_records";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";
import usePrescriptionsStore from "@/app/prescriptionsStore";

export default function AddMedications({ patientId, onAddMedication }) {
  const [regis, setRegis] = useState("");
  const { currentScreen, setCurrentScreen, addMedicationId } =
    usePrescriptionsStore();
  const [medicationName, setMedicationName] = useState("");
  const [name, setName] = useState("");
  const [genName, setGenName] = useState("");
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [patientInstructions, setPatientInstructions] = useState("");
  const [doseUnit, setDoseUnit] = useState("");

  const [form, setForm] = useState("");
  const [duration, setDuration] = useState("");
  const [validityStart, setValidityStart] = useState();
  const [validityEnd, setValidityEnd] = useState();
  const [adverseEvent, setAdverseEvent] = useState("");

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const meds = await retrieveMedications();
        setMedications(meds);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  useEffect(() => {
    const findMedicationByRegis = () => {
      const selectedMedication = medications.find(
        (medication) => medication["Registration Number"] === regis
      );
      if (selectedMedication) {
        const dosageStrength = selectedMedication["Dosage Strength"];
        const dosageForm = selectedMedication["Dosage Form"];
        setDoseUnit(dosageStrength);
        setForm(dosageForm);
      }
    };
    if (regis !== "") {
      findMedicationByRegis();
    }
  }, [regis, medications]);

  const handleSave = async () => {
    try {
      const patientData = await healthRecords.getPatientData(patientId);
      const doctorInfo = await doctor.getDoctorByCurrentUser();

      const dataToSave = {
        status: "Active",
        id: regis,
        medicationCodeableConcept: [
          {
            coding: [
              {
                system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                display: genName,
              },
            ],
            text: name,
          },
        ],
        subject: {
          type: "Patient",
          reference: patientData.id,
          patient: patientData,
        },
        dosageInstruction: [
          {
            text: patientInstructions,
            doseAndRate: [
              {
                doseQuantity: {
                  doseUnit: doseUnit,
                },
              },
            ],
          },
        ],
        dispenseRequest: {
          dispenseInterval: duration,
          validityPeriod: {
            start: validityStart,
            end: validityEnd,
          },
        },
        requester: {
          agent: {
            reference: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
        },
        form: {
          text: form,
        },
        note: patientInstructions,
        adverseEvent: {
          adverseReaction: adverseEvent,
        },
        resource_type: "MedicationRequest",
      };

      console.log("Data to save:", dataToSave);

      const savedData = await uploadMedication(dataToSave);

      console.log("Data saved successfully:", savedData);
      console.log(savedData);

      addMedicationId(savedData);

      toast.success("Medication Added", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setCurrentScreen(1);
  };

  const dosage = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Medicine Name",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Dose and Unit",
      value: "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Form",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Frequency",
      value: "",
      component: 2,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Patient Instructions",
      value: "",
    },
  ];

  const prescription = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Start Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "End Date",
      value: "",
    },
  ];

  const others = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Possible Side Effects",
      value: "",
    },
  ];

  return (
    <>
      {currentScreen === 3 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD MEDICATION
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs whitespace-nowrap font-semibold text-black">
                        Dosage Instructions
                      </div>
                      <table className="w-full">
                        <tbody>
                          {dosage?.map((item, index) => (
                            <tr
                              key={index}
                              className="flex gap-5 justify-between mt-6 w-full"
                            >
                              {item.variable !== "Medicine Name" ? (
                                <>
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
                                  <td>
                                    <input
                                      type="text"
                                      className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[205px]"
                                      value={
                                        item.variable === "Dose and Unit" &&
                                        regis !== ""
                                          ? doseUnit
                                          : item.variable === "Form" // Check if regis is not empty
                                            ? form // If regis is not empty, use the autofilled form
                                            : item.variable === "Frequency"
                                              ? duration
                                              : patientInstructions
                                      }
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        switch (item.variable) {
                                          case "Dose and Unit":
                                            setDoseUnit(value);
                                            break;
                                          case "Form":
                                            setForm(value);
                                            break;
                                          case "Frequency":
                                            setDuration(value);
                                            break;
                                          case "Patient Instructions":
                                            setPatientInstructions(value);
                                            break;
                                          default:
                                            break;
                                        }
                                      }}
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
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
                                  <td>
                                    <div className="inline-block relative">
                                      <textarea
                                        value={medicationName}
                                        onChange={(e) => {
                                          const inputValue =
                                            e.target.value.toLowerCase();
                                          const filteredMeds = medications
                                            .filter((medication) => {
                                              const genericName =
                                                medication[
                                                  "Generic Name"
                                                ]?.toLowerCase() || "";
                                              const brandName =
                                                medication[
                                                  "Brand Name"
                                                ]?.toLowerCase() || "";
                                              return (
                                                genericName.includes(
                                                  inputValue
                                                ) ||
                                                brandName.includes(inputValue)
                                              );
                                            })
                                            .slice(0, 50); // Limiting the filtered medications to 50
                                          setFilteredMedications(filteredMeds);
                                          setMedicationName(e.target.value);
                                        }}
                                        className="text-black rounded shadow-sm mt-2 border-[0.5px] px-6 py-4 border-solid border-black"
                                        style={{ height: "auto" }}
                                        placeholder="Search for medication..."
                                      />
                                      {filteredMedications.length > 0 && (
                                        <ul
                                          style={{
                                            listStyle: "none",
                                            padding: "unset",
                                            margin: "unset",
                                            position: "absolute",
                                            width: "600px", // Subtract 4px for the border width
                                            maxHeight: "200px", // Adjust the maximum height as needed
                                            overflowY: "auto", // Enable vertical scrolling if needed
                                            overflowX: "hidden",
                                          }}
                                        >
                                          {filteredMedications?.map((med) => (
                                            <li
                                              key={med["Registration Number"]}
                                              className="border text-black text-sm border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
                                            >
                                              <button
                                                className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
                                                onClick={() => {
                                                  console.log(
                                                    `Gen + Brand Name: ${med["Generic Name"]} - ${med["Brand Name"]} ${med["Dosage Strength"]}`
                                                  );
                                                  setMedicationName(
                                                    `${med["Generic Name"]} - ${med["Brand Name"]}`
                                                  );
                                                  console.log(
                                                    `Brand Name: ${med["Brand Name"]}`
                                                  );
                                                  setName(
                                                    `${med["Brand Name"]}`
                                                  );
                                                  setGenName(
                                                    `${med["Generic Name"]}`
                                                  );
                                                  console.log(name);
                                                  setRegis(
                                                    `${med["Registration Number"]}`
                                                  );
                                                  console.log(
                                                    `Regis number: ${med["Registration Number"]}`
                                                  );
                                                  console.log(
                                                    "Registed id",
                                                    regis
                                                  );
                                                  setFilteredMedications([]);
                                                }}
                                              >
                                                {`${med["Generic Name"]} - ${med["Brand Name"]} ${med["Dosage Strength"]} ${med["Dosage Form"]}`}
                                              </button>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs whitespace-nowrap font-semibold text-black">
                        Prescription Duration
                      </div>
                      <table className="w-full">
                        <tbody>
                          {prescription?.map((item, index) => (
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
                                  className="aspect-square fill-black w-[15px]"
                                />
                                <div className="flex-auto my-auto">
                                  {item.variable}
                                </div>
                              </td>
                              <td>
                                {item.variable === "Start Date" ||
                                item.variable === "End Date" ? (
                                  <input
                                    type="date"
                                    className="grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[205px]"
                                    value={
                                      item.variable === "Start Date"
                                        ? validityStart
                                        : validityEnd
                                    }
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      if (item.variable === "Start Date") {
                                        setValidityStart(value);
                                      } else if (item.variable === "End Date") {
                                        setValidityEnd(value);
                                      }
                                    }}
                                  />
                                ) : (
                                  <input
                                    className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
                                    value={item.value}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs  mt-10 whitespace-nowrap font-semibold text-black">
                        Others
                      </div>
                      <table className="w-full">
                        <tbody>
                          {others?.map((item, index) => (
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
                                  className="aspect-square fill-black w-[15px]"
                                />
                                <div className="flex-auto my-auto">
                                  {item.variable}
                                </div>
                              </td>
                              <td>
                                <textarea
                                  className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[205px]"
                                  value={
                                    item.variable === "Possible Side Effects"
                                      ? adverseEvent
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    console.log(value);
                                    setAdverseEvent(value);
                                  }}
                                />
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
                  handleSave();
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
