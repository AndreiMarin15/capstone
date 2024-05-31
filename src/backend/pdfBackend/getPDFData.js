import { client } from "../initSupabase";
const supabase = client("public");

export const getFamilyMemberHistory = async (patientId) => {
    const { data, error } = await supabase.from("familymemberhistory").select().eq("resource->>patient", patientId);

    return data;
}

export const getMedicalHistory = async (patientId) => {
    const { data, error } = await supabase.from("observation").select().eq("resource->subject->>reference", patientId).eq("resource->>id", "diagnosis");

    return data;
}