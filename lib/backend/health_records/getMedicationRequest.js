import { PUBLIC } from "../../backend/public/db";

export async function getMedicationRequests() {
    try {
        const medicationRequestsData = await PUBLIC.selectFrom("medicationrequest");
        return medicationRequestsData;
    } catch (error) {
        console.error("Error fetching medication requests:", error);
        throw error;
    }
}