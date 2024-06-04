import { client } from "../initSupabase";
const supabase = client("public");
const project = client("project");

const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);
	const formattedDate = date.toISOString().split("T")[0];
	return formattedDate;
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
		.eq("resource->>id", "finalDiagnosis");

	return data;
};

export const getMedications = async (patientId) => {
	const { data, error } = await supabase
		.from("medicationrequest")
		.select()
		.eq("resource->subject->>reference", patientId);

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
		.eq("resource->subject->>reference", patientId)
		.eq("resource->>id", "labtest");

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
