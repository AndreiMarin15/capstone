import { client } from "../initSupabase";
const supabase = client("project");
export const getPatientData = async (patientId) => {
    const { data, error } = await supabase.from("patient").select().eq("id", patientId);
    console.log(data)
    return data[0].personal_information
};
