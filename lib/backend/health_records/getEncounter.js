import { PUBLIC } from "../../backend/public/db";
export async function getEncounters() {
    try {
      const encountersData = await PUBLIC.selectFrom("encounter");
      return encountersData;
    } catch (error) {
      console.error("Error fetching encounters:", error);
      throw error;
    }
  }
