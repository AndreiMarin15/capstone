import { create } from 'zustand';

const clinicVisitStore = create((set) => ({
  currentScreen: 0,
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  clinicDate: new Date().toISOString().split('T')[0],
  setClinicDate: (date) => set({ clinicDate: date }),
  reviewOfSystems: {
    fever: false,
    weightLoss: false,
    poorAppetite: false,
    fatigue: false,
  },
  setReviewOfSystems: (systems) => set((state) => ({ ...state, reviewOfSystems: systems })),
  signsAndSymptoms: "",
  setSignsAndSymptoms: (symptoms) => set({ signsAndSymptoms: symptoms }),
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
  reset: () => set({
    currentScreen: 0,
    clinicDate: new Date().toISOString().split('T')[0],
    reviewOfSystems: {
      fever: false,
      weightLoss: false,
      poorAppetite: false,
      fatigue: false,
    },
    signsAndSymptoms: "",
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
    condition: "",
    doctorId: null, // Reset doctorId when reset is called
  }),
}));

export default clinicVisitStore;
