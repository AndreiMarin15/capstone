import { currentUser } from "@/app/store.js";
import { client } from "../initSupabase.js";
import { sendNotification } from "../sendNotification.js";
const project = client("project");

export const addAttendingDoctor = async (doctor, patient) => {
	const attendingDoctor = {
		patient_id: patient.id,
		doctor_id: doctor.id,
		license_id: doctor.license_id,
		doctor_first_name: doctor.first_name,
		doctor_last_name: doctor.last_name,
		doctor_specialization: doctor.doctor_specialization,
		doctor_years: doctor.years,
		status: doctor.status ?? "pending",
		clinic: doctor.clinic,
		contact: doctor.contact,
	};
	console.log(attendingDoctor);
	const { data, error } = await project.from("attending_doctors").insert([attendingDoctor]);
	console.log(data);
	console.log(error);
	if (error) {
		throw error;
	}

	await sendNotification(patient.id, "New Referral", "You have a new referral", doctor.id);

	return data;
};

export const getAttendingDoctors = async (patient) => {
	const { data, error } = await project
		.from("attending_doctors")
		.select("*")
		.eq("patient_id", patient ?? currentUser.getState().user.id);

	if (error) {
		throw error;
	}

	return data;
};

export const deleteAttendingDoctor = async (id) => {
	const { data, error } = await project.from("attending_doctors").delete().eq("id", id);

	if (error) {
		throw error;
	}

	return data;
};
