// store.js
const { create } = require("zustand");
const { persist } = require("zustand/middleware");

const useHRNav = create((set) => ({
	selected: "Master Data",
	setSelected: (item) => set(() => ({ selected: item })),
}));

const useCPNav = create((set) => ({
	selected: "Care Plans",
	setSelected: (item) => set(() => ({ selected: item })),
}));

const useUserInfo = create(
	persist(
		(set) => ({
			email: "",
			setEmail: (item) => set(() => ({ email: item })),
			password: "",
			setPassword: (item) => set(() => ({ password: item })),
		}),
		{
			name: "ENDO_TRACKER_USER_INFO",
		}
	)
);

const useDoctorInfo = create(
	persist(
		(set) => ({
			doctor_license: {
				license_number: "0",
			},
			setDoctor_license: (item) => set(() => ({ doctor_license: item })),
			last_name: "",
			setLast_name: (item) => set(() => ({ last_name: item })),
			first_name: "",
			setFirst_name: (item) => set(() => ({ first_name: item })),
			specialization_id: 1,
			setSpecialization_id: (item) => set(() => ({ specialization_id: item })),
		}),
		{
			name: "ENDO_TRACKER_DOCTOR_INFO",
		}
	)
);

const usePatientInfo = create(
	persist(
		(set) => ({
			personal_information: {
				last_name: "",
				setLastName: (item) => set(() => ({ last_name: item })),
				first_name: "",
				setFirstName: (item) => set(() => ({ first_name: item })),
				contact_number: "",
				setFirstName: (item) => set(() => ({ contact_number: item })),
				gender: "",
				setFirstName: (item) => set(() => ({ gender: item })),
			},
		}),
		{
			name: "ENDO_TRACKER_PATIENT_INFO",
		}
	)
);

module.exports = { useHRNav, useCPNav, useUserInfo, useDoctorInfo, usePatientInfo };
