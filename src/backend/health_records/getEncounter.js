import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";
export const supabase = client("public");

export async function getEncounters() {
    try {
      const encountersData = await PUBLIC.selectFrom("encounter");
      return encountersData;
    } catch (error) {
      console.error("Error fetching encounters:", error);
      throw error;
    }
  }

  export async function getEncounterById(encounterId) {
    try {
        if (!encounterId) {
            throw new Error("Encounter ID is required");
        }

        const { data, error } = await supabase.from("encounter").select("*").eq("id", encounterId);

        if (error) {
            throw new Error("Error fetching encounter by ID:" + error.message);
        }

        if (data && data.length > 0) {
            return data[0]; // Assuming encounterId is unique
        } else {
            return null; // Return null if encounter with provided id is not found
        }
    } catch (error) {
        console.error("Error fetching encounter by ID:", error.message);
        throw error;
    }
}


export async function getEncounterByPatientId(patientId) {
  try {

    const { data, error } = await supabase
      .from("encounter")
      .select("*")
      .contains("resource", { "subject": { "reference": patientId } });

    if (error) {
      throw new Error("Error fetching encounter by patient ID: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching encounter by patient ID:", error.message);
    throw error;
  }
}


export async function getMostRecentEncounterByPatientId(patientId) {
  try {
  

    const { data, error } = await supabase
      .from("encounter")
      .select("*")
      .contains("resource", { "subject": { "reference": patientId } })
      .order("ts", { ascending: false }) // Sort by start date in descending order
      .limit(1); // Limit to 1 result to get the most recent encounter

    if (error) {
      throw new Error("Error fetching most recent encounter by patient ID: " + error.message);
    }

    return data && data.length > 0 ? data[0] : null; // Return the first encounter if found, otherwise null
  } catch (error) {
    console.error("Error fetching most recent encounter by patient ID:", error.message);
    throw error;
  }
}


export async function updateEncounterContained(containedArray, encounter) {
  try {

    const updatedEncounter = {
      ...encounter,
      resource: {
        ...encounter.resource,
        contained: containedArray
      }
    };


    const { data, error } = await supabase
      .from("encounter")
      .update(updatedEncounter)
      .eq("id", encounter.id)
  
    if (error) {
      console.error("Error updating encounter:", error);
      throw error;
    }

    console.log("Encounter updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating encounter:", error);
    throw error;
  }
}
  
