import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { retrieveMedicationsByIds } from "@/backend/health_records/getMedicationRequest";

const usePrescriptionsStore = create((set) => ({
  currentScreen: 0,
  medications: [],
  medicationIds: [],
  medicationId: null, // New state to store current medicationId
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setMedications: (medications) => set({ medications }),
  addMedicationId: (id) =>
    set((state) => ({ medicationIds: [...state.medicationIds, id] })),
  removeMedicationId: (id) =>
    set((state) => ({
      medicationIds: state.medicationIds.filter((medId) => medId !== id),
    })),
  setMedicationIds: (ids) => set({ medicationIds: ids }),
  setMedicationId: (id) => set({ medicationId: id }),
  editingMedicationId: null,
  setEditingMedicationId: (medicationId) =>
    set({ editingMedicationId: medicationId }),
  fetchMedications: async () => {
    try {
      // Destructure medicationIds from state
      const { medicationIds } = usePrescriptionsStore.getState();

      // Fetch medications based on medicationIds
      const fetchedMedications = await retrieveMedicationsByIds(medicationIds);

      // Update medications state
      set({ medications: fetchedMedications });
    } catch (error) {
      console.error("Error fetching medications:", error);
      toast.error("Failed to fetch medications.", {
        position: "top-left",
        theme: "colored",
        autoClose: 8000,
      });
    }
  },
}));

export default usePrescriptionsStore;
