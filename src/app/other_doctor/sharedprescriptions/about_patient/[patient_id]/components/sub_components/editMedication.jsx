import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import uploadMedication from "@/backend//health_records/uploadMedication";
import {
  retrieveMedicationById,
  getMedicationRequests,
} from "@/backend//health_records/getMedicationRequest";
import { retrieveMedications } from "@/backend//health_records/getMedication";
import { healthRecords } from "@/backend//health_records/health_records";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { client } from "@/backend//initSupabase";
import usePrescriptionsStore from "@/app/prescriptionsStore";

export default function EditMedications({ patientId }) {
  const supabase = client("public");

  const {
    editingMedicationId,
    setCurrentScreen,
    setEditingMedicationId,
    currentScreen,
    fetchMedications,
  } = usePrescriptionsStore();

  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [regis, setRegis] = useState("");
  const [medication, setMedication] = useState(null);
  const [medicationName, setMedicationName] = useState("");
  const [genName, setGenName] = useState("");
  const [medId, setMedId] = useState("");
  const [name, setName] = useState("");
  const [doseUnit, setDoseUnit] = useState("");
  const [form, setForm] = useState("");
  const [duration, setDuration] = useState("");
  const [validityStart, setValidityStart] = useState("");
  const [validityEnd, setValidityEnd] = useState("");
  const [patientInstructions, setPatientInstructions] = useState("");
  const [adverseEvent, setAdverseEvent] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const validateFields = () => {
    let valid = true;

    if (!medicationName) {
      valid = false;

      console.log("Medication Name is required.");
      toast.error("Medication Name is required.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
    if (!validityStart) {
      valid = false;

      toast.error("Start Date is required.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
    if (!validityEnd) {
      valid = false;

      toast.error("End Date is required.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }

    if (!duration) {
      valid = false;

      toast.error("Frequency is required.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }

    return valid;
  };

  const updateMedicationRequest = async (editingMedicationId, updatedData) => {
    try {
      const patientData = await healthRecords.getPatientData(patientId);
      const doctorInfo = await doctor.getDoctorByCurrentUser();
      const { data: medicationRequests, error } = await supabase
        .from("medicationrequest")
        .select("*");
      console.log(editingMedicationId);
      const medicationRequestToUpdate = medicationRequests.find(
        (request) => request.id === editingMedicationId
      );
      console.log("Medication Request to Update:", medicationRequestToUpdate);

      if (medicationRequestToUpdate) {
        const updateData = await supabase
          .from("medicationrequest")
          .update({
            resource: {
              ...medicationRequestToUpdate.resource,
              id: regis,
              medicationCodeableConcept: [
                {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                      display: genName, // Assuming genName is a variable holding the updated value
                    },
                  ],
                  text: name, // Assuming name is a variable holding the updated value
                },
              ],
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
              form: {
                text: form,
              },
              note: patientInstructions,
              adverseEvent: {
                adverseReaction: adverseEvent,
              },
            },
          })
          .eq("id", medicationRequestToUpdate.id);
        console.log("Updated Data:", updateData);

        const updatedMedicationRequests = await getMedicationRequests();
        setMedications(updatedMedicationRequests);
        return updateData;
      }

      if (error) {
        console.error("Error updating medication request:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating medication request:", error);
      return null;
    }
  };

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
    const fetchMedicationDetails = async () => {
      try {
        const med = await retrieveMedicationById(editingMedicationId);
        console.log(med);
        setMedication(med);
        const genericName =
          med.resource.medicationCodeableConcept[0]?.coding[0]?.display;
        console.log(
          med.resource.medicationCodeableConcept[0]?.coding[0]?.display
        );
        console.log(med.resource.form.text);
        const brandName = med.resource.medicationCodeableConcept[0].text;
        setName(`${brandName}`);
        setGenName(`${genericName}`);
        setMedicationName(`${genericName} - ${brandName}`);
        setDoseUnit(
          med.resource.dosageInstruction[0]?.doseAndRate[0]?.doseQuantity
            ?.doseUnit
        );
        setForm(med.resource.form.text);
        setPatientInstructions(med.resource.note);
        setValidityStart(med.resource.dispenseRequest.validityPeriod.start);
        setMedId(med.resource.id);
        console.log(med.resource.id);
        setValidityEnd(med.resource.dispenseRequest.validityPeriod.end);
        setAdverseEvent(med.resource.adverseEvent.adverseReaction);
        setDuration(med.resource.dispenseRequest.dispenseInterval);

        // You can set other fields similarly
      } catch (error) {
        console.error("Error fetching medication details:", error);
      }
    };

    if (editingMedicationId) {
      fetchMedicationDetails();
    }
  }, [editingMedicationId]);

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
    setFormSubmitted(true);
    if (!validateFields()) {
      return;
    }

    try {
      const patientData = await healthRecords.getPatientData(patientId);
      const doctorInfo = await doctor.getDoctorByCurrentUser();

      const dataToUpdate = {
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
            reference: doctorInfo,
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

      console.log("Data to save:", dataToUpdate);
      // Call the uploadEncounter function with the data to save
      const updatedMedicationRequest = await updateMedicationRequest(
        editingMedicationId,
        dataToUpdate
      );
      await fetchMedications();
      if (updatedMedicationRequest) {
        // Update state or perform any other actions
        console.log(
          "Medication request updated successfully:",
          updatedMedicationRequest
        );

        // Display success message or perform other actions
        toast.success("Medication Request Updated", {
          position: "top-left",
          theme: "colored",
          autoClose: 8000,
        });
        setCurrentScreen(1);
      } else {
        // Handle error scenario
        console.error("Failed to update medication request");
        // Display error message or perform other actions
        toast.error("Failed to update medication request", {
          position: "top-left",
          theme: "colored",
          autoClose: 8000,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
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
      {currentScreen === 4 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            EDIT MEDICATION
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-sm max-md:ml-0 max-md:w-full">
                      <div className="text-start text-sm whitespace-nowrap font-semibold text-black">
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
                                      className={`grow justify-center items-start py-1.5 pr-8 pl-3  rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 ${
                                        item.variable === "Frequency" &&
                                        formSubmitted &&
                                        !duration
                                          ? "border-red-500"
                                          : ""
                                      }`}
                                      value={
                                        item.variable === "Dose and Unit"
                                          ? doseUnit
                                          : item.variable === "Form" 
                                            ? form
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
                                        className={`text-black rounded shadow-sm mt-2 px-6 py-4 border-[0.5px] border-solid ${
                                          formSubmitted && !medicationName
                                            ? "border-red-500"
                                            : "border-black"
                                        }`}
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
                                              className="border text-black text-baseborder-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
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
                                                  console.log(med);
                                                  // setMedId(med.resource.id)
                                                  console.log(genName);
                                                  setRegis(
                                                    `${med["Registration Number"]}`
                                                  );
                                                  console.log(
                                                    `Regis number: ${med["Registration Number"]}`
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
                    <div className="flex flex-col w-[90%] text-sm max-md:ml-0 max-md:w-full">
                      <div className="text-start text-sm whitespace-nowrap font-semibold text-black">
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
                                    className={`grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded shadow-sm text-sm font-medium  border-[0.5px] focus:border ${
                                      (item.variable === "Start Date" &&
                                        formSubmitted &&
                                        !validityStart) ||
                                      (item.variable === "End Date" &&
                                        formSubmitted &&
                                        !validityEnd)
                                        ? "border-red-500"
                                        : "border-black"
                                    }`}
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

                    <div className="flex flex-col w-[90%] text-sm max-md:ml-0 max-md:w-full">
                      <div className="text-start text-sm  mt-10 whitespace-nowrap font-semibold text-black">
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
              <button
                onClick={() => {
                  handleSave();
                }} // Attach the handleSave function here
                className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white"
              >
                SAVE
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
