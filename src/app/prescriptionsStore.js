import { create } from "zustand";

const usePrescriptionsStore = create((set) => ({
  currentScreen: 0,
  medications: [],
  medicationIds: [],
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setMedications: (medications) => set({ medications }),
  addMedicationId: (id) =>
    set((state) => ({ medicationIds: [...state.medicationIds, id] })),
  removeMedicationId: (id) =>
    set((state) => ({
      medicationIds: state.medicationIds.filter((medId) => medId !== id),
    })),
}));

export default usePrescriptionsStore;