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
  setReviewOfSystems: (systems) => set({ reviewOfSystems: systems }),
  signsAndSymptoms: "",
  setSignsAndSymptoms: (symptoms) => set({ signsAndSymptoms: symptoms }),
  otherConcerns: "",
  setOtherConcerns: (concerns) => set({ otherConcerns: concerns }),
  initialDiagnosis: "",
  setInitialDiagnosis: (initialDiagnosis) => set({ initialDiagnosis }), 
  finalDiagnosis: "",
  setFinalDiagnosis: (finalDiagnosis) => set({ finalDiagnosis }),
}));

export default clinicVisitStore;
