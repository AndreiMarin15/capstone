// prescriptionsStore.js
import {create}  from "zustand";

const usePrescriptionsStore = create((set) => ({
  currentScreen: 0,
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
}));

export default usePrescriptionsStore;