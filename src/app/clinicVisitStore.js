import { create } from 'zustand';

const clinicVisitStore = create((set) => ({
  currentScreen: 0,
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  clinicDate: new Date().toISOString().split('T')[0],
  setClinicDate: (date) => set({ clinicDate: date }),
  suggestedDate: "",
  setSuggestedDate: (date) => set({ suggestedDate: date }),
  reviewOfSystems: {
    fever: false,
    weightLoss: false,
    poorAppetite: false,
    fatigue: false,
  },
  setReviewOfSystems: (systems) => set((state) => ({ ...state, reviewOfSystems: systems })),
  signsAndSymptoms: "",
  setSignsAndSymptoms: (symptoms) => set({ signsAndSymptoms: symptoms }),
  otherReviewOfSystems: "",
  setOtherReviewOfSystems: (other) => set({ otherReviewOfSystems: other }),
  otherConcerns: "",
  setOtherConcerns: (concerns) => set({ otherConcerns: concerns }),
  initialDiagnosis: "",
  setInitialDiagnosis: (initialDiagnosis) => set({ initialDiagnosis }), 
  finalDiagnosis: "",
  setFinalDiagnosis: (finalDiagnosis) => set({ finalDiagnosis }),
  vitals: {
    height: null,
    weight: null,
    bmi: null,
    systolic: null,
    diastolic: null,
    heartRate: null,
  },
  setVitals: (newVitals) => set((state) => ({
    vitals: { ...state.vitals, ...newVitals }
  })),
  condition: "",
  setCondition: (condition) => set({ condition }),
  doctorId: null, // Initialize doctorId
  setDoctorId: (doctorId) => set({ doctorId }), // Setter function for doctorId
  labTestName: "", // Initialize labTestName
  setLabTestName: (labTestName) => set({ labTestName }), // Setter function for labTestName
  remarks: "", // Initialize remarks
  setRemarks: (remarks) => set({ remarks }), // Setter function for remarks
  reset: () => set({
    currentScreen: 0,
    clinicDate: new Date().toISOString().split('T')[0],
    suggestedDate: "",
    reviewOfSystems: {
      fever: false,
      weightLoss: false,
      poorAppetite: false,
      fatigue: false,
    },
    signsAndSymptoms: "",
    otherReviewOfSystems: "",
    otherConcerns: "",
    initialDiagnosis: "",
    finalDiagnosis: "",
    vitals: {
      height: null,
      weight: null,
      bmi: null,
      systolic: null,
      diastolic: null,
      heartRate: null,
    },
    doctorId: null, // Reset doctorId when reset is called
    labTestName: "", // Reset labTestName when reset is called
    remarks: "", // Reset remarks when reset is called
  }),
}));

export default clinicVisitStore;
