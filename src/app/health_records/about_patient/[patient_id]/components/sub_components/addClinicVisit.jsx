import React, { useState } from 'react';
import AddObservation from './sub_sub_components/addObservation';
import AddClinicalDiagnosis from './sub_sub_components/addClinicalDiagnosis';
import AddVitals from './sub_sub_components/addVitals';
import AddAnalysis from './sub_sub_components/addAnalysis';
import { toast } from 'react-toastify';
import uploadEncounter from "@/backend//health_records/uploadEncounter";
import { getEncounters } from "@/backend//health_records/getEncounter";
import { healthRecords } from "@/backend//health_records/health_records";
import doctor from "@/backend//health_records/doctor";

const AddClinicVisit = ({ currentPage, setCurrentPage, patientId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [clinicDate, setClinicDate] = useState(new Date().toISOString().split('T')[0]);
  const [reviewOfSystems, setReviewOfSystems] = useState({
    fever: false,
    weightLoss: false,
    poorAppetite: false,
    fatigue: false,
    // Add more checkboxes as needed
  });
  const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
  const [otherConcerns, setOtherConcerns] = useState("");
  const [labTestData, setLabTestData] = useState([]);
  const [observations, setObservations] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [initialDiagnosis, setInitialDiagnosis] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");
  const [vitals, setVitals] = useState({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    height: '',
    weight: '',
    bmi: ''
  });
  const [conditionSeverity, setConditionSeverity] = useState('');

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = async () => {
    try {
      const doctorInfo = await doctor.getDoctorByCurrentUser();
      setDoctorId(doctorInfo.fullName);
      const patientData = await healthRecords.getPatientData(patientId);

      const contained = [
        // Your observations array content here
      ];

      const dataToSave = {
        id: "example",
        period: { start: clinicDate },
        participant: { type: "Doctor", actor: doctorInfo.fullName },
        subject: { type: "Patient", reference: patientData.id },
        contained: contained,
        resource_type: "Encounter",
      };

      const savedData = await uploadEncounter(dataToSave);
      toast.success("Clinic Visit Added", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
      setCurrentStep(0);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      {currentStep === 0 && (
        <AddObservation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientId={patientId}
          clinicDate={clinicDate}
          setClinicDate={setClinicDate}
          reviewOfSystems={reviewOfSystems}
          setReviewOfSystems={setReviewOfSystems}
          signsAndSymptoms={signsAndSymptoms}
          setSignsAndSymptoms={setSignsAndSymptoms}
          otherConcerns={otherConcerns}
          setOtherConcerns={setOtherConcerns}
          handleNext={handleNext}
        />
      )}
      {currentStep === 1 && (
        <AddClinicalDiagnosis
          initialDiagnosis={initialDiagnosis}
          setInitialDiagnosis={setInitialDiagnosis}
          finalDiagnosis={finalDiagnosis}
          setFinalDiagnosis={setFinalDiagnosis}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {currentStep === 2 && (
        <AddVitals
          vitals={vitals}
          setVitals={setVitals}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <AddAnalysis
          conditionSeverity={conditionSeverity}
          setConditionSeverity={setConditionSeverity}
          handleSave={handleSave}
          handleBack={handleBack}
        />
      )}
    </>
  );
};

export default AddClinicVisit;
