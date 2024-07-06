import Image from "next/image";
import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import VisitLabtests from "./visitLabTests";
import BackButton from "./BackButton";
import { currentUser } from "@/app/store";
import { importCarePlan } from "@/backend/patient/careplan/careplan";
import { Button } from "@/components/ui/button";
import { getAttendingDoctors } from "@/backend/attending_doctors/attending_doctors";

export default function AddCarePlan({
  setCurrentScreen,
  patientData,
  patientId,
  fetchData
}) {
  const lookup = {
    dietaryManagement: { code: "18771-9", display: "Dietary Management" },
    physicalActivities: {
      code: "72333-2",
      display: "Physical Activities",
    },
    selfMonitoring: { code: "61150-9", display: "Self Monitoring" },
  };
  const doctorFullName = currentUser.getState().user.fullName;
  const doctorId = currentUser.getState().user.id;

  const patientFullName =
    patientData.personal_information.first_name +
    " " +
    patientData.personal_information.last_name;
  const patientsId = patientId;

  const [saveClicked, setSaveClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [dietaryManagement, setDietaryManagement] = useState("");
  const [physicalActivities, setPhysicalActivities] = useState("");
  const [selfMonitoring, setSelfMonitoring] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [compactActivity, setCompactActivity] = useState("");
  const [attendingDoctors, setAttendingDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDoctorFirstName, setSelectedDoctorFirstName] = useState("");
  const [selectedDoctorLastName, setSelectedDoctorLastName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await getAttendingDoctors(patientId);
        setAttendingDoctors(val);
        return val;
      } catch (error) {
        console.error("Error fetching attending doctors:", error);
      }
    };

    fetchData();
  }, []); // Assuming patientId is a dependency that triggers the effect

  function convertToActivity(type, value) {
    return {
      detail: {
        code: {
          text: lookup[type].display,
          coding: [
            {
              code: lookup[type].code,
              system: "http://loinc.org",
              display: lookup[type].display,
            },
          ],
        },
        description: value,
      },
    };
  }

  const createCompactActivity = () => {
    // Check if title is empty
    if (!title || !startDate || !endDate) {
      setSaveClicked(true); // Set saveClicked to true
      toast.error("Please Fill In All Required Fields", {
        autoClose: 2000,
      });
      return; // Prevent further execution if title is empty
    }
  
    const data = [];
  
    if (dietaryManagement)
      data.push(convertToActivity("dietaryManagement", dietaryManagement));
    if (physicalActivities)
      data.push(convertToActivity("physicalActivities", physicalActivities));
    if (selfMonitoring)
      data.push(convertToActivity("selfMonitoring", selfMonitoring));
  
    const today = new Date().toISOString().split("T")[0];

    var patientInformation = patientData.personal_information;
    delete patientInformation.photo;

    setCompactActivity({
      title: title,
      period: {
        end: endDate,
        start: startDate,
      },
      created: today,
      subject: {
        display: patientFullName,
        reference: patientsId,
        patient: patientInformation,
      },
      activity: data,
      contributor: [
        {
          display: doctorFullName,
          reference: doctorId,
          doctor_license: currentUser.getState().user.license_id,
        },
      ],
      insert: {
        end_date: [endDate, endDate, endDate],
        type: [
          data[0].detail.code.text,
          data[1].detail.code.text,
          data[2].detail.code.text,
        ],
        description: [
          data[0].detail.description,
          data[1].detail.description,
          data[2].detail.description,
        ],
      },
      careTeam: [
        {
          display: selectedDoctorFirstName + " " + selectedDoctorLastName,
          reference: selectedDoctorId,
        },
      ],
      description: `Careplan for ${patientFullName}`,
    });
  };

  const date = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "*Start Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "*End Date",
      value: "",
    },
  ];

  useEffect(() => {
    if (Object.keys(compactActivity).length > 0) {
      // Check if compactActivity is not empty
      const insertCarePlan = async () => {
        try {
          await importCarePlan(compactActivity);
          // successful save
          toast.success("Care Plan Added", {
            position: "top-left",
            theme: "colored",
            autoClose: 2000,
          });
        } catch (error) {
          // errors
          console.error("Failed to care plan:", error);
          toast.error("Failed to add care plan.", {
            position: "top-left",
            autoClose: 2000,
          });
        }
        fetchData();
        setCurrentScreen(0);
      };
      insertCarePlan();
    }
  }, [compactActivity]);

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-10 max-md:ml-1 max-md:mt-10">
        ADD CARE PLAN
      </div>

      <div>
        <div className="flex flex-col max-w-full">
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
              <table className="w-[40%] max-md:ml-0 max-md:w-full text-xs">
                <tbody>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">*Title</div>
                      </div>
                    </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setTitle(e.target.value);
                          console.log(title)
                        }}
                        type="text"
                        className={`justify-center items-start py-1.5 pl-2 pr-14 whitespace-nowrap border-black border-[0.5px] rounded shadow-sm 
                            ${saveClicked && !title && 'border-red-500 border-[0.5px]'}
                            ${!saveClicked && 'border-black border-[0.5px]'}
                          `}
                      />
                    </td>
                  </tr>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">Collaborating Doctor</div>
                      </div>
                    </td>
                    <td>
                    <select
                      onChange={(e) => {
                        const selectedDoctorId = e.target.value;
                        console.log("Selected doctor ID:", selectedDoctorId);
                        console.log("Attending doctors array:", attendingDoctors);

                        const selectedDoctor = attendingDoctors.find(
                          (doctor) => doctor.doctor_id === selectedDoctorId
                        );

                        console.log("Selected doctor object:", selectedDoctor);

                        if (selectedDoctor) {
                          setSelectedDoctorId(selectedDoctor.doctor_id);
                          setSelectedDoctorFirstName(selectedDoctor.doctor_first_name);
                          setSelectedDoctorLastName(selectedDoctor.doctor_last_name);
                        }
                      }}
                      className="justify-center items-start py-1.5 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5"
                    >
                      <option value="">Select...</option>
                      {attendingDoctors?.map((doctor) => (
                        <option key={doctor.doctor_id} value={doctor.doctor_id}>
                          {doctor.doctor_last_name}, {doctor.doctor_first_name} -{" "}
                          {doctor.doctor_specialization}
                        </option>
                      ))}
                    </select>
                      
                    </td>
                  </tr>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto ">Dietary Management</div>
                      </div>
                    </td>
                    <td>
                      <textarea
                        onChange={(e) => {
                          setDietaryManagement(e.target.value);
                        }}
                        value={dietaryManagement}
                        style={{ overflow: "hidden" }}
                        className="justify-center items-start py-1.5 pr-14 w-full rounded border-black border-solid shadow-sm border-[0.5px]  max-md:pr-5"
                      />{" "}
                    </td>
                  </tr>
                  <tr className="flex gap-5 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">Physical Activities</div>
                      </div>
                    </td>
                    <td>
                      <textarea
                        onChange={(e) => {
                          setPhysicalActivities(e.target.value);
                        }}
                        value={physicalActivities}
                        style={{ overflow: "hidden" }}
                        className="justify-center items-start py-1.5 pr-14 w-full rounded border-black border-solid shadow-sm border-[0.5px]  max-md:pr-5"
                      />{" "}
                    </td>
                  </tr>
                  <tr className="flex gap-5 justify-between mb-3 w-full">
                    <td className="flex gap-5 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">Self-Monitoring</div>
                      </div>
                    </td>
                    <td>
                      <textarea
                        onChange={(e) => {
                          setSelfMonitoring(e.target.value);
                        }}
                        value={selfMonitoring}
                        style={{ overflow: "hidden" }}
                        className="justify-center items-start py-1.5 pr-14 w-full rounded border-black border-solid shadow-sm border-[0.5px]  max-md:pr-5"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
                <table className="w-full  text-xs">
                  <tbody>
                    {date?.map((item, index) => (
                      <tr
                        key={index}
                        className="flex gap-5 justify-between mb-3 w-full"
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
                          {item.variable === "*Start Date" ||
                          item.variable === "*End Date" ? (
                            <input
                              type="date"
                              className={`grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap border-black border-[0.5px] rounded shadow-sm 
                                ${saveClicked && item.variable === "*Start Date" && !startDate && 'border-red-500 border-[0.5px]'}
                                ${saveClicked && item.variable === "*End Date" && !endDate && 'border-red-500 border-[0.5px]'}
                                ${!saveClicked && 'border-black border-[0.5px]'}
                              `}
                              value={
                                item.variable === "*Start Date"
                                  ? startDate
                                  : endDate
                              }
                              onChange={(e) => {
                                item.variable === "*Start Date"
                                  ? setStartDate(e.target.value)
                                  : setEndDate(e.target.value);
                              }}
                            />
                          ) : (
                            "not valid"
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
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-start justify-between mt-5">
          <Button variant="outline" onClick={setCurrentScreen}>
            <div className="flex gap-0.5 justify-between items-center">
              <Image
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
                className="w-3 h-3 aspect-square"
                alt="Back Arrow"
              />
              <div className="text-xs">BACK</div>
            </div>
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              createCompactActivity();
              
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
