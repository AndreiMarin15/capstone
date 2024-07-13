import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/app/store";
import {
  getVitalsAndBiometricsDoctor,
  getBiometricsDoctor,
} from "@/backend/patient/vitalsAndBiometrics/vitalsAndBiometrics";
import { getEncounterByPatientId } from "@/backend/health_records/getEncounter";
import { getSpecificMeasurementsObservations } from "@/backend/health_records/getObservation";
export function VitalsPDF({ patientId, patientData }) {
  const [vitalslist, setVitalslist] = useState([]);
  const [vitalsAndBio, setVitalsAndBio] = useState({});
  const pdfRef = useRef();

  const [matchedObservations, setMatchedObservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch encounters by patient id
        const encounterData = await getEncounterByPatientId(patientId);
        console.log(encounterData);

        // Fetch specific measurements observations
        const observationData =
          await getSpecificMeasurementsObservations(patientId);
        console.log("this is observatons", observationData);

        const matchedObservations = [];

        encounterData.forEach((encounter) => {
          const encounterIds = encounter.resource.contained;
          const encounterStartDate = encounter.resource.period.start;

          const matchedObservationsForEncounter = observationData.filter(
            (observation) => {
              return encounterIds.includes(observation.id);
            }
          );

          matchedObservationsForEncounter.forEach((observation) => {
            observation.encounterStartDate = encounterStartDate;
          });

          matchedObservations.push({
            encounterId: encounter.id,
            observations: matchedObservationsForEncounter,
          });
        });

        observationData.forEach((observation) => {
          if (observation.resource.effectiveDateTime) {
            observation.encounterStartDate =
              observation.resource.effectiveDateTime;
            matchedObservations.push({
              encounterId: null,
              observations: [observation],
            });
          }
        });

        matchedObservations.sort(
          (b, a) =>
            new Date(b.observations[0].encounterStartDate) -
            new Date(a.observations[0].encounterStartDate)
        );

        console.log(matchedObservations);
        setMatchedObservations(matchedObservations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId]);

  useEffect(() => {
    if (matchedObservations.length > 0) {
      const updatedVitalsAndBio = {};

      matchedObservations.forEach(({ observations }) => {
        observations.forEach((observation) => {
          const { encounterStartDate, resource } = observation;
          const date = encounterStartDate.split("T")[0]; // Extract date from encounterStartDate

          if (!updatedVitalsAndBio[date]) {
            // Initialize object for the date if not already present
            updatedVitalsAndBio[date] = {};
          }

          // Check if valueQuantity exists and has value before accessing it
          if (
            resource.valueQuantity &&
            typeof resource.valueQuantity.value !== "undefined"
          ) {
            // Update vitalsAndBio with the latest value for each resource type
            if (!updatedVitalsAndBio[date][resource.id]) {
              updatedVitalsAndBio[date][resource.id] = {};
            }
            updatedVitalsAndBio[date][resource.id].value =
              resource.valueQuantity.value;
            updatedVitalsAndBio[date][resource.id].unit =
              resource.valueQuantity.unit;
          }
        });
      });

      setVitalsAndBio(updatedVitalsAndBio);
      console.log("UPDATED PDF", updatedVitalsAndBio);
    }
  }, [matchedObservations]);

  useEffect(() => {
    console.log("I AM VITALS",vitalsAndBio);
  }, [vitalsAndBio]);


  useEffect(() => {
    if (vitalsAndBio) {
      const vitals = [];
      Object.keys(vitalsAndBio).forEach((key, index) => {
        const item = vitalsAndBio[key];
        vitals.push({
          number: index + 1,
          date: key,
          systolic:
            item.systolic?.value +
            " " +
            item.systolic?.unit,
          diastolic:
            item.diastolic?.value +
            " " +
            item.diastolic?.unit,
          heartrate:
            item.heartRate?.value +
            " " +
            item.heartRate?.unit,
          height:
            item.height?.value +
            " " +
            item.height?.unit,
          weight:
            item.weight?.value +
            " " +
            item.weight?.unit,
        });
      });
      setVitalslist(vitals);
    }
  }, [vitalsAndBio]);
  useEffect(() => {
    console.log(vitalslist);
  }, [vitalslist]);

  const downloadPDF = () => {
    const input = pdfRef.current;

    // Remove the 'hidden' class
    input.classList.remove("hidden");

    const width = input.offsetWidth;
    const height = input.offsetHeight;
    let computedWidth = width;
    let computedHeight = height;
    console.log(width, height);
    if (width < 1920 / 2) {
      computedWidth = 1920 / 2;
      // computedHeight = computedWidth / 2;
    }
    if (height < 1080 / 2) {
      computedHeight = 1080 / 2;
      // computedWidth = computedHeight * 2;
    }

    console.log(computedWidth, computedHeight);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`Vitals & Biometrics.pdf`);
      })
      .finally(() => {
        // Add the 'hidden' class back after the PDF has been downloaded
        input.classList.add("hidden");
      });
  };
  function getCurrentDateFormatted() {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  return (
    <div className="flex items-center justify-center text-center m-2">
      <Button onClick={downloadPDF}>Download</Button>
      <div
        ref={pdfRef}
        className="hidden z-[-10] absolute"
        style={{ left: "-5000px" }}
      >
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          {patientData?.personal_information?.first_name}{" "}
          {patientData?.personal_information?.last_name}
        </div>
        <div className="text-black text-center text-base  leading-5 max-md:ml-1 max-md:mt-10 mb-10">
          Vitals & Biometrics
        </div>
        <div className="flex mt-4 px-5 w-full text-sm max-md:flex-wrap max-md:max-w-full">
          <Table className="mb-5 pb-5">
            {/* To change to button */}
            {/* <TableCaption>Page 1 of 2</TableCaption> */}
            <TableCaption>
              <div className="flex items-center text-center">
                Generated by {currentUser.getState().user.first_name}{" "}
                {currentUser.getState().user.last_name} through EndoTracker on{" "}
                {getCurrentDateFormatted()}
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Systolic BP - mmHg </TableHead>
                <TableHead>Diastolic BP - mmHg</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Height</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vitalslist?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.systolic}</TableCell>
                  <TableCell>{item.diastolic}</TableCell>
                  <TableCell>{item.heartrate}</TableCell>
                  <TableCell>{item.height}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
