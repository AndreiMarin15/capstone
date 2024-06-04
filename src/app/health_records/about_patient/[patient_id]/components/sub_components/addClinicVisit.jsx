import React from 'react';
import AddObservation from './sub_sub_components/addObservation';
import AddClinicalDiagnosis from './sub_sub_components/addClinicalDiagnosis';
import AddVitals from './sub_sub_components/addVitals';
import AddAnalysis from './sub_sub_components/addAnalysis';
import { toast } from 'react-toastify';
import uploadEncounter from "@/backend//health_records/uploadEncounter";
import useClinicVisitStore from '@/app/clinicVisitStore';

const AddClinicVisit = ({ currentPage, setCurrentPage, patientId }) => {
  const currentScreen = useClinicVisitStore(state => state.currentScreen);
  const clinicDate = useClinicVisitStore(state => state.clinicDate);
  const reviewOfSystems = useClinicVisitStore(state => state.reviewOfSystems);
  const signsAndSymptoms = useClinicVisitStore(state => state.signsAndSymptoms);
  const otherConcerns = useClinicVisitStore(state => state.otherConcerns);
  const initialDiagnosis = useClinicVisitStore(state => state.initialDiagnosis);
  const finalDiagnosis = useClinicVisitStore(state => state.finalDiagnosis);
  const vitals = useClinicVisitStore(state => state.vitals); // new
  const setCurrentScreen = useClinicVisitStore(state => state.setCurrentScreen);
  const setClinicDate = useClinicVisitStore(state => state.setClinicDate);
  const setReviewOfSystems = useClinicVisitStore(state => state.setReviewOfSystems);
  const setSignsAndSymptoms = useClinicVisitStore(state => state.setSignsAndSymptoms);
  const setOtherConcerns = useClinicVisitStore(state => state.setOtherConcerns);
  const setInitialDiagnosis = useClinicVisitStore(state => state.setInitialDiagnosis);
  const setFinalDiagnosis = useClinicVisitStore(state => state.setFinalDiagnosis);
  const setVitals = useClinicVisitStore(state => state.setVitals);

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handleBack = () => {
    setCurrentScreen(0);

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
      setCurrentScreen(0);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      {currentScreen === 0 && (
        <AddObservation
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
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
      {currentScreen === 1 && (
        <AddClinicalDiagnosis
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          patientId={patientId}
          clinicDate={clinicDate}
          setClinicDate={setClinicDate}
          initialDiagnosis={initialDiagnosis}
          setInitialDiagnosis={setInitialDiagnosis}
          finalDiagnosis={finalDiagnosis}
          setFinalDiagnosis={setFinalDiagnosis}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {currentScreen === 2 && (
        <AddVitals
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          clinicDate={clinicDate}
          setClinicDate={setClinicDate}
          vitals={vitals} // pass vitals state
          setVitals={setVitals} // pass setVitals function
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {currentScreen === 3 && (
        <AddAnalysis
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          handleSave={handleSave}
          handleBack={handleBack}
        />
      )}
    </>
  );
};

export default AddClinicVisit;
