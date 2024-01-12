// store.ts
import { create } from 'zustand';

type HRNav = {
  selected: string;
  setSelected: (item: string) => void;
};

export const useHRNav = create<HRNav>((set) => ({
  selected: 'Master Data',
  setSelected: (item: string) => set(() => ({ selected: item })),
}));
