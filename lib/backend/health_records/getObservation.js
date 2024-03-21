import { PUBLIC } from "../../backend/public/db";

export async function getObservations() {
  try {
    // Assuming "observation" is the table name in your backend database
    const observationsData = await PUBLIC.selectFrom("observation");
    return observationsData;
  } catch (error) {
    console.error("Error fetching observations:", error);
    throw error;
  }
}
