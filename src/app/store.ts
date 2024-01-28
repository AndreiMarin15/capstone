// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
/* 
last_name: "",
		first_name: "",
		specialization_id: 0

*/

interface UserInfo {
	email: string;
	setEmail: (item: string) => void;

	password: string;
	setPassword: (item: string) => void;
}

export const useUserInfo = create<UserInfo>()(
	persist(
		(set) => ({
			email: "",
			setEmail: (item: string) => set(() => ({ email: item })),

			password: "",
			setPassword: (item: string) => set(() => ({ password: item })),
		}),
		{
			name: "ENDO_TRACKER_USER_INFO",
		}
	)
);

interface DoctorInfo {
	doctor_license: {
		license_number: string;
	};
	setDoctor_license: (item: { license_number: string }) => void;

	last_name: string;
	setLast_name: (item: string) => void;

	first_name: string;
	setFirst_name: (item: string) => void;

	specialization_id: number;
	setSpecialization_id: (item: number) => void;
}

export const useDoctorInfo = create<DoctorInfo>()(
	persist(
		(set) => ({
			doctor_license: {
				license_number: "0",
			},
			setDoctor_license: (item: { license_number: string }) => set(() => ({ doctor_license: item })),

			last_name: "",
			setLast_name: (item: string) => set(() => ({ last_name: item })),

			first_name: "",
			setFirst_name: (item: string) => set(() => ({ first_name: item })),

			specialization_id: 1,
			setSpecialization_id: (item: number) => set(() => ({ specialization_id: item })),
		}),
		{ name: "ENDO_TRACKER_DOCTOR_INFO" }
	)
);

// export const useDoctorInfo = create<DoctorInfo>((set) => ({
// 	email: "",
// 	setEmail: (item: string) => set(() => ({ email: item })),

// 	password: "",
// 	setPassword: (item: string) => set(() => ({ password: item })),

// 	doctor_license: {},
// 	setDoctor_license: (item: {}) => set(() => ({ doctor_license: item })),

// 	last_name: "",
// 	setLast_name: (item: string) => set(() => ({ last_name: item })),

// 	first_name: "",
// 	setFirst_name: (item: string) => set(() => ({ first_name: item })),

// 	specialization_id: 1,
// 	setSpecialization_id: (item: number) => set(() => ({ specialization_id: item })),
// }));
