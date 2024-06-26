import Image from "next/image";
import * as React from "react";
import BackButton from "./sub_components/BackButton";
import { useState, useEffect } from "react";
import ViewSystolic from "./sub_components/viewSystolic";
import ViewHeartRate from "./sub_components/viewHeartRate";
import ViewBiometrics from "./sub_components/viewBiometrics";
import AddVitals from "./sub_components/addVitals";
import {getEncounterByPatientId} from "@/backend/health_records/getEncounter";
import {getSpecificMeasurementsObservations} from "@/backend/health_records/getObservation";
import { getPatientRawData } from "@/backend/patient/personal_details/master_data";
import { Button } from "@/components/ui/button";

export default function Vitals() {
  const [currentPage, setCurrentPage] = useState(0);
  const [vitalsAndBio, setVitalsAndBio] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [matchedObservations, setMatchedObservations] = useState([]);
	const [chartValues, setChartValues] = useState({
		systolic: [],
		diastolic: [],
		heartRate: [],
		weight: [],
		bmi: [],
		height: []
	});
  const [renderingOptions, setRenderingOptions] = useState(5);
	const [latestVitalsAndBio, setLatestVitalsAndBio] = useState({});
  const [patientId, setPatientId] = useState("")
 

  
  const filterLatestVitalsAndBio = (options) => {
		const sortedDates = Object.keys(vitalsAndBio).sort((a, b) => new Date(b) - new Date(a));
		const latestData = sortedDates.slice(0, options).reduce((acc, key) => {
			acc[key] = vitalsAndBio[key];
			return acc;
		}, {});
		setLatestVitalsAndBio(latestData);
		console.log(latestData)
	};


 useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPatientRawData(); // Fetch patient data
        setPatientId(data.id);
        console.log(data.id)
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }

    fetchData();
  }, []);







	useEffect(() => {
		filterLatestVitalsAndBio(renderingOptions);
	}, [renderingOptions, vitalsAndBio]);

	useEffect(() => {
        const fetchData = async () => {
            // Fetch encounters by patient id
            const encounterData = await getEncounterByPatientId(patientId);
            console.log(encounterData);

            // Fetch specific measurements observations
            const observationData = await getSpecificMeasurementsObservations(patientId);
            console.log(observationData);

            const matchedObservations = [];

            encounterData.forEach(encounter => {
                // Get the ids from the contained array of the encounter
                const encounterIds = encounter.resource.contained;
                const encounterStartDate = encounter.resource.period.start;

                // Filter observations that have ids matching the encounter ids
                const matchedObservationsForEncounter = observationData.filter(observation => {
                    return encounterIds.includes(observation.id);
                });

                // Add encounter start date to the matched observations
                matchedObservationsForEncounter.forEach(observation => {
                    observation.encounterStartDate = encounterStartDate;
                });

                // Group matched observations by encounter id
                matchedObservations.push({
                    encounterId: encounter.id,
                    observations: matchedObservationsForEncounter
                });
            });

            // Sort matched observations by encounter start date
            matchedObservations.sort((b, a) => new Date(b.observations[0].encounterStartDate) - new Date(a.observations[0].encounterStartDate));

            console.log(matchedObservations);
            setMatchedObservations(matchedObservations);
        };

        fetchData();
    }, [patientId]);


	

	useEffect(() => {
		if (matchedObservations.length > 0) {
			const updatedVitalsAndBio = {};
			const updatedChartValues = {
				systolic: [],
				diastolic: [],
				heartRate: [],
				weight: [],
				bmi: [],
				height: []
			};
	
			matchedObservations.forEach(({ observations }) => {
				observations.forEach(observation => {
					const { encounterStartDate, resource } = observation;
					const date = encounterStartDate.split('T')[0]; // Extract date from encounterStartDate
	
					if (!updatedVitalsAndBio[date]) {
						// Initialize object for the date if not already present
						updatedVitalsAndBio[date] = {};
					}
	
					// Extract relevant data based on observation id
					switch (resource.id) {
						case 'height':
						case 'weight':
						case 'bmi':
						case 'heartRate':
							// Check if valueQuantity exists before accessing value
							if (resource.valueQuantity && resource.valueQuantity.value !== null) {
								// Initialize an object for the resource if not already present
								if (!updatedVitalsAndBio[date][resource.id]) {
									updatedVitalsAndBio[date][resource.id] = {};
								}
								updatedVitalsAndBio[date][resource.id].value = resource.valueQuantity.value;
								updatedVitalsAndBio[date][resource.id].unit = resource.valueQuantity.unit;
								// Update chartValues with heartRate, weight, bmi, and height values
								updatedChartValues[resource.id].push({ value: resource.valueQuantity.value, date });
							}
							break;
						case 'systolic':
						case 'diastolic':
							// Check if valueQuantity exists before accessing value
							if (resource.valueQuantity && resource.valueQuantity.value !== null) {
								// Push value into the corresponding array in chartValues along with the date
								updatedChartValues[resource.id].push({ value: resource.valueQuantity.value, date });
								// Store value in vitalsAndBio under respective keys
								if (!updatedVitalsAndBio[date][resource.id]) {
									updatedVitalsAndBio[date][resource.id] = {};
								}
								updatedVitalsAndBio[date][resource.id].value = resource.valueQuantity.value;
								updatedVitalsAndBio[date][resource.id].unit = resource.valueQuantity.unit;
							}
							break;
						default:
							break;
					}
				});
			});
	
			setVitalsAndBio(updatedVitalsAndBio);
			console.log(updatedVitalsAndBio)
			setChartValues(updatedChartValues);
			console.log(updatedChartValues)
		}
	}, [matchedObservations]);


 

  const vitalsImages = [
		"https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
		"https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
		"https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
	];
	const biometricsImages = [
		"https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
		"https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
		"https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
	];
  const vitalsName = [
    "Systolic Blood Pressure",
    "Diastolic Blood Pressure",
    "Heart Rate",
  ];

  const biometricsName = ["Height (cm)", "Weight (cm)", "Body Mass Index"];


  return (
    <>
      {currentPage === 0 && (
        <div className="w-full max-w-full text-black">
          <div className="text-black text-base font-bold leading-5 mt-8 mb-2 max-md:ml-1 max-md:mt-10">
            <div className="mb-5">PATIENT VITALS</div>

            <div className="flex justify-between">
              <div>
                <span className="text-black text-xs leading-5">
                  Rendering Options:
                </span>
                <select
								className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-xs  font-normal"
								onChange={(e) => setRenderingOptions(parseInt(e.target.value))}
								defaultValue={renderingOptions.toString()}
							>
								<option value="3">3</option>
								<option value="5">5</option>
								<option value="7">7</option>
								<option value="10">10</option>
							</select>
                <span className="ml-2 text-black text-base text-xs leading-5 font-normal">
                  Appointments
                </span>
              </div>

              <div>
                <Button variant="outline" onClick={() => setCurrentPage(1)}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* <a
            href="/path/to/pdf"
            download="full_vitals_history.pdf"
            className="text-blue-500 text-xs block flex items-center"
          >
            <Image
              height={0}
              width={0}
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
              alt="icon"
              className="w-4 mr-2"
            />
            <span>Full Vitals History (.pdf)</span>
          </a> */}
          {/* TABLE */}
          <div className="flex max-w-full pt-4 pb-8">
            <div
              id="col"
              className="w-[27%] max-w-[27%] min-w-[27%] flex flex-col gap-3 pr-4"
            >
              <div className="h-6 max-h-6"></div>
              {vitalsName?.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-xs font-bold leading-5 h-6 max-h-6 flex gap-1 items-center justify-start"
                >
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={vitalsImages[index]}
                    className="w-3 mr-4"
                  />
                  {item}
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-full flex flex-row gap-3 overflow-x-auto"
            >
              {latestVitalsAndBio &&
							Object.keys(latestVitalsAndBio)
								.reverse() // Reverse the array of keys
								.map((date, index) => (
								<div
									key={index}
									className="h-6 max-h-6 max-w-[10rem] w-[10rem] flex flex-col gap-3 items-center min-w-[10rem]"
								>
									<div className="text-black text-xs font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
									{date}
									</div>
									<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
									{latestVitalsAndBio[date]["systolic"] ? latestVitalsAndBio[date]["systolic"].value : "-"}
									</div>
									<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
									{latestVitalsAndBio[date]["diastolic"] ? latestVitalsAndBio[date]["diastolic"].value : "-"}
									</div>
									<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
									{latestVitalsAndBio[date]["heartRate"] ? latestVitalsAndBio[date]["heartRate"].value : "-"}
									</div>
								</div>
								))}
            </div>
            <div
              id="col"
              className="w-[20%] max-w-[20%] min-w-[20%] flex flex-col gap-3 items-end"
            >
              <div className="h-6 max-h-6"></div>
              {vitalsName?.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-xs font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center"
                >
                  <Image
                    height={0}
                    width={0}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cae5e15030443e8c364bdc417ce4c836ffe07d1728c5f93bea511f158e4afbf?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                    alt="icon"
                    className="w-3 mr-2"
                  />
                  <button
                    className="text-blue-500 text-xs underline"
                    onClick={() => {
                      let increment = 1;
                      switch (vitalsName[index]) {
                        case "Systolic Blood Pressure":
                        case "Diastolic Blood Pressure":
                          increment = 2;
                          break;

                        case "Heart Rate":
                          increment = 3;
                          break;
                        default:
                          increment = 1;
                          break;
                      }
                      setCurrentPage(currentPage + increment);
                      console.log("%d", currentPage);
                      console.log(`View chart for ${vitalsName[index]}`);
                    }}
                  >
                    View Chart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-full text-black">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 ">
              BIOMETRICS
            </div>
            {/* <a
              href="/path/to/pdf"
              download="full_vitals_history.pdf"
              className="text-blue-500 text-xs block mb-2 flex items-center"
            >
              <Image
                height={0}
                width={0}
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                alt="icon"
                className="w-4 mr-2"
              />
              <span>Full Biometrics History (.pdf)</span>
            </a> */}
          </div>
          {/* TABLE */}
          <div className="flex max-w-full pt-4 pb-8">
            <div
              id="col"
              className="w-[27%] max-w-[27%] min-w-[27%] flex flex-col gap-3 pr-4"
            >
              <div className="h-6 max-h-6"></div>
              {biometricsName?.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-xs font-bold leading-5 h-6 max-h-6 flex gap-1 items-center justify-start"
                >
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={biometricsImages[index]}
                    className="w-3 mr-4"
                  />
                  {item}
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-full flex flex-row gap-3 overflow-x-auto"
            >
             {latestVitalsAndBio &&
								Object.keys(latestVitalsAndBio).reverse().map((date, index) => (
									<div
										key={index}
										className="h-6 max-h-6 max-w-[10rem] w-[10rem] flex flex-col gap-3 items-center min-w-[10rem]"
									>
										<div className="text-black text-xs font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
											{date}
										</div>
										<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
											{vitalsAndBio[date]["height"] ? vitalsAndBio[date]["height"].value : "-"}
											
										</div>
										<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
											{vitalsAndBio[date]["weight"] ? vitalsAndBio[date]["weight"].value : "-"} 
										</div>
										<div className="text-black text-xs font-regular leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
											{vitalsAndBio[date]["bmi"] ? vitalsAndBio[date]["bmi"].value : "-"}
										</div>
									</div>
								))
							}
            </div>
            <div
              id="col"
              className="w-[20%] max-w-[20%] min-w-[20%] flex flex-col gap-3 items-end"
            >
              <div className="h-6 max-h-6"></div>
              {biometricsName?.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center"
                >
                  <Image
                    height={0}
                    width={0}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cae5e15030443e8c364bdc417ce4c836ffe07d1728c5f93bea511f158e4afbf?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
                    alt="icon"
                    className="w-5 mr-2"
                  />
                  <button
                    className="text-blue-500 text-xs underline"
                    onClick={() => {
                      let defaultMetric;
                      switch (biometricsName[index]) {
                        case "Height (cm)":
                          defaultMetric = "height";
                          break;
                        case "Weight (cm)":
                          defaultMetric = "weight";
                          break;
                        case "Body Mass Index":
                          defaultMetric = "bmi";
                          break;
                        default:
                          defaultMetric = "height"; // Set a default metric here if necessary
                          break;
                      }
                      setSelectedMetric(defaultMetric); // Set the selected metric
                      setCurrentPage(4); // Navigate to page 4 (ViewBiometrics)
                    }}
                  >
                    View Chart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === 1 && (
        <AddVitals currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 2 && (
        <ViewSystolic
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientId={patientId}
          chartValues={chartValues}
          renderingOptions={renderingOptions}
        />
      )}

      {currentPage === 3 && (
        <ViewHeartRate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientId={patientId}
          chartValues={chartValues}
          renderingOptions={renderingOptions}
        />
      )}

      {currentPage === 4 && selectedMetric && (
        <ViewBiometrics
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          defaultMetric={selectedMetric} // Pass selected metric as prop
          chartValues={chartValues}
					renderingOptions={renderingOptions}
        />
      )}
    </>
  );
}
