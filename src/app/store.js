// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHRNav = create((set) => ({
	selected: "Master Data",
	setSelected: (item) => set(() => ({ selected: item })),
}));

const useAllergyNav = create((set) => ({
	selected: "Drug",
	setSelected: (item) => set(() => ({ selected: item })),
}));

const useCPNav = create((set) => ({
	selected: "Care Plans",
	setSelected: (item) => set(() => ({ selected: item })),
}));

const currentUser = create(
	persist((set) => ({
		info: {},
		user: {},
		setInfo: (item) => set(() => ({ info: item })),
		setUser: (item) => set(() => ({ user: item })),
	}),
	{
		name: "ENDO_TRACKER_CURRENT_USER"
	})
);

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
			last_name: "",
			first_name: "",
			specialization_id: 1,
			gender: "",
			birthdate: "",
			years_of_practice: 1,

			setDoctor_license: (item) => set(() => ({ doctor_license: item })),

			setLast_name: (item) => set(() => ({ last_name: item })),

			setFirst_name: (item) => set(() => ({ first_name: item })),

			setSpecialization_id: (item) => set(() => ({ specialization_id: item })),

			setBirthdate: (item) => set(() => ({ birthdate: item })),

			setGender: (item) => set(() => ({ gender: item })),

			setYearsOfPractice: (item) => set(() => ({ years_of_practice: item })),
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
				philhealth_id: "",
				last_name: "",
				first_name: "",
				contact_number: "",
				gender: "",
				birthdate: "",
				street_address: "",
				city: "",
				state: "",
				postal_code: "",
				photo: "",
			},
			allergies: [],
			family_history: [],
			social_history: {
				smoker_status: "Smoker",
				cigarettes_per_day: 1,
				alcohol_consumption: "Non-Drinker",
				physical_activities: "Sedentary",
			},
			medical_history: {
				hypertensions: false,
				blood_pressure_medications: false,
				stroke: false,
				medications: [""],
				past_medical_procedures: [""],
				date_of_procedures: "",
			},
			setPersonalInformation: (item) =>
				set((state) => ({ personal_information: { ...state.personal_information, ...item } })),

			setAllergies: (item) => set((state) => ({ allergies: [{ ...state.allergies[0], ...item }] })),
			addAllergy: (newAllergy) => set((state) => ({ allergies: [...state.allergies, newAllergy] })),

			setFamilyHistory: (item) => set((state) => ({ family_history: [{ ...state.family_history[0], ...item }] })),
			addFamily: (newFamily) => set((state) => ({ family_history: [...state.family_history, newFamily] })),

			setSmokerStatus: (item) => set((state) => ({ social_history: { ...state.social_history, smoker_status: item } })),
			setCigarettesPerDay: (item) =>
				set((state) => ({ social_history: { ...state.social_history, cigarettes_per_day: item } })),
			setAlcoholConsumption: (item) =>
				set((state) => ({ social_history: { ...state.social_history, alcohol_consumption: item } })),
			setPhysicalActivities: (item) =>
				set((state) => ({ social_history: { ...state.social_history, physical_activities: item } })),

			setHypertension: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, hypertensions: item } })),
			setBloodPressureMedication: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, blood_pressure_medications: item } })),
			setStroke: (item) => set((state) => ({ medical_history: { ...state.medical_history, stroke: item } })),

			setMedications: (item) => set((state) => ({ medical_history: { ...state.medical_history, medications: item } })),

			addMedication: (item) =>
				set((state) => ({
					medical_history: { ...state.medical_history, medications: [...state.medications, item] },
				})),

			setPastMedicalProcedures: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, past_medical_procedures: item } })),

			setDateOfProcedures: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, date_of_procedures: item } })),
		}),
		{
			name: "ENDO_TRACKER_PATIENT_INFO",
		}
	)
);

module.exports = {
	useHRNav,
	useAllergyNav,
	useCPNav,
	useUserInfo,
	useDoctorInfo,
	usePatientInfo,
	currentUser,
};
