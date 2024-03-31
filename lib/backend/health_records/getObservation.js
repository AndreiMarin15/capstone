import { PUBLIC } from "../../backend/public/db";
import { client } from "../initSupabase";
export const supabase = client("public");

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

export async function getObservationsWithLabTest() {
  try {
    // Fetch observations where the resource column contains JSON with id set to "labtest"
    const { data: observations, error } = await supabase
      .from("observation")
      .select("*")
      .contains("resource", { id: "labtest" });

    if (error) {
      console.error("Error fetching observations with labtest ID:", error);
      throw error;
    }

    console.log(observations);
    return observations;
  } catch (error) {
    console.error("Error fetching observations with labtest ID:", error);
    throw error;
  }
}


export async function getObservationsByPatientId(patientId) {
  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const { data: observations, error } = await supabase
      .from("observation")
      .select("*")
      .contains("resource", { "subject": { "reference": patientId } });

    if (error) {
      console.error("Error fetching observations by patient ID:", error);
      throw error;
    }

    console.log(observations);
    return observations;
  } catch (error) {
    console.error("Error fetching observations by patient ID:", error);
    throw error;
  }
}

