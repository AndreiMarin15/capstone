import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitMedications from "../visitMedications";
import VisitLabtests from "../visitLabTests";
import LabTestList from "../labTestList";
import BackButton from "../BackButton";
import { getMedicationRequests } from "@/backend//health_records/getMedicationRequest";

export default function ViewMedication({
  currentScreen,
  setCurrentScreen,
  medicationId,
}) {
  console.log("Current medicationId:", medicationId);
  const [medications, setMedications] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [doseUnit, setDoseUnit] = useState("");
  const [form, setForm] = useState("");
  const [frequency, setFrequency] = useState("");
  const [note, setNote] = useState("");
  const [medicationStart, setMedicationStart] = useState("");
  const [medicationEnd, setMedicationEnd] = useState("");
  const [sideEffect, setSideEffect] = useState("");

  const dosage = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Medicine Name",
      value: medicineName || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Dose/Unit",
      value: doseUnit || "",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Form",
      value: form || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Frequency",
      value: frequency || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Patient Instructions",
      value: note || "",
    },
  ];

  const prescription = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Start Date",
      value: medicationStart || "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "End Date",
      value: medicationEnd || "",
    },
  ];

  const others = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Possible Side Effects",
      value: sideEffect || "",
    },
  ];

  React.useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationRequestsData = await getMedicationRequests();
        setMedications(medicationRequestsData);
        console.log("Medication Requests Data:", medicationRequestsData);

        // Find the medication with the specified medicationId
        const filteredMedication = medicationRequestsData.find(
          (medication) => medication.resource.id === medicationId
        );

        // Check if the filtered medication exists
        if (filteredMedication) {
          const medicationResource = filteredMedication.resource;

          // Extract relevant data from the medication resource
          console.log(
            medicationResource.medicationCodeableConcept[0]?.text || ""
          );
          console.log(medicationResource.form?.text || "");
          setMedicineName(
            medicationResource.medicationCodeableConcept[0]?.text || ""
          );

          setDoseUnit(
            medicationResource.dosageInstruction[0]?.doseAndRate[0]
              ?.doseQuantity?.doseUnit || ""
          );
          setForm(medicationResource.form?.text || "");
          setFrequency(
            medicationResource.dispenseRequest?.dispenseInterval || ""
          );
          setNote(medicationResource.note || "");
          setMedicationStart(
            medicationResource.dispenseRequest?.validityPeriod?.start || ""
          );
          setMedicationEnd(
            medicationResource.dispenseRequest?.validityPeriod?.end || ""
          );
          setSideEffect(medicationResource.adverseEvent?.adverseReaction || "");
        } else {
          // Handle case where no medication is found with the specified medicationId
          console.log(
            "No medication found with the specified medicationId:",
            medicationId
          );
        }
      } catch (error) {
        console.error("Error fetching medication requests:", error);
      }
    };

    fetchMedications();
  }, [medicationId]);

  const [currentScreen3, setCurrentScreen3] = useState(0);

  return (
    <>
      {currentScreen3 === 0 || currentScreen === 1 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            VIEW MEDICATION
          </div>

          <div className="flex gap-[4rem] align-baseline">
            <table className="max-w-fit border-spacing-y-7 border-separate">
              <tbody className=" text-xs leading-5 text-black">
                <div className="text-xs leading-5 text-black ">
                  {" "}
                  <span className="font-bold"> Dosage Instructions</span>
                  {dosage?.map((item, index) => (
                    <tr key={index} className="h-8">
                      <td className="w-5">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={item.src}
                          className="self-start aspect-square fill-black w-[15px]"
                        />
                      </td>
                      <td className="border-l-[16px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[5rem] border-transparent">
                        {typeof item.value === "string" ? (
                          <div className="text-black text-xs leading-5 ml-auto">
                            {item.value}
                          </div>
                        ) : (
                          <div className="ml-auto">
                            <button
                              onClick={item.value.onClick}
                              className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
                            >
                              {item.value.label}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </div>
              </tbody>
            </table>
            <table className="max-w-fit border-spacing-y-7 border-separate">
              <tbody className=" text-xs leading-5 text-black">
                <div className="text-xs leading-5 text-black font-bold">
                  {" "}
                  Prescription Duration
                  {prescription?.map((item, index) => (
                    <tr key={index} className="h-8">
                      <td className="w-5">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={item.src}
                          className="self-start aspect-square fill-black w-[15px]"
                        />
                      </td>
                      <td className="border-l-[16px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[5rem] border-transparent">
                        <div className="text-black text-xs font-normal leading-5 ml-auto">
                          {item.variable === "Heart Rate" ? 70 : item.value}
                        </div>
                      </td>
                    </tr>
                  ))}
                </div>

                <div className="text-xs leading-5 text-black font-bold">
                  {" "}
                  Other Remarks
                  {others?.map((item, index) => (
                    <tr key={index} className="h-8">
                      <td className="w-5">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={item.src}
                          className="self-start aspect-square fill-black w-[15px]"
                        />
                      </td>
                      <td className="border-l-[16px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[5rem] border-transparent">
                        <div className="text-black text-xs font-normal leading-5">
                          {item.value}
                        </div>
                      </td>
                    </tr>
                  ))}
                </div>
              </tbody>
            </table>
          </div>

          <BackButton
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      ) : (
        ""
      )}

      {currentScreen === 1 && (
        <>
          <VisitMedications
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      )}

      {currentScreen === 2 && (
        <>
          <LabTestList
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      )}
    </>
  );
}
