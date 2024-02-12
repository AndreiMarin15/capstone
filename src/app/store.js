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
			setPersonalInformation: (item) =>
				set((state) => ({ personal_information: { ...state.personal_information, ...item } })),

			allergies: [
				{
					category_of_allergen: "",
					allergen: "",
					reactions: [],
					severity_of_allergy: "",
					date_of_onset: "",
					comments: "",
				},
			],
			setAllergies: (item) => set((state) => ({ allergies: [{ ...state.allergies[0], ...item }] })),
			addAllergy: (newAllergy) => set((state) => ({ allergies: [...state.allergies, newAllergy] })),

			family_history: [
				{
					last_name: "",
					first_name: "",
					age: 0,
					gender: "Male",
					relationship: "",
					medical_condition: "",
					medical_condition_date: "",
					medical_condition_outcome: "",
					medical_procedures: [],
				},
			],
			setFamilyHistory: (item) => set((state) => ({ family_history: [{ ...state.family_history[0], ...item }] })),
			addFamily: (newFamily) => set((state) => ({ family_history: [...state.family_history, newFamily] })),

			social_history: {
				smoker_status: "Smoker",
				cigarettes_per_day: 1,
				alcohol_consumption: "Non-Drinker",
				physical_activities: "Sedentary",
			},
			setSmokerStatus: (item) => set((state) => ({ social_history: { ...state.social_history, smoker_status: item } })),
			setCigarettesPerDay: (item) =>
				set((state) => ({ social_history: { ...state.social_history, cigarettes_per_day: item } })),
			setAlcoholConsumption: (item) =>
				set((state) => ({ social_history: { ...state.social_history, alcohol_consumption: item } })),
			setPhysicalActivities: (item) =>
				set((state) => ({ social_history: { ...state.social_history, physical_activities: item } })),

			medical_history: {
				hypertensions: "No",
				blood_pressure_medications: "No",
				stroke: "No",
				medications: [],
				past_medical_procedures: "",
			},
			setHypertension: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, hypertensions: item } })),
			setBloodPressureMedication: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, blood_pressure_medications: item } })),
			setStroke: (item) => set((state) => ({ medical_history: { ...state.medical_history, stroke: item } })),
			setMedications: (item) => set((state) => ({ medical_history: { ...state.medical_history, medications: item } })),
			setPastMedicalProcedures: (item) =>
				set((state) => ({ medical_history: { ...state.medical_history, past_medical_procedures: item } })),
		}),
		{
			name: "ENDO_TRACKER_PATIENT_INFO",
		}
	)
);



module.exports = { useHRNav, useCPNav, useUserInfo, useDoctorInfo, usePatientInfo };
