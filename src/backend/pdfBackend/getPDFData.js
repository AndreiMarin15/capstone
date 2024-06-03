import { client } from "../initSupabase";
const supabase = client("public");

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
	const { data, error } = await supabase.from("medicationrequest").select().eq("resource->subject->>reference", patientId);

	return data;
}

export const getCarePlan = async (patientId) => {
	const { data, error } = await supabase.from("careplan").select().eq("resource->subject->>reference", patientId);

	return data;
}
