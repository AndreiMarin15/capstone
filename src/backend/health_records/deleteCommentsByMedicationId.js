// backend/health_records/deleteCommentsByMedicationId.js
import { client } from "../initSupabase";
export const supabase = client("project");

const deleteCommentsByMedicationId = async (medicationId) => {
  try {
    const { data, error } = await supabase
      .from("medication_comments")
      .delete()
      .eq("medication_id", medicationId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error deleting comments:", error);
    throw error;
  }
};

export default deleteCommentsByMedicationId;
