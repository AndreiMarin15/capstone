import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/router"; // Corrected import path
import { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import LabTests from "../../labTestsDashboard";
import ClinicalDiagnosis from "./addClinicalDiagnosis";
import RequestLab from "../requestLabTest";
import useClinicVisitStore from "@/app/clinicVisitStore";
import { getMostRecentConditionObservations } from "@/backend/health_records/getObservation";

export default function AddAnalysis({
    currentScreen,
    setCurrentScreen,
    currentPage,
    setCurrentPage,
    patientId,
    handleNext,
    handleBack,
    handleSave,
}) {
    const clinicDate = useClinicVisitStore((state) => state.clinicDate);
    const setClinicDate = useClinicVisitStore((state) => state.setClinicDate);
    const condition = useClinicVisitStore((state) => state.condition);
    const setCondition = useClinicVisitStore((state) => state.setCondition);

    const [conditionOptions, setConditionOptions] = useState([
        // Define default condition options
        {
            value: "Patient's condition necessitates regular monitoring and follow-up appointments.",
            label: "Patient's condition necessitates regular monitoring and follow-up appointments.",
        },
        {
            value: "Patient's condition is stable and minimal monitoring required.",
            label: "Patient's condition is stable and minimal monitoring required.",
        },
        {
            value: "Patient's condition is critical and requires immediate attention or intervention.",
            label: "Patient's condition is critical and requires immediate attention or intervention.",
        },
    ]);

    const [selectedCondition, setSelectedCondition] = useState("");

    useEffect(() => {
		const fetchRecentCondition = async () => {
			try {
				const recentCondition = await getMostRecentConditionObservations(patientId);
				if (recentCondition && recentCondition.length > 0) {
					const recentConditionValue = recentCondition[0]?.resource.valueString;
					console.log("Recent condition value:", recentConditionValue);
					setSelectedCondition(recentConditionValue);
					setCondition(recentConditionValue);
					const match = conditionOptions.find(option => option.label === recentConditionValue);
					console.log("Match found:", match ? "Yes" : "No");
				}
			} catch (error) {
				console.error("Error fetching recent condition:", error);
			}
		};
	
		fetchRecentCondition();
	}, [patientId, conditionOptions]);

    useEffect(() => {
        // Ensure selectedCondition is updated when condition is changed in the store
        if (condition) {
            setSelectedCondition(condition);
        }
    }, [condition]);

    const handleConditionChange = (e) => {
        const newCondition = e.target.value;
        setCondition(newCondition);
    
        console.log(newCondition); // Log newCondition on change
    };

    const [errorStyles, setErrorStyles] = useState({
        clinicDate: false,
        reviewOfSystems: false,
        signsAndSymptoms: false,
    });

    const validateFields = () => {
        const errors = {
            clinicDate: !clinicDate,
            reviewOfSystems: !reviewOfSystems,
            signsAndSymptoms: !signsAndSymptoms,
        };

        setErrorStyles(errors);
        return !Object.values(errors).some((error) => error);
    };

    const reqField = {
        borderColor: "red",
        borderWidth: "2px",
        borderStyle: "solid",
    };

    let patientDataId;

    const handleCheckboxChange = (e, dataset) => {
        if (dataset in reviewOfSystems) {
            setReviewOfSystems({ ...reviewOfSystems, [dataset]: e.target.checked });
            console.log(reviewOfSystems);
            return;
        }
        setReviewOfSystems({ ...reviewOfSystems, [dataset]: true });
        console.log(reviewOfSystems);
    };

    const date = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
            variable: "Date",
            value: "",
        },
    ];

    const analysismap = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
            variable: "Patient Condition Severity",
            value: "",
        },
    ];
	console.log(JSON.stringify(selectedCondition));
    return (
        <>
            {currentScreen === 3 && (
                <>
                    <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
                        ADD CLINIC VISIT
                    </div>

                    <div className="flex w-full justify-center">
                        <Progress value={100} />
                    </div>
                    <div className="flex gap-[4rem] align-baseline">
                        <table className="max-w-fit border-spacing-y-5 border-separate">
                            <tbody className="text-xs leading-5 text-black">
                                {date.map((item, index) => (
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
                                                value={clinicDate}
                                                onChange={(e) => setClinicDate(e.target.value)}
                                                className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[120px]`}
                                                style={errorStyles.clinicDate ? { borderColor: "red", borderWidth: "2px" } : {}}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex gap-[4rem] align-baseline mt-5">
                        <table className="max-w-fit border-spacing-y-5 border-separate">
                            <tbody className="text-xs leading-5 text-black">
                                <tr>
                                    <td colSpan="3" className="font-semibold text-xs py-[20px]">
                                        CONDITION SEVERITY
                                    </td>
                                </tr>
                                {analysismap.map((item, index) => (
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
										<select
										value={selectedCondition}
										onChange={handleConditionChange}
										className="justify-center items-start pl-2 rounded border-black border-solid shadow-sm border-[0.5px] text-black"
										style={{
											fontSize: "12px",
											width: "500px",
											height: "20px",
											resize: "none",
										}}
										onClick={() => console.log(selectedCondition)}
									>
										{/* Render the selectedCondition first */}
										{selectedCondition && (
											<option key={selectedCondition} value={selectedCondition}>
												{selectedCondition.replace(/\\'/g, "'")}
											</option>
										)}
										{/* Render the remaining conditionOptions */}
										{conditionOptions
											.filter((option) => option.value !== selectedCondition)
											.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label.replace(/\\'/g, "'")}
												</option>
											))}
									</select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* BACK & SAVE BUTTON */}
                    <div className="flex justify-between items-center mt-5">
                        <BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
                        <div>
                            <Button
                                onClick={() => {
                                    handleSave(true); // Call handleSave with true to indicate saving clinic visit
                                    setCurrentPage(0);
                                }}
                            >
                                SAVE
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {currentScreen === 1 ? <ClinicalDiagnosis /> : ""}
        </>
    );
}