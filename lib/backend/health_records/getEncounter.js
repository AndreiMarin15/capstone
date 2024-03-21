import { PUBLIC } from "../../backend/public/db";
export async function getEncounters() {
    try {
      // Use the selectFrom function to fetch encounters from the 'encounters' table
      const encountersData = await PUBLIC.selectFrom("encounter");
      return encountersData;
    } catch (error) {
      console.error("Error fetching encounters:", error);
      throw error; // Throw the error to handle it in the component
    }
  }