import * as React from "react";
import Image from "next/image";
import {
  getDoctorByLicense,
  getDoctorSpecialization,
} from "@/backend/pdfBackend/getPDFData";
import { useSignature } from "@/app/store";

export function LabTest({ labTests, patientData, referred_by_id }) {
  React.useEffect(() => {
    console.log("REFERREFBYID",referred_by_id);
  }, [referred_by_id]);
  React.useEffect(() => {
    console.log(labTests);
    // console.log("REFERREDBYID", referred_by_id);
  }, [labTests]);
  function getAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  React.useEffect(() => {
    console.log(patientData);
  }, [patientData]);
  const [referred_by, setReferredBy] = React.useState({});
  const [specialization, setSpecialization] = React.useState("");
  React.useEffect(() => {
    const fetchDoctor = async () => {
      const doctor = await getDoctorByLicense(
        referred_by_id.length > 0 ? referred_by_id : ""
      );
      console.log(referred_by_id);
      console.log(doctor);
      setReferredBy(doctor);
    };

    const fetchSpecialization = async () => {
      const specialization = await getDoctorSpecialization(
        referred_by_id.length > 0 ? referred_by_id : ""
      );
      // console.log(specialization);
      setSpecialization(specialization);
    };

    fetchDoctor();
    fetchSpecialization();
  }, [referred_by_id]);
  return (
    <div className="flex flex-col px-14 py-20 bg-white rounded border border-gray-200 border-solid shadow-sm max-w-[867px] max-md:px-5">
      <div className="flex gap-5 font-semibold leading-5 text-black max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="flex flex-col self-center leading-[150%] max-md:max-w-full">
            <div className="self-center text-xl">
              Dr. {referred_by?.first_name ?? ""} {referred_by?.last_name ?? ""}
            </div>
            <div className="mt-4 text-base max-md:max-w-full">
              {specialization}
            </div>
          </div>
          <div className="flex  flex-row justify-between mt-16 text-xs max-md:mt-10 max-md:max-w-full w-full">
            <div className="items-start text-start">
              {referred_by?.hospital?.name ?? ""} <br />
              <span className="font-normal items-start text-start">
                {referred_by?.hospital?.clinic ?? ""}{" "}
                {referred_by?.hospital?.schedule ?? ""} Contact:{" "}
                {referred_by?.hospital?.contact ?? ""}
              </span>
            </div>
            <div className="justify-between text-right">
              Date Requested <br />{" "}
              <span className="font-normal">{labTests[0].date ?? ""}</span>
            </div>
          </div>
          {/* <div className="mt-4 items-start text-start text-xs max-md:max-w-full">
						Taytay Doctors Hospital
						<br />
						<span className="font-normal items-start text-start">
							Room 213T T 1-7pm Contact: OPD Triage 09999999999
						</span>
					</div> */}
        </div>
      </div>
      <div className="mt-14 max-w-full w-[436px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xs font-semibold leading-5 text-black max-md:mt-10">
              <div className="leading-[150%]">PATIENT INFORMATION</div>
              <div className="mt-6 items-start text-start">
                Name
                <br />
                <span className="font-normal">
                  {patientData?.personal_information?.first_name ?? ""}{" "}
                  {patientData?.personal_information?.last_name ?? ""}
                </span>
              </div>
              <div className="mt-6 items-start text-start">
                Age
                <br />
                <span className="font-normal">
                  {getAge(patientData?.personal_information?.birthdate) ?? ""}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
            <div className="items-start text-start self-stretch my-auto text-xs font-semibold leading-5 text-black max-md:mt-10">
              Address
              <br />
              <span className="font-normal">
                {patientData?.personal_information?.street_address ?? ""},{" "}
                {patientData?.personal_information?.state ?? ""},{" "}
                {patientData?.personal_information?.city ?? ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 text-xs leading-5 text-black max-md:mt-10 max-md:max-w-full">
        <span className="font-semibold">LAB TEST REQUESTS</span>
        <br />
        <br />
        <ul className="list-disc mt-0">
          <table className="max-w-fit border-spacing-y-3 border-separate">
            <tbody className="text-xs leading-5 text-black">
              {Array.isArray(labTests) &&
                labTests.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleRowClick(item.id, item.encounterId, item.status)
                    }
                  >
                    <td className="border-l-[16px] border-transparent">
                      <div className="flex justify-between">
                        {index + 1}. {item.variable}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <li className="ml-2">Fasting Blood Sugar Test</li>{" "}
					<li className="ml-2">Sample Lab Test</li>{" "} */}
        </ul>
      </div>

      <div className="flex gap-5 justify-between items-start mt-11 w-full text-xs leading-5 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start font-semibold">
          <div className="flex flex-col self-start"></div>
        </div>
        <div className="flex flex-col self-end mt-32 max-md:mt-10">
          <Image
            alt="image"
            loading="lazy"
            src={referred_by?.signature ?? ""}
            className="self-center aspect-[1.92] w-[130px]"
            height={0}
            width={0}
          />
          <div className="flex flex-col mt-2.5">
            <div>License No. {referred_by?.license_id ?? ""} </div>
            <div className="self-end mt-2.5">PTR #{referred_by?.ptr ?? ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
