"use client";

import * as React from "react";
import Image from "next/image";

import { useEffect, useState } from "react";
import {
  getMedicalHistory,
  getMedications,
} from "@/backend/pdfBackend/getPDFData";

import { getLabTests } from "@/backend/pdfBackend/getPDFData";
import { SelectLabtests } from "./subcomponents/selectLabTests";
import { Label } from "@/components/ui/label";
import {
  getPrescriptions,
  getAttendingDoctors,
} from "@/backend/pdfBackend/getPDFData";

export default function WriteReferral({
  referralData,
  setReferralData,
  selectedPatientId,
}) {
  const [diagnoses, setDiagnoses] = useState([]);
  const [medications, setMedications] = useState([]);

  const [diagnosisText, setDiagnosisText] = useState("");
  const [medicationText, setMedicationText] = useState("");
  const [attending_doctors, setAttendingDoctors] = useState([]);

  const [labtests, setLabtests] = useState([]);

  function addLabTest(newLabTest) {
    setReferralData((currentReferralData) => ({
      ...currentReferralData,
      lab_tests: [...currentReferralData.lab_tests, newLabTest],
    }));
  }

  function removeLabTest(id) {
    setReferralData((currentReferralData) => ({
      ...currentReferralData,
      lab_tests: currentReferralData.lab_tests.filter(
        (labtest) => labtest.id !== id
      ),
    }));
  }

  function updateLabtest(id) {
    setLabtests(
      labtests.map((labtest) => {
        if (labtest.labtest.id === id) {
          return { ...labtest, selected: !labtest.selected };
        } else {
          return labtest;
        }
      })
    );
  }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    console.log(base64.toString());
    setReferralData((currentReferralData) => ({
      ...currentReferralData,
      signature: base64.toString(),
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const labtests = await getLabTests(selectedPatientId);
      setLabtests(
        labtests.map((labtest) => {
          return {
            labtest: labtest,
            selected: false,
          };
        })
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const attendingDoctors = await getAttendingDoctors(selectedPatientId);
      console.log("docs", attendingDoctors);
      setAttendingDoctors(attendingDoctors);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(labtests);
  }, [labtests]);

  useEffect(() => {
    const fetchData = async () => {
      const diagnosis = await getMedicalHistory(selectedPatientId);
      console.log(diagnosis);
      const medication = await getMedications(selectedPatientId);
      const prescriptions = await getPrescriptions(selectedPatientId);
      console.log(prescriptions);
      setDiagnoses(
        diagnosis
          .filter((medicalhistory) => medicalhistory.resource.valueString)
          .map((medicalhistory) => medicalhistory.resource.valueString)
      );
      setMedications(
        prescriptions
          .filter(
            (prescription) =>
              prescription.resource?.dispenseRequest?.validityPeriod?.end >=
                new Date().toISOString().slice(0, 10) &&
              prescription.resource?.dispenseRequest?.validityPeriod?.start <=
                new Date().toISOString().slice(0, 10)
          )
          .map(
            (prescription) =>
              prescription.resource.medicationCodeableConcept[0].text
          )
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDiagnosisText(`Diagnoses: \n${diagnoses.join("\n")}`);
  }, [diagnoses]);

  useEffect(() => {
    setMedicationText(
      `Here are the medications I am giving the patient:\n${medications.join(
        "\n"
      )}`
    );
  }, [medications]);

  useEffect(() => {
    setReferralData((currentReferralData) => ({
      ...currentReferralData,
      reason_for_referral: diagnosisText,
    }));
  }, [diagnosisText]);

  useEffect(() => {
    setReferralData((currentReferralData) => ({
      ...currentReferralData,
      medications: medicationText,
    }));
  }, [medicationText]);

  const handleDoctorNameChange = (e) => {
    const fullName = e.target.value;
    // Assuming `attendingDoctors` is an array of doctor objects
    const matchedDoctor = attending_doctors.find(
      (doctor) =>
        `${doctor.doctor_first_name} ${doctor.doctor_last_name}` === fullName
    );

    if (matchedDoctor) {
      // Assuming you have a way to set these (e.g., setState in a class component or useState in a functional component)

      setReferralData((prevReferralData) => ({
        ...prevReferralData,
        specialization: matchedDoctor.doctor_specialization,
        place_of_clinic: matchedDoctor.clinic,
        contact: matchedDoctor.contact,
      }));
    }
  };

  useEffect(() => {}, [referralData]);
  return (
    <div className="flex flex-col m-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-5 text-xl font-semibold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        Write a Referral Letter
      </div>
      <div className="pt-7 pr-20 pb-12 pl-9 mt-9 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-4 max-md:mt-10">
              <Image
                alt="img"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e80fd4f7e67b4f0d3c46d75e3c8fcd5b038ba176a835fc6fbfa07ccbc0ae7748?apiKey=66e07193974a40e683930e95115a1cfd&"
                className="shrink-0 w-14 aspect-square"
              />
              <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
                <div className="flex text-xs font-semibold  text-black whitespace-nowrap">
                  <div className=" my-auto mr-5">{"Doctor's Name"}</div>
                  <input
                    value={referralData.doctor_name}
                    onChange={(e) => {
                      setReferralData({
                        ...referralData,
                        doctor_name: e.target.value,
                      });

                      handleDoctorNameChange(e);
                    }}
                    list="options"
                    type="text"
                    className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
                  />
                  <datalist id="options">
                    {attending_doctors.map((doctor) => (
                      <option
                        key={doctor.id}
                        value={
                          doctor.doctor_first_name +
                          " " +
                          doctor.doctor_last_name
                        }
                      />
                    ))}
                  </datalist>
                </div>
                <div className="flex mt-3.5 text-xs font-semibold  text-black whitespace-nowrap">
                  <div className=" my-auto mr-5">Specialization</div>
                  <input
                    value={referralData.specialization}
                    onChange={(e) =>
                      setReferralData({
                        ...referralData,
                        specialization: e.target.value,
                      })
                    }
                    type="text"
                    className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[44%] ">
            <div className="flex gap-5 text-xs font-semibold  text-black max-md:mt-10">
              <div className=" my-auto ml-10 mr-5">Place of Clinic</div>
              <input
                value={referralData.place_of_clinic}
                onChange={(e) =>
                  setReferralData({
                    ...referralData,
                    place_of_clinic: e.target.value,
                  })
                }
                type="text"
                className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
              />
            </div>
            <div className="flex gap-14 mt-3.5 text-xs font-semibold  text-black max-md:mt-10">
              <div className=" my-auto ml-10 mr-5">Contact</div>
              <input
                value={referralData.contact}
                onChange={(e) =>
                  setReferralData({ ...referralData, contact: e.target.value })
                }
                type="text"
                className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 py-5 mt-2.5 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:pl-5 max-md:max-w-full">
        <div className="flex flex-col px-6 py-5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Reason for Referral
          </div>
          <textarea
            value={referralData.reason_for_referral}
            onChange={(e) =>
              setReferralData({
                ...referralData,
                reason_for_referral: e.target.value,
              })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-3.5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Medication/s
          </div>
          <textarea
            value={referralData.medications}
            onChange={(e) =>
              setReferralData({ ...referralData, medications: e.target.value })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-4 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Notes/ Other Remarks:
          </div>
          <textarea
            value={referralData.other_remarks}
            onChange={(e) =>
              setReferralData({
                ...referralData,
                other_remarks: e.target.value,
              })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-4 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-3 text-base items-center font-semibold leading-6 text-black max-md:max-w-full">
            <span className="items-center">Lab Test/s:</span>
            <SelectLabtests
              labtests={labtests}
              updateLabtest={updateLabtest}
              addLabtest={addLabTest}
              removeLabtest={removeLabTest}
            />
          </div>

          <div className="grid gap-4 py-4">
            {labtests.map(
              (labtest, index) =>
                labtest.selected && (
                  <div key={index} className={"p-2"}>
                    <div className="grid grid-cols-2 items-start gap-7">
                      <Label htmlFor="name">
                        {labtest.labtest.resource.codeText}
                      </Label>
                      <Label>Lab Values:</Label>
                    </div>
                    <div className="mt-2 grid grid-cols-2 items-start gap-7">
                      <Label htmlFor="username">
                        {labtest.labtest.resource.uploadedDateTime &&
                          `Laboratory Test Date: ${labtest.labtest.resource.uploadedDateTime}`}
                      </Label>
                      <Label>
                        {labtest.labtest.resource.valueQuantity
                          ?.valueQuantities[0]?.display ?? ""}{" "}
                        {labtest.labtest.resource.valueQuantity
                          ?.valueQuantities[0]?.display && "="}{" "}
                        {labtest.labtest.resource.valueQuantity
                          ?.valueQuantities[0]?.value ?? ""}{" "}
                        {labtest.labtest.resource.valueQuantity
                          ?.valueQuantities[0]?.unit ?? ""}
                      </Label>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 mr-9 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="text-black text-sm font-semibold leading-5">
          Signature
        </div>
        <div className="flex items-center gap-2.5 mt-3">
          {referralData.signature.length > 1 && referralData.signature && (
            <Image
              alt="img"
              loading="lazy"
              src={
                (referralData.signature.length > 1 && referralData.signature) ??
                "https://cdn.builder.io/api/v1/image/assets/TEMP/596265a182574cc61f242ab133d8eb6a440ed2cadf7d0f1b97fa247bd319b459?"
              }
              className="aspect-[1.02] w-[53px]"
              width="0"
              height="0"
            />
          )}

          <label
            htmlFor="fileInput"
            className="justify-center px-3 py-1.5 my-auto bg-white rounded-sm border-solid shadow-sm aspect-[2.48] border-[0.5px] border-zinc-600 cursor-pointer"
          >
            Upload
            <input
              onChange={handleImageUpload}
              id="fileInput"
              type="file"
              accept=".jpeg, .png, .jpg"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
