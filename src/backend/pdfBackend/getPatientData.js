import { client } from "../initSupabase";
const supabase = client("project");
export const getPatientData = async (patientId) => {
	const { data, error } = await supabase.from("patients").select().eq("id", patientId);
	console.log(data);
	return data[0].personal_information;
};

export const getFullPatientData = async (patientId) => {
	const { data, error } = await supabase.from("patients").select().eq("id", patientId);
	console.log(data);
	console.log(patientId);
	console.log(error);
	return data[0];
};
