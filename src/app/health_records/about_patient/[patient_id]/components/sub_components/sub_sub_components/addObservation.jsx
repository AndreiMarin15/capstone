import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import BackButton from "../BackButton";
import useClinicVisitStore from '@/app/clinicVisitStore';
import { toast } from 'react-toastify';

export default function AddObservation({
  currentScreen,
  setCurrentScreen,
  currentPage,
  setCurrentPage,
  handleNext,
}) {
  const clinicDate = useClinicVisitStore(state => state.clinicDate);
  const setClinicDate = useClinicVisitStore(state => state.setClinicDate);
  const signsAndSymptoms = useClinicVisitStore(state => state.signsAndSymptoms);
  const setSignsAndSymptoms = useClinicVisitStore(state => state.setSignsAndSymptoms);
  const otherConcerns = useClinicVisitStore(state => state.otherConcerns);
  const setOtherConcerns = useClinicVisitStore(state => state.setOtherConcerns);
  const reviewOfSystemsStore = useClinicVisitStore(state => state.reviewOfSystems);
  const otherReviewOfSystems = useClinicVisitStore(state => state.otherReviewOfSystems);
  const setOtherReviewOfSystems = useClinicVisitStore(state => state.setOtherReviewOfSystems);
  const labTestName = useClinicVisitStore(state => state.labTestName);

  const [reviewOfSystems, setReviewOfSystems] = useState(reviewOfSystemsStore);
  const [errorStyles, setErrorStyles] = useState({
    clinicDate: false,
    reviewOfSystems: false,
    signsAndSymptoms: false,
  });

  // useEffect to initialize clinicDate and reviewOfSystems
  useEffect(() => {
    setClinicDate(new Date().toISOString().split("T")[0]);

    const initialReviewOfSystems = {};
    const storedReviewOfSystems = useClinicVisitStore.getState().reviewOfSystems;

    if (Object.keys(storedReviewOfSystems).length !== 0) {
      fields
        .filter(item => item.type === "checkbox")
        .forEach(item => {
          item.checkboxLists.forEach(category => {
            category.forEach(checkbox => {
              initialReviewOfSystems[checkbox.name] = storedReviewOfSystems[checkbox.name] || false;
            });
          });
        });
    }

    setReviewOfSystems(initialReviewOfSystems);
  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (e, name) => {
    const updatedReviewOfSystems = {
      ...reviewOfSystems,
      [name]: e.target.checked
    };
    setReviewOfSystems(updatedReviewOfSystems);

    // Update reviewOfSystems in Zustand store
    useClinicVisitStore.setState({ reviewOfSystems: updatedReviewOfSystems });
  };

  // Function to reset reviewOfSystems to initial state
  const resetReviewOfSystems = () => {
    const reset = {};
    fields
      .filter(item => item.type === "checkbox")
      .forEach(item => {
        item.checkboxLists.forEach(category => {
          category.forEach(checkbox => {
            reset[checkbox.name] = false;
          });
        });
      });
    setReviewOfSystems(reset);
  };

  // Function to validate fields
  const validateFields = () => {
    const errors = {
      clinicDate: !clinicDate,
      reviewOfSystems: !Object.keys(reviewOfSystems).length,
      signsAndSymptoms: !signsAndSymptoms,
    };

    setErrorStyles(errors);
    return !Object.values(errors).some((error) => error);
  };

  // useEffect to log symptoms and concerns
  useEffect(() => {
    console.log("Signs and Symptoms:", signsAndSymptoms);
    console.log("Other Concerns:", otherConcerns);
    console.log("Review of Systems:", reviewOfSystems);
  }, [signsAndSymptoms, otherConcerns, reviewOfSystems]);

  // Your fields array definition
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
      variable: "*Signs and Symptoms",
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
      type: "checkbox",
      checkboxLists: [
        // Category 1: Fever, Weight Loss, Poor Appetite, Fatigue
        [
          { name: "Fever", value: "Fever" },
          { name: "Weight Loss", value: "Weight Loss" },
          { name: "Poor Appetite", value: "Poor Appetite" },
          { name: "Fatigue", value: "Fatigue" },
        ],
        // Category 2: Heart Palpitations, Shortness of Breath, Chest Pain
        [
          { name: "Heart Palpitations", value: "Heart Palpitations" },
          { name: "Shortness of Breath", value: "Shortness of Breath" },
          { name: "Chest Pain", value: "Chest Pain" },
        ],
        // Category 3: Abdominal Pain, Nausea, Vomiting, Diarrhea
        [
          { name: "Abdominal Pain", value: "Abdominal Pain" },
          { name: "Nausea", value: "Nausea" },
          { name: "Vomiting", value: "Vomiting" },
          { name: "Diarrhea", value: "Diarrhea" },
        ],
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

  // Function to handle "NEXT" button click
  const handleNextClick = () => {
    if (validateFields()) {
      handleNext();
    } else {
      // Set error styles for empty fields
      toast.error("Please Fill In All Required Fields", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
      const newErrorStyles = {
        clinicDate: !clinicDate,
        reviewOfSystems: !Object.keys(reviewOfSystems).length,
        signsAndSymptoms: !signsAndSymptoms,
      };
      setErrorStyles(newErrorStyles);
    }
  };

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
                  {fields.map((item, index) => (
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
                        {item.type === "date" && (
                          <input
                            type="date"
                            value={item.value}
                            onChange={item.onChange}
                            className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[40%]`}
                            style={
                              errorStyles.clinicDate
                                ? { borderColor: "red", borderWidth: "2px" }
                                : {}
                            }
                          />
                        )}
                        {item.type === "textarea" && (
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
                                    ...errorStyles.signsAndSymptoms,
                                    borderColor: "red",
                                    borderWidth: "2px",
                                  }
                                  : {}),
                            }}
                            wrap="soft"
                          />
                        )}
                      {item.type === "checkbox" && (
                          <div className="grid grid-cols-3">
                            {item.checkboxLists.map((category, catIndex) => (
                              <div key={`category_${catIndex}`}>
                                <span>
                                  {catIndex === 0 ? "General" : catIndex === 1 ? "Cardiovascular" : "Gastrointestinal"}
                                </span>
                                {category.map((checkbox, checkboxIndex) => (
                                  <div key={`checkbox_${checkboxIndex}`} className="">
                                    <label className="inline-flex items-center">
                                      <input
                                        type="checkbox"
                                        name={checkbox.name}
                                        checked={reviewOfSystems[checkbox.name]}
                                        onChange={(e) => handleCheckboxChange(e, checkbox.name)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                      />
                                      <span className="ml-2">{checkbox.value}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            ))}
                            <textarea
                              placeholder="Other"
                              name="otherReviewOfSystems"
                              value={otherReviewOfSystems}
                              onChange={(e) => setOtherReviewOfSystems(e.target.value)}
                              className="grow justify-center items-start mt-5 py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]"
                              style={{ fontSize: "12px", height: "auto", whiteSpace: "pre-wrap" }}
                              wrap="soft"
                            />
                          </div>
                        )}
                        {item.type === "button" && (
                          <Button className="w-[80px]" onClick={item.saveFunction}>
                            Request
                          </Button>
                        )}
                        {item.type === "label" && (
                          <div>{item.value}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-5">
              <BackButton
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                resetReviewOfSystems={resetReviewOfSystems} // Pass the resetReviewOfSystems function
              />
              <div>
                <Button onClick={handleNextClick}>NEXT</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
