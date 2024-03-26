import Image from "next/image";
import * as React from "react";
import BackButton from "./sub_components/BackButton";
import { useState, useEffect } from "react";
import ViewSystolic from "./sub_components/viewSystolic";
import ViewHeartRate from "./sub_components/viewHeartRate";
import ViewBiometrics from "./sub_components/viewBiometrics";
import {
  getVitalsAndBiometricsDoctor,
  getBiometricsDoctor,
} from "../../../../../../lib/backend/patient/vitalsAndBiometrics/vitalsAndBiometrics";
export default function Vitals({ patientId }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [vitalsAndBio, setVitalsAndBio] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getVitalsAndBiometricsDoctor(patientId);
      setVitalsAndBio(data);
      console.log(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const bio = await getBiometricsDoctor(patientId);
      console.log(bio);
      setSampleData(bio);
    };
    fetchData();
  }, []);

  const handleVisitClick = () => {
    setCurrentPage(currentPage + 1);
  };
  const [sampleData, setSampleData] = useState({
    height: [],
    weight: [],
    bmi: [],
  });
  const vitals = [
    {
      date: "2023-12-01",
      systolic: "110",
      diastolic: "90",
      heartrate: "60",
      height: "180",
      weight: "70",
      bmi: "50",
    },
    {
      date: "2024-02-15",
      systolic: "120",
      diastolic: "90",
      heartrate: "60",
      height: "180",
      weight: "70",
      bmi: "50",
    },
    {
      date: "2023-5-25",
      systolic: "110",
      diastolic: "90",
      heartrate: "60",
      height: "180",
      weight: "70",
      bmi: "50",
    },
    {
      date: "2024-08-01",
      systolic: "120",
      diastolic: "90",
      heartrate: "60",
      height: "180",
      weight: "70",
      bmi: "60",
    },
  ];

  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
  ];

  const variableNames = [
    "Systolic Blood Pressure",
    "Diastolic Blood Pressure",
    "Heart Rate",
    "Height (cm)",
    "Weight (cm)",
    "Body Mass Index",
  ];

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
  const properties = Object.keys(vitals[0]).filter(
    (property) => property !== "date"
  );

  return (
    <>
      {currentPage === 0 && (
        <div className="w-full max-w-full text-black">
          <div className="flex justify-between">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-2 max-md:ml-1 max-md:mt-10">
              PATIENT VITALS
              <div className="flex items-center justify-between">
                <span className="text-black text-base leading-5">
                  Rendering Options:
                </span>
                <select className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-xs text-gray-500 font-normal">
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                </select>
                <span className="ml-2 text-black text-base text-xs leading-5 font-normal">
                  Appointments
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <span className="flex items-center gap-1 px-1 py-1 mt-10 rounded-md border-[0.5px] border-solid border-black font-normal mr-2">
                <Image
                  alt="picture"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/872489d37c6f07090c71fb194a8c077334f5ee8d7e865b4e470f49f5a27b95ba?apiKey=66e07193974a40e683930e95115a1cfd&"
                  className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                />
                <div className="text-black text-xs leading-5 self-center whitespace-nowrap">
                  FILTER
                </div>
              </span>
              <span className="flex items-center gap-1 px-1 py-1 mt-10 rounded-md border-[0.5px] border-solid border-black font-normal">
                <Image
                  alt="picture"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/49eeb01b15c87289299d3123ede7ccfbf333d278cb9ddfc7f5674a94c5d52e26?apiKey=66e07193974a40e683930e95115a1cfd&"
                  className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                />
                <div className="text-black text-xs leading-5 self-center">
                  SORT
                </div>
              </span>
            </div>
          </div>

          <a
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
          </a>

          <div className="flex max-w-full pt-4 pb-8">
            <div
              id="col"
              className="w-[27%] max-w-[27%] min-w-[27%] flex flex-col gap-3 pr-4"
            >
              <div className="h-6 max-h-6"></div>
              {vitalsName.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-small font-bold leading-5 h-6 max-h-6 flex gap-1 items-center justify-start"
                >
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={vitalsImages[index]}
                    className="w-5 mr-4"
                  />
                  {item}
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-full flex flex-row gap-3 overflow-x-auto"
            >
              {Object.keys(vitalsAndBio).map((key, index) => (
                <div key={index} className="h-6 max-h-6 max-w-[10rem] w-[10rem] flex flex-col gap-3 items-center min-w-[10rem]">
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {key}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["systolic"].valueQuantity.value ?? "-"}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["diastolic"].valueQuantity.value ?? "-"}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["heartRate"].valueQuantity.value ?? "-"}
                  </div>
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-[20%] max-w-[20%] min-w-[20%] flex flex-col gap-3 items-end"
            >
              <div className="h-6 max-h-6"></div>
              {vitalsName.map((item, index) => (
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
            <a
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
            </a>
          </div>

          <div className="flex max-w-full pt-4 pb-8">
            <div
              id="col"
              className="w-[27%] max-w-[27%] min-w-[27%] flex flex-col gap-3 pr-4"
            >
              <div className="h-6 max-h-6"></div>
              {biometricsName.map((item, index) => (
                <div
                  key={index}
                  className="text-black text-small font-bold leading-5 h-6 max-h-6 flex gap-1 items-center justify-start"
                >
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={biometricsImages[index]}
                    className="w-5 mr-4"
                  />
                  {item}
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-full flex flex-row gap-3 overflow-x-auto"
            >
              {Object.keys(vitalsAndBio).map((key, index) => (
                <div key={index} className="h-6 max-h-6 max-w-[10rem] w-[10rem] flex flex-col gap-3 items-center min-w-[10rem]">
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {key}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["height"].valueQuantity.value ?? "-"}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["weight"].valueQuantity.value ?? "-"}
                  </div>
                  <div className="text-black text-small font-bold leading-5 px-4 h-6 max-h-6 flex gap-1 items-center">
                    {vitalsAndBio[key]["bmi"].valueQuantity.value ?? "-"}
                  </div>
                </div>
              ))}
            </div>
            <div
              id="col"
              className="w-[20%] max-w-[20%] min-w-[20%] flex flex-col gap-3 items-end"
            >
              <div className="h-6 max-h-6"></div>
              {biometricsName.map((item, index) => (
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

          <BackButton />
        </div>
      )}

      {currentPage === 2 && (
        <ViewSystolic
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientId={patientId}
        />
      )}

      {currentPage === 3 && (
        <ViewHeartRate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientId={patientId}
        />
      )}

      {currentPage === 4 && selectedMetric && (
        <ViewBiometrics
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          defaultMetric={selectedMetric} // Pass selected metric as prop
          sampleData={sampleData}
        />
      )}
    </>
  );
}
