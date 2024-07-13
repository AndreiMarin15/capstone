import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../../../my_health_record/components/sub_components/BackButton";
import { getPrescriptionById } from "@/backend/health_records/getPrescription";
import { getDoctorSignature } from "@/backend/signatures/doctor_signature";
export default function ViewPrescription({
  currentScreen,
  setCurrentScreen,
  prescriptionId,
}) {
  const [prescription, setPrescription] = useState(null);

  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const fetchedPrescription = await getPrescriptionById(prescriptionId);
        setPrescription(fetchedPrescription);
        console.log("Fetched Prescription:", fetchedPrescription);
        console.log(
          fetchedPrescription[0]?.resource?.requester?.agent?.license_id
        );
        const fetchedDoctor = await getDoctorSignature(
          fetchedPrescription[0]?.resource?.requester?.agent?.license_id
        );
        setDoctor(fetchedDoctor);
        console.log("Fetched Doctor:", fetchedDoctor);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    if (prescriptionId) {
      fetchPrescription();
    }
  }, [prescriptionId]);

  return (
    <>
      {currentScreen === 4 || currentScreen === 40 ? (
        <viewMedication />
      ) : (
        <>
          {" "}
          <div className="flex justify-between items-center mt-10 ml-10">
            <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
              VIEW PRESCRIPTION
            </div>
          </div>
          <table className="gap-1 whitespace-nowrap mt-10  ml-10">
            {prescription?.map((prescriptionItem, index) => (
              <React.Fragment key={index}>
                {prescriptionItem.resource.medicationData.map(
                  (medication, medIndex) => (
                    <React.Fragment key={medIndex}>
                      <tr className="h-8">
                        <td className="w-5">
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={
                              "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?" // Replace with actual item.src if available
                            }
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                        </td>
                        <td className="border-l-[10px] border-transparent">
                          <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                            {
                              medication.resource.medicationCodeableConcept[0]
                                ?.coding[0]?.display
                            }
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="border-l-[5px] border-transparent">
                          <div className="text-black text-sm font-regular leading-5 ml-1">
                            From{" "}
                            {
                              medication.resource.dispenseRequest.validityPeriod
                                ?.start
                            }{" "}
                            to{" "}
                            {
                              medication.resource.dispenseRequest.validityPeriod
                                ?.end
                            }
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="flex  border-l-[5px] border-transparent">
                          <div
                            className="text-black text-sm font-regular leading-5"
                            style={{ whiteSpace: "normal", maxWidth: "200px" }}
                          >
                            <span className="font-semibold">Dosage:</span>{" "}
                            {
                              medication.resource.dosageInstruction?.[0]
                                ?.doseAndRate?.[0]?.doseQuantity?.doseUnit
                            }
                          </div>
                          <div
                            className="text-black text-sm font-regular leading-5 ml-10"
                            style={{ whiteSpace: "normal", maxWidth: "200px" }}
                          >
                            <span className="font-semibold">Form:</span>{" "}
                            {medication.resource.form?.text}
                          </div>
                          <div
                            className="text-black text-sm font-regular leading-5 ml-10"
                            style={{ whiteSpace: "normal", maxWidth: "200px" }}
                          >
                            <span className="font-semibold">Frequency:</span>{" "}
                            {
                              medication.resource.dispenseRequest
                                ?.dispenseInterval
                            }
                          </div>
                          <div
                            className="text-black text-sm font-regular leading-5 ml-10"
                            style={{ whiteSpace: "normal", maxWidth: "200px" }}
                          >
                            <span className="font-semibold">Instructions:</span>{" "}
                            {medication.resource.note}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                )}
              </React.Fragment>
            ))}
          </table>
          {currentScreen === 1 && (
            <div className="ml-10">
              <BackButton
                currentScreen={1}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          )}
          {currentScreen === 10 && (
            <div className="ml-10">
              <div className="flex justify-between items-center mt-10 ml-10">
                <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
                  Prescribed By:
                </div>
              </div>
              <div className="flex justify-between items-center mt-10 ml-10">
                <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
                  Name: {doctor?.first_name} {doctor?.last_name}
                </div>
              </div>
              <div className="flex justify-between items-center mt-10 ml-10">
                <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
                  License ID: {doctor?.license_id}
                </div>
              </div>
              <div className="flex justify-start items-start gap-2 mt-10 ml-10">
                <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
                  Signature:{" "}
                </div>
                <Image
                  alt="image"
                  height={100}
                  width={100}
                  src={
                    doctor?.signature // Replace with actual item.src if available
                  }
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
