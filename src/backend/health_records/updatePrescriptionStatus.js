
import { client } from "../initSupabase";
export const supabase = client("project");

export const updatePrescriptionStatus = async (prescriptionId, statusData) => {
    // Fetch existing prescription data first
    const { data: existingData, error: fetchError } = await supabase
      .from("prescriptions")
      .select("resource")
      .eq("id", prescriptionId)
      .single();
  
    if (fetchError) {
      throw new Error(`Error fetching existing prescription data: ${fetchError.message}`);
    }
  
    // Prepare the updated resource object
    const updatedResource = {
      ...existingData.resource,
      status: statusData, // Update the status
    };
  
    // Perform the update
    const { data, error } = await supabase
      .from("prescriptions")
      .update({ resource: updatedResource })
      .match({ id: prescriptionId });
  
    if (error) {
      throw new Error(`Error updating prescription status: ${error.message}`);
    }
  
    return data;
  };