import { currentUser } from "@/app/store.js";
import { client } from "../initSupabase.js";
const project = client("attending_doctors");

export const addAttendingDoctor = async (doctor, patient) => {
	const attendingDoctor = {
		patient_id: patient.id,
		doctor_id: doctor.id,
		license_id: doctor.license_id,
		doctor_first_name: doctor.first_name,
		doctor_last_name: doctor.last_name,
		doctor_specialization: doctor.specialization,
		doctor_years: doctor.years_of_experience,
	};

	const { data, error } = await project.from("attending_doctors").insert([attendingDoctor]);

	if (error) {
		throw error;
	}

	return data;
};

export const getAttendingDoctors = async (patient) => {
	const { data, error } = await project.from("attending_doctors").select("*").eq("patient_id", patient.id);

	if (error) {
		throw error;
	}

	return data;
};

export const deleteAttendingDoctor = async (doctor, patient) => {
	const { data, error } = await project
		.from("attending_doctors")
		.delete()
		.eq("patient_id", patient.id)
		.eq("doctor_id", doctor.id);

	if (error) {
		throw error;
	}

	return data;
};
