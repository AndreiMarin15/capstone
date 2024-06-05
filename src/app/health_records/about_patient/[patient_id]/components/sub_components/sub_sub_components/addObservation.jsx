import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify"; // Assuming toast is imported from 'react-toastify'
import useClinicVisitStore from '@/app/clinicVisitStore';
import LabTests from "../../labTestsDashboard";
import BackButton from "../BackButton";
export default function AddObservation({
  currentScreen,
  setCurrentScreen,
  currentPage,
  setCurrentPage,
  patientId,
  handleNext
}) {
  const clinicDate = useClinicVisitStore(state => state.clinicDate);
  const setClinicDate = useClinicVisitStore(state => state.setClinicDate);

  const signsAndSymptoms = useClinicVisitStore(state => state.signsAndSymptoms);
  const setSignsAndSymptoms = useClinicVisitStore(state => state.setSignsAndSymptoms);
  const otherConcerns = useClinicVisitStore(state => state.otherConcerns);
  const setOtherConcerns = useClinicVisitStore(state => state.setOtherConcerns);
  const reviewOfSystemsStore = useClinicVisitStore(state => state.reviewOfSystems);

  // Initialize local state with Zustand store values
  const [reviewOfSystems, setReviewOfSystems] = useState(reviewOfSystemsStore);
  
  const resetReviewOfSystems = () => {
    const reset = {};
    fields
      .filter(item => item.type === "checkbox")
      .forEach(item => {
        item.checkboxList.forEach(checkbox => {
          reset[checkbox.name] = false;
        });
      });
    setReviewOfSystems(reset);
  };

  const addLabTestData = (labTestData) => {
    if (!Array.isArray(labTestData)) {
      labTestData = [labTestData];
    }

    setLabTestData([...labTestDataArray, ...labTestData]);

    const newObservations = labTestData?.map((data) => ({
      id: `labtest`,
      status: data.status,
      code: {
        coding: [
          {
            code: "YOUR_LOINC_CODE",
            system: "http://loinc.org",
          },
        ],
      },
      subject: {
        type: "Patient",
        reference: data.subject.reference,
      },
      participant: {
        type: "Doctor",
        actor: data.participant.actor,
      },
      resource_type: "Observation",
      valueQuantity: {
        valueQuantities: data.valueQuantities,
      },
      uploadedDateTime: data.dateOfUpdate,
      effectiveDateTime: data.dateOfResult,
      requestedDateTime: clinicDate,
      codeText: data.labTestName,
      imageSrc: data.base64Image,
    }));

    setObservations([...observations, ...newObservations]);

    console.log(observations);
  };





  const [errorStyles, setErrorStyles] = useState({
    clinicDate: false,
    reviewOfSystems: false,
    signsAndSymptoms: false,
  });

  const handleGoBack = () => {
    setCurrentScreen(0); // Reset currentScreen to 0
    setCurrentPage(currentPage - 1); // Update currentPage accordingly
    
    // Reset reviewOfSystems to an object with all checkboxes set to false
    const resetReviewOfSystems = {};
    fields
      .filter(item => item.type === "checkbox")
      .forEach(item => {
        item.checkboxList.forEach(checkbox => {
          resetReviewOfSystems[checkbox.name] = false;
        });
      });
    setReviewOfSystems(resetReviewOfSystems);
  };


  const validateFields = () => {
    const errors = {
      clinicDate: !clinicDate,
      reviewOfSystems: !Object.keys(reviewOfSystems).length,
      signsAndSymptoms: !signsAndSymptoms,
    };

    setErrorStyles(errors);
    return !Object.values(errors).some((error) => error);
  };

  useEffect(() => {
    setClinicDate(new Date().toISOString().split("T")[0]);
    
    // Initialize reviewOfSystems with empty object
    const initialReviewOfSystems = {};
  
    // Retrieve reviewOfSystems from Zustand store
    const storedReviewOfSystems = useClinicVisitStore.getState().reviewOfSystems;
  
    // If storedReviewOfSystems is not empty, update initialReviewOfSystems accordingly
    if (Object.keys(storedReviewOfSystems).length !== 0) {
      fields
        .filter(item => item.type === "checkbox")
        .forEach(item => {
          item.checkboxList.forEach(checkbox => {
            initialReviewOfSystems[checkbox.name] = storedReviewOfSystems[checkbox.name] || false;
          });
        });
    }
    
    setReviewOfSystems(initialReviewOfSystems);
  }, []);

  const handleCheckboxChange = (e, name) => {
    const updatedReviewOfSystems = {
      ...reviewOfSystems,
      [name]: e.target.checked
    };
    setReviewOfSystems(updatedReviewOfSystems);
  
    // Update reviewOfSystems in Zustand store
    useClinicVisitStore.setState({ reviewOfSystems: updatedReviewOfSystems });
  };

  useEffect(() => {
    console.log("Signs and Symptoms:", signsAndSymptoms);
    console.log("OtherConcerns:", otherConcerns);
    console.log(reviewOfSystems)
  }, [signsAndSymptoms, otherConcerns]);

  const fields = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date",
      value: clinicDate,
      onChange: (e) => setClinicDate(e.target.value),
      type: "date",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Signs and Symptoms",
      name: "signsAndSymptoms",
      value: signsAndSymptoms,
      type: "textarea",
      onChange: (e) => {
        setSignsAndSymptoms(e.target.value);
        setErrorStyles({
          ...errorStyles,
          signsAndSymptoms: false,
        });
      },
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Review of Systems",
      name: "ros",
      value: "",
      type: "checkbox",
      checkboxList: [
        { name: "fever", value: "Fever" },
        { name: "weightLoss", value: "Weight Loss" },
        { name: "poorAppetite", value: "Poor Appetite" },
        { name: "fatigue", value: "Fatigue" },
      ],
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Other Concerns",
      name: "otherConcerns",
      value: otherConcerns,
      type: "textarea",
      onChange: (e) => {
        setOtherConcerns(e.target.value);
        setErrorStyles({
          ...errorStyles,
          otherConcerns: false,
        });
      },
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Request",
      name: "tests",
      type: "button",
      saveFunction: () => {
        setCurrentScreen(4);
      },
    },
  ];
    

  return (
    <>
      {currentScreen === 0 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CLINIC VISIT
          </div>
  
          <div className="flex w-full justify-center">
            <Progress value={25} />
          </div>
          <div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {fields.map((item, index) =>
                    item.type === "textarea" ? (
                      <tr key={index} className="align-top">
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
                        <td className="border-l-[5px] border-transparent">
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                            {item.variable}
                          </div>
                        </td>
                        <td className="border-l-[15px] border-transparent">
                          <textarea
                            placeholder={
                              item.variable === "Other Concerns"
                                ? "Add other concerns"
                                : "Add signs and symptoms"
                            }
                            name={item.name}
                            value={item.value}
                            onChange={item.onChange}
                            className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                            style={{
                              fontSize: "12px",
                              height: "auto",
                              whiteSpace: "pre-wrap",
                              ...(item.variable === "Review of Systems" &&
                              errorStyles.reviewOfSystems
                                ? {
                                    ...errorStyles.reviewOfSystems,
                                    borderColor: "red",
                                    borderWidth: "2px",
                                  }
                                : item.variable === "Signs and Symptoms" &&
                                  errorStyles.signsAndSymptoms
                                ? {
                                    ...errorStyles.signsAndSymptoms,                                  borderColor: "red",
                                    borderWidth: "2px",
                                  }
                                : {}),
                            }}
                            wrap="soft"
                          />
                        </td>
                      </tr>
                    ) : item.type === "checkbox" ? (
                      <tr key={index} className="align-top">
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
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <div className="flex flex-col gap-1">
                          {item.checkboxList.map((dataset, datasetIndex) => (
                            <label
                              key={datasetIndex}
                              className="inline-flex items-center"
                            >
                              <input
                                type="checkbox"
                                name={dataset.name}
                                checked={reviewOfSystems[dataset.name]} // Set checked attribute based on state
                                onChange={(e) => handleCheckboxChange(e, dataset.name)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                              />
                              <span className="ml-2">{dataset.value}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                    ) : item.type === "date" ? (
                      <tr key={index}>
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
                        <td className="border-l-[5px] border-transparent">
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                            {item.variable}
                          </div>
                        </td>
                        <td className="border-l-[15px] border-transparent">
                          <input
                            type="date"
                            value={item.value}
                            onChange={item.onChange}
                            className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]`}
                            style={
                              errorStyles.clinicDate
                                ? { borderColor: "red", borderWidth: "2px" }
                                : {}
                            }
                          />
                        </td>
                    
                      </tr>
                          ) : item.type === "button" ? (
                            <tr key={index}>
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
                              <td className="border-l-[5px] border-transparent">
                                <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                                  {item.variable}
                                </div>
                              </td>
                              <td className="border-l-[15px] border-transparent">
                                <Button
                                  className="w-[80px]"
                                
                                  onClick={item.saveFunction}
                                >
                                  Request
                                </Button>
                              </td>
                            </tr>
                          ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                </div>
   
          <div className="flex justify-between items-center mt-5">
          <BackButton
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  resetReviewOfSystems={resetReviewOfSystems} // Pass the resetReviewOfSystems function
                />
            <div>
              <Button onClick={handleNext}>NEXT</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

