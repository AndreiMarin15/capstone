"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BackButton from "./sub_components/BackButton";
import { getMasterDataDoctor } from "@/backend/patient/personal_details/master_data";
import AttendingDoctorsDashboard from "./sub_components/attendingDoctorDashboard";
import AddAttendingDoctors from "./sub_components/addAttendingDoctors";
import { currentUser } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  patientDeceased,
  isPatientDeceased,
} from "@/backend/patient/personal_details/master_data";
export default function MasterData({ patientId }) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showModal, setShowModal] = useState(false); // modal visibility
  const [status, setStatus] = useState("Living"); // modal for patient status

  const handleViewClick = () => {
    //  living as initial
    console.log(status);
    setShowModal(true); //
  };

  useEffect(() => {
    console.log("Status:", status);
  }, [status]);

  useEffect(() => {
    const checkDeceased = async () => {
      const deceased = await isPatientDeceased(patientId);
      console.log("Deceased:", deceased);
      setStatus(deceased ? "Deceased" : "Living");
    };

    checkDeceased();
  }, []);

  const [mData, setmData] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1af603f1f29245d416cded12308f14442a26e02b25f3257fb76c448339e0e368?",
      variable: "Status",
      value: (
        <Button variant="outline" onClick={handleViewClick}>
          {status}
        </Button>
      ),
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?",
      variable: "Name",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?",
      variable: "Age",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?",
      variable: "Birthday",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?",
      variable: "Gender",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/23f789239697f8a78777e02109dfca5430a50c87ad9728340db8e9d8b061ab26?",
      variable: "Education",
      value: "",
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"',
      variable: "Address",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
      variable: "Stroke in the past year",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
      variable: "Allergies",
      value: (
        <Button
          variant="outline"
          onClick={() => {
            router.push(`/health_records/about_patient/${patientId}/allergies`);
          }}
        >
          View
        </Button>
      ),
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      variable: "Attending Doctors",
      value: (
        <div className="flex items-center justify-between mr-20 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentScreen(1);
            }}
          >
            View
          </Button>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masterData = await getMasterDataDoctor(patientId);

        // Create a new array with updated values
        const updatedData = mData?.map((item) => {
          switch (item.variable) {
            case "Name":
              return { ...item, value: masterData["name"] };
            case "Age":
              return { ...item, value: masterData["age"] };
            case "Birthday":
              return { ...item, value: masterData["birthday"] };
            case "Gender":
              return { ...item, value: masterData["gender"] };
            case "Education":
              return { ...item, value: masterData["education"] };
            case "Address":
              return { ...item, value: masterData["address"] };
            case "Stroke in the past year":
              return {
                ...item,
                value:
                  masterData["stroke_in_the_past_year"] === "true"
                    ? "Yes"
                    : "No",
              };
            default:
              return item;
          }
        });

        // Set the state with the new array
        setmData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
            MASTER DATA
          </div>
          <table className="max-w-fit border-spacing-y-7 border-separate">
            {mData?.map((item) => (
              <tr key={item.variable}>
                <td className="w-5">
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={item.src}
                    className="w-5"
                  />
                </td>
                <td className="border-l-[16px] border-transparent">
                  <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                    {item.variable}
                  </div>
                </td>
                <td className="border-l-[5rem] border-transparent">
                  {typeof item.value === "string" ||
                  typeof item.value === "number" ? (
                    <div className="text-black text-sm leading-5 ml-auto">
                      {item.value}
                    </div>
                  ) : (
                    <div className="ml-auto">{item.value}</div>
                  )}
                </td>
              </tr>
            ))}
          </table>
          <div className="flex flex-col items-start justify-end text-sm font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10"></div>
          <BackButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : null}
      {currentScreen === 1 ? (
        <>
          <AttendingDoctorsDashboard
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            patientId={patientId}
          />
        </>
      ) : null}
      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Set the status of the patient
                </h3>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="living"
                    name="status"
                    value="Living"
                    checked={status === "Living"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  <label htmlFor="living">Living</label>
                  <br />
                  <input
                    type="radio"
                    id="deceased"
                    name="status"
                    value="Deceased"
                    checked={status === "Deceased"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label htmlFor="deceased">Deceased</label>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    const updateDeceased = async () => {
                      await patientDeceased(patientId, status === "Deceased");
                      console.log("Updated status to", status);
                    };

                    updateDeceased();
                    setShowModal(false);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
