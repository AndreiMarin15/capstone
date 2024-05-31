import { client } from "../initSupabase";
const supabase = client("public");

export const getFamilyMemberHistory = async (patientId) => {
    const { data, error } = await supabase.from("familymemberhistory").select().eq("resource->>patient", patientId);
    
    return data;
}