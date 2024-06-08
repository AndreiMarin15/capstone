import React from 'react';
import AddObservation from './sub_sub_components/addObservation';
import AddClinicalDiagnosis from './sub_sub_components/addClinicalDiagnosis';
import AddVitals from './sub_sub_components/addVitals';
import AddAnalysis from './sub_sub_components/addAnalysis';
import { toast } from 'react-toastify';
import useClinicVisitStore from '@/app/clinicVisitStore';
import RequestLabTest from './requestLabTest';
import doctor from "@/backend//health_records/doctor";
import uploadEncounter from "@/backend//health_records/uploadEncounter";
import { healthRecords } from "@/backend//health_records/health_records";


const AddClinicVisit = ({ currentPage, setCurrentPage, patientId, fetchEncounters}) => {
  const currentScreen = useClinicVisitStore(state => state.currentScreen);
  const clinicDate = useClinicVisitStore(state => state.clinicDate);
  const reviewOfSystems = useClinicVisitStore(state => state.reviewOfSystems);
  const signsAndSymptoms = useClinicVisitStore(state => state.signsAndSymptoms);
  const otherConcerns = useClinicVisitStore(state => state.otherConcerns);
  const initialDiagnosis = useClinicVisitStore(state => state.initialDiagnosis);
  const finalDiagnosis = useClinicVisitStore(state => state.finalDiagnosis);
  const vitals = useClinicVisitStore(state => state.vitals);
  const doctorId = useClinicVisitStore(state => state.doctorId); 
  const suggestedDate = useClinicVisitStore(state => state.suggestedDate);
  const condition = useClinicVisitStore(state => state.condition);

  const setCurrentScreen = useClinicVisitStore(state => state.setCurrentScreen);
  const setClinicDate = useClinicVisitStore(state => state.setClinicDate);
  const setReviewOfSystems = useClinicVisitStore(state => state.setReviewOfSystems);
  const setSignsAndSymptoms = useClinicVisitStore(state => state.setSignsAndSymptoms);
  const setOtherConcerns = useClinicVisitStore(state => state.setOtherConcerns);
  const setInitialDiagnosis = useClinicVisitStore(state => state.setInitialDiagnosis);
  const setFinalDiagnosis = useClinicVisitStore(state => state.setFinalDiagnosis);
  const setVitals = useClinicVisitStore(state => state.setVitals);
  const setDoctorId = useClinicVisitStore(state => state.setDoctorId);
  const setSuggestedDate = useClinicVisitStore(state => state.setSuggestedDate);
  const setCondition = useClinicVisitStore(state => state.setCondition);

  React.useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        console.log(doctorInfo)
        setDoctorId(doctorInfo.fullName);
        
      } catch (error) {
        console.error('Error fetching doctorId:', error);
      }
    };

    fetchDoctorId();
  }, [setDoctorId]);



  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handleBack = () => {
    setCurrentScreen(0);

  };

  const handleSave = async () => {
    try {
      // Fetch necessary doctor information
      const doctorInfo = await doctor.getDoctorByCurrentUser();
  
      // Fetch patient data
      const patientData = await healthRecords.getPatientData(patientId);
  
      // Construct contained array with observations
      const contained = [
        {
          id: "reviewOfSystems",
          code: {
            coding: [
              {
                code: "8687-6",
                system: "http://loinc.org",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: JSON.stringify(reviewOfSystems), // Serialize to JSON string
          resource_type: "Observation",
        },
        {
          id: "signsAndSymptoms",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: signsAndSymptoms,
          resource_type: "Observation",
        },
        {
          id: "otherConcerns",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: otherConcerns,
          resource_type: "Observation",
        },
        {
          id: "initialDiagnosis",
          code: {
            coding: [
              {
                code: "YOUR_CODE", // Replace with appropriate code
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: initialDiagnosis,
          resource_type: "Observation",
        },
        {
          id: "finalDiagnosis",
          code: {
            coding: [
              {
                code: "YOUR_CODE", // Replace with appropriate code
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: finalDiagnosis,
          resource_type: "Observation",
        },
        {
          id: "suggestedNextVisit",
          code: {
            coding: [
              {
                code: "",
                system: "",
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: suggestedDate,
          resource_type: "Observation",
        },
       
        {
          id: "height",
          code: {
            coding: [
              {
                code: "YOUR_HEIGHT_CODE", // Replace with appropriate code for height
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "cm",
            value: vitals.height,
          },
          resource_type: "Observation",
        },
        {
          id: "weight",
          code: {
            coding: [
              {
                code: "YOUR_WEIGHT_CODE", // Replace with appropriate code for weight
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "kg",
            value: vitals.weight,
          },
          resource_type: "Observation",
        },
        {
          id: "bmi",
          code: {
            coding: [
              {
                code: "YOUR_BMI_CODE", // Replace with appropriate code for BMI
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "kg/m2",
            value: vitals.bmi,
          },
          resource_type: "Observation",
        },
        {
          id: "systolic",
          code: {
            coding: [
              {
                code: "YOUR_SYSTOLIC_CODE", // Replace with appropriate code for systolic
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "mmHg",
            value: vitals.systolic,
          },
          resource_type: "Observation",
        },
        {
          id: "diastolic",
          code: {
            coding: [
              {
                code: "YOUR_DIASTOLIC_CODE", // Replace with appropriate code for diastolic
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "mmHg",
            value: vitals.diastolic,
          },
          resource_type: "Observation",
        },
        {
          id: "heartRate",
          code: {
            coding: [
              {
                code: "YOUR_HEART_RATE_CODE", // Replace with appropriate code for heart rate
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueQuantity: {
            unit: "beats/minute",
            value: vitals.heartRate,
          },
          resource_type: "Observation",
        },
        {
          id: "condition",
          code: {
            coding: [
              {
                code: "YOUR_CONDITION_CODE", // Replace with appropriate code for condition
                system: "http://example.org", // Replace with appropriate system
              },
            ],
          },
          subject: {
            type: "Patient",
            reference: patientData.id,
          },
          participant: {
            type: "Doctor",
            actor: doctorInfo.fullName,
            license_id: doctorInfo.license,
          },
          valueString: condition,
          resource_type: "Observation",
        },
      ];
  
      // Construct encounter data object with clinicDate
      const dataToSave = {
        id: "example",
        period: {
          start: clinicDate,
        },
        participant: {
          type: "Doctor",
          actor: doctorInfo.fullName,
          license: doctorInfo.license,
        },
        subject: {
          type: "Patient",
          reference: patientData.id,
        },
        contained: contained,
        resource_type: "Encounter",
      };
  
      // Upload encounter data
        await uploadEncounter(dataToSave);
      toast.success("Clinic Visit Added", {
        position: "top-left",
        theme: "colored",
        autoClose: 2000,
      });
      setCurrentScreen(0);
      fetchEncounters();
      setCurrentPage(0);
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
       clinicDate={clinicDate} // Pass clinicDate
       setClinicDate={setClinicDate} // Pass setClinicDate
       reviewOfSystems={reviewOfSystems} // Pass reviewOfSystems
       setReviewOfSystems={setReviewOfSystems} // Pass setReviewOfSystems
       signsAndSymptoms={signsAndSymptoms} // Pass signsAndSymptoms
       setSignsAndSymptoms={setSignsAndSymptoms} // Pass setSignsAndSymptoms
       otherConcerns={otherConcerns} // Pass otherConcerns
       setOtherConcerns={setOtherConcerns} // Pass setOtherConcerns
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
          suggestedDate={suggestedDate}
          setSuggestedDate={setSuggestedDate}
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          clinicDate={clinicDate}
          setClinicDate={setClinicDate}
          condition={condition}
          setCondition={setCondition}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSave={handleSave}
        />
      )}
    {currentScreen === 4 && (
        <RequestLabTest
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          doctorId={doctorId} // Pass doctorId to RequestLabTest component
          patientId={patientId}
         
        />
      )}
    </>
  );
};


export default AddClinicVisit;
