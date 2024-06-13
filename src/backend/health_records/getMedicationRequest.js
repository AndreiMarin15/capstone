import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";
export async function getMedicationRequests() {
    try {
        const medicationRequestsData = await PUBLIC.selectFrom("medicationrequest");
        return medicationRequestsData;
    } catch (error) {
        console.error("Error fetching medication requests:", error);
        throw error;
    }
}

export async function retrieveMedicationById(medicationId) {
    try {
        const supabase = client("public");
        // Fetch medication by ID using Supabase
        const { data, error } = await supabase
            .from("medicationrequest")
            .select("*")
            .contains("resource", { id: medicationId })
            .single();

        if (error) {
            throw error;
        }

        console.log("Retrieved Medication Data:", data); // Log the data
        return data;
    } catch (error) {
        console.error("Error retrieving medication by ID:", error.message);
        throw error;
    }
}

export async function retrieveMedicationsByIds(medicationIds) {
    try {
        const supabase = client("public");
        // Fetch medications by IDs using Supabase
        const { data, error } = await supabase
            .from("medicationrequest")
            .select("*")
            .in("id", medicationIds); 

        if (error) {
            throw error;
        }

        console.log("Retrieved Medications Data:", data); // Log the data
        return data;
    } catch (error) {
        console.error("Error retrieving medications by IDs:", error.message);
        throw error;
    }
}