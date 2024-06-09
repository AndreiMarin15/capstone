import {create} from 'zustand';

const useLabTestStore = create((set) => ({
  labTests: [],
  currentScreen: 0,
  observationId: null,
  setLabTests: (labTests) => set({ labTests }),
  setCurrentScreen: (currentScreen) => set({ currentScreen }),
  setObservationId: (observationId) => set({ observationId }),
  reset: () => set({ labTests: [], currentScreen: 0, observationId: null }),
}));

export default useLabTestStore;