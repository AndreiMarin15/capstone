import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "./BackButton";
import { Button } from "@/components/ui/button";
import doctor from "@/backend//health_records/doctor";
import useClinicVisitStore from '@/app/clinicVisitStore';
import {UploadSignature} from "./uploadSignature";

export default function RequestLabTest({
  currentScreen,
  setCurrentScreen,
  patientId,
  doctorId,
  handleSaveLabTest,
}) {
  const labTestName = useClinicVisitStore(state => state.labTestName);
  const remarks = useClinicVisitStore(state => state.remarks);
  const setLabTestName = useClinicVisitStore(state => state.setLabTestName);
  const setRemarks = useClinicVisitStore(state => state.setRemarks);
  const setDoctorId = useClinicVisitStore(state => state.setDoctorId);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [labTests, setLabTests] = useState([{ labTestName: "", remarks: "" }]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const validateFields = () => {
    let valid = true;

    labTests.forEach(({ labTestName, remarks }, index) => {
      if (!labTestName) {
        valid = false;
        toast.error(`Lab Test Name ${index + 1} is required.`, {
          autoClose: 2000,
        });
      }
    });

    return valid;
  };


  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const fetchedDoctorInfo = await doctor.getDoctorByCurrentUser();
        console.log(fetchedDoctorInfo);
        setDoctorInfo(fetchedDoctorInfo); // Store doctorInfo in state
        setDoctorId(fetchedDoctorInfo.fullName);
      } catch (error) {
        console.error('Error fetching doctorId:', error);
      }
    };

    fetchDoctorId();
  }, [setDoctorId]);

  const handleSaveLabTestRequest = async () => {
    setFormSubmitted(true);
    
    if (!doctorInfo) {
      console.error("Doctor information is not available");
      return;
    }

    if (!validateFields()) {
      return;
    }

    labTests.forEach(({ labTestName, remarks }) => {
      // Pass lab test data to the handleSave function of AddClinicVisit
      handleSaveLabTest(labTestName, remarks, doctorInfo);
    });

    toast.success("Lab Tests Requested", {
      position: "top-left",
      theme: "colored",
      autoClose: 2000,
    });

    setCurrentScreen(0);
  };

  const addLabTestRow = () => {
    setLabTests([...labTests, { labTestName: "", remarks: "" }]);
  };

  const removeLabTestRow = (index) => {
    const updatedLabTests = [...labTests];
    updatedLabTests.splice(index, 1);
    setLabTests(updatedLabTests);
  };

  const labtest = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Name of Lab Test *",
      value: labTestName,
    }
  ];

  const remark = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Remarks",
      value: remarks,
    }
  ];

  if (currentScreen !== 4) {
    return null; // Do not render if currentScreen is not 4
  }

 return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        REQUEST LAB TEST
      </div>
      {/* <UploadSignature /> */}

      <div>
        <div className="flex gap-[5rem] align-baseline">
          <table className="max-w-fit border-spacing-y-7 border-separate">
            <tbody className="text-xs leading-5 text-black">
              {labTests.map((labTest, index) => (
                <tr key={index} className="h-8">
                  <td className="w-8">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[16px] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto whitespace-nowrap">
                      Lab Test Name {index + 1} *
                    </div>
                  </td>
                  <td className="border-l-[5rem] border-transparent">
                  <input
                      className={`grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 ${
                        formSubmitted && !labTest.labTestName ? "border-red-500" : ""
                      }`}
                      value={labTest.labTestName}
                      onChange={(e) => {
                        const updatedLabTests = [...labTests];
                        updatedLabTests[index].labTestName = e.target.value;
                        setLabTests(updatedLabTests);
                      }}
                    />
                  </td>
                  <td>
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?"
                      className="self-start aspect-square fill-black w-[15px] ml-10 mr-5"
                    />
                  </td>
                  <td className="text-black text-xs font-semibold leading-5 self-center my-auto">
                    Remarks
                  </td>
                  <td className="border-l-[5rem] border-transparent">
                    <input
                      className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5"
                      value={labTest.remarks}
                      onChange={(e) => {
                        const updatedLabTests = [...labTests];
                        updatedLabTests[index].remarks = e.target.value;
                        setLabTests(updatedLabTests);
                      }}
                    />
                  </td>
                  <td className="pl-20" style={{ display: 'flex', gap: '8px' }}>
                    {index === labTests.length - 1 && (
                      <Button variant="outline" onClick={addLabTestRow}>
                        Add
                      </Button>
                    )}
                    {index !== 0 && (
                      <Button variant="outline" onClick={() => removeLabTestRow(index)} style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}>
                        Remove
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="flex items-center px-8 py-1 rounded border border-sky-900 border-solid font-semibold text-sm bg-sky-900 text-white"
            onClick={handleSaveLabTestRequest}
            disabled={!doctorInfo} // Disable button until doctorInfo is available
          >
            Request
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <BackButton currentScreen={5} setCurrentScreen={setCurrentScreen} />
      </div>
    </>
  );
}