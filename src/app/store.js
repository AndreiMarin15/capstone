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
				setPhilhealthId: (item) => set(() => ({ philhealth_id: item })),
				last_name: "",
				setLastName: (item) => set(() => ({ last_name: item })),
				first_name: "",
				setFirstName: (item) => set(() => ({ first_name: item })),
				contact_number: "",
				setContact: (item) => set(() => ({ contact_number: item })),
				gender: "",
				setGender: (item) => set(() => ({ gender: item })),
				birthdate: "",
				setBirthdate: (item) => set(() => ({ birthdate: item })),
				street_address: "",
				setStreet: (item) => set(() => ({ street_address: item })),
				city: "",
				setCity: (item) => set(() => ({ city: item })),
				state: "",
				setState: (item) => set(() => ({ state: item })),
				postal_code: "",
				setPostalCode: (item) => set(() => ({ postal_code: item })),
				photo: "",
				setPhoto: (item) => set(() => ({ gender: item })),
			},
			setPersonalInformation: (item) => set(() => ({ personal_information: item })),

			allergies: [
				{
					category_of_allergen: "",
					setCategoryOfAllergen: (item) => set(() => ({ category_of_allergen: item })),
					allergen: "",
					setAllergen: (item) => set(() => ({ allergen: item })),
					reactions: [],
					setReactions: (item) => set(() => ({ reactions: item })),
					severity_of_allergy: "",
					setSeverity: (item) => set(() => ({ severity_of_allergy: item })),
					date_of_onset: "",
					setDateOnset: (item) => set(() => ({ date_of_onset: item })),
					comments: "",
					setComments: (item) => set(() => ({ comments: item })),
				},
			],
			setAllergies: (item) => set(() => ({ allergies: item })),

			family_history: [
				{
					last_name: "",
					setLastName: (item) => set(() => ({ last_name: item })),
					first_name: "",
					setFirstName: (item) => set(() => ({ first_name: item })),
					age: 0,
					setAge: (item) => set(() => ({ age: item })),
					gender: "Male" | "Female",
					setGender: (item) => set(() => ({ gender: item })),
					relationship: "",
					setRelationship: (item) => set(() => ({ relationship: item })),
					medical_condition: "",
					setMedicalCondition: (item) => set(() => ({ medical_condition: item })),
					medical_condition_date: "",
					setMedicalConditionDate: (item) => set(() => ({ medical_condition_date: item })),
					medical_condition_outcome: "",
					setMedicalConditionOutcome: (item) => set(() => ({ medical_condition_outcome: item })),
					medical_procedures: [],
					setMedicalProcedures: (item) => set(() => ({ medical_procedures: item })),
				},
			],
			setFamilyHistory: (item) => set(() => ({ family_history: item })),

			social_history: {
				smoker_status: "Smoker" | "Non Smoker",
				setSmokerStatus: (item) => set(() => ({ smoker_status: item })),
				cigarettes_per_day: 1,
				setCigarettesPerDay: (item) => set(() => ({ cigarettes_per_day: item })),
				alcohol_consumption: "Non-Drinker" | "Moderate Drinker" | "Heavy Drinker",
				setAlcoholConsumption: (item) => set(() => ({ alcohol_consumption: item })),
				physical_activities: "Sedentary" | "Low Activity" | "Moderate Activity" | "High Activity" | "Regular Exercise",
				setPhysicalActivities: (item) => set(() => ({ physical_activities: item })),
			},

			setSocialHistory: (item) => set(() => ({ social_history: item })),

			medical_history: {
				hypertensions: "No",
				setHypertesion: (item) => set(() => ({ hypertensions: item })),
				blood_pressure_medications: "No",
				setBloodPressureMedication: (item) => set(() => ({ blood_pressure_medications: item })),
				stroke: "No",
				setStroke: (item) => set(() => ({ stroke: item })),
				medications: [],
				setMedications: (item) => set(() => ({ medications: item })),
				past_medical_procedures: "",
				setPastMedicalProcedures: (item) => set(() => ({ past_medical_procedures: item })),
			},

			setSocialHistory: (item) => set(() => ({ medical_history: item })),
		}),
		{
			name: "ENDO_TRACKER_PATIENT_INFO",
		}
	)
);

module.exports = { useHRNav, useCPNav, useUserInfo, useDoctorInfo, usePatientInfo };
