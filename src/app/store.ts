// store.ts
import { create } from "zustand";

type HRNav = {
	selected: string;
	setSelected: (item: string) => void;
};

export const useHRNav = create<HRNav>((set) => ({
	selected: "Master Data",
	setSelected: (item: string) => set(() => ({ selected: item })),
}));

type CPNav = {
	selected: string;
	setSelected: (item: string) => void;
};

export const useCPNav = create<CPNav>((set) => ({
	selected: "Care Plans",
	setSelected: (item: string) => set(() => ({ selected: item })),
}));
