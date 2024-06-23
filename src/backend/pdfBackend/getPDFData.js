import { client } from "../initSupabase";
import { currentUser } from "@/app/store";
const supabase = client("public");
const project = client("project");

const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);
	const formattedDate = date.toISOString().split("T")[0];
	return formattedDate;
};

export const getPatient = async () => {
	const patient = await project.from("patients").select("*").eq("id", currentUser.getState().info.id);

	return patient.data[0];
};

export const getFamilyMemberHistory = async (patientId) => {
	const { data, error } = await supabase.from("familymemberhistory").select().eq("resource->>patient", patientId);

	return data;
};

export const getMedicalHistory = async (patientId) => {
	const { data, error } = await supabase
		.from("observation")
		.select()
		.eq("resource->subject->>reference", patientId)

		.or(`resource->>id.eq.${"initialDiagnosis"},resource->>id.eq.${"finalDiagnosis"}`)
		.order("ts", { ascending: false })
		.limit(1);

	console.log(data);
	console.log(error);

	return data;
};

export const getMedications = async (patientId) => {
	const { data, error } = await supabase
		.from("medicationrequest")
		.select()
		.eq("resource->subject->>reference", patientId ?? currentUser.getState().info.id)
		.gte("resource->dispenseRequest->validityPeriod->>end", new Date().toISOString().slice(0, 10))
		.lte("resource->dispenseRequest->validityPeriod->>start", new Date().toISOString().slice(0, 10));

	return data;
};

export const getCarePlan = async (patientId) => {
	const { data, error } = await supabase.from("careplan").select().eq("resource->subject->>reference", patientId);

	return data;
};

export const getLabTests = async (patientId) => {
	const { data, error } = await supabase
		.from("observation")
		.select()
		.eq("resource->subject->>reference", patientId ?? currentUser.getState().info.id)
		.eq("resource->>id", "labtest");
	return data;
};

export const getRequestedLabTests = async () => {
	const { data, error } = await supabase
		.from("observation")
		.select()
		.eq("resource->subject->>reference", currentUser.getState().info.id)
		.eq("resource->>id", "labtest");
	// .eq("resource->>status", "requested");

	return data;
};
export const getReferralHistory = async (patientId) => {
	const { data, error } = await project.from("referrals").select().eq("patient_id", patientId);

	const doctorIds = data.map((referral) => referral.referred_to);

	const { data: doctors, error: doctorsError } = await project.from("doctors").select().in("id", doctorIds);

	const { data: specializations, error: specializationsError } = await project.from("specializations").select();

	const referralHistory = doctors.map((doctor, index) => {
		const specialization = specializations.find((specialization) => specialization.id === doctor.specialization_id);
		const referral = data.find((referral) => referral.referred_to === doctor.id);

		return {
			number: index + 1,
			referredto: doctor.first_name + " " + doctor.last_name,
			specialization: specialization.doctor_specialization_name,
			date: formatTimestamp(referral.created_at),
		};
	});

	return referralHistory;
};

export const getDoctorByLicense = async (doctor_license) => {
	const { data, error } = await project.from("doctors").select().eq("license_id", doctor_license);
	console.log(data[0]);
	console.log(doctor_license);
	console.log(error);
	return data[0];
};

export const getDoctorSpecialization = async (doctor_license) => {
	const { data, error } = await project.from("doctors").select().eq("license_id", doctor_license);

	const { data: specializations, error: specializationsError } = await project.from("specializations").select();

	const specialization = specializations.find((specialization) => specialization.id === data[0]?.specialization_id);

	console.log(specialization?.doctor_specialization_name);
	return specialization?.doctor_specialization_name;
};

export const getDoctorHospital = async (doctor_license) => {
	const { data, error } = await project.from("doctors").select().eq("license_id", doctor_license);

	console.log(data[0]?.hospital?.name);
	return data[0]?.hospital?.name;
};
