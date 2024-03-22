import { PUBLIC } from "../../backend/public/db";

export async function getObservation() {
  try {
    // Assuming "observation" is the table name in your backend database
    const observationsData = await PUBLIC.selectFrom("observation");
    console.log(observationsData);
    return observationsData;
  } catch (error) {
    console.error("Error fetching observations:", error);
    throw error;
  }
}
