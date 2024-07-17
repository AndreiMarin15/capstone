import { client } from "../initSupabase";
export const supabase = client("project");

const deletePrescriptionMedicationById = async (prescriptionId, index) => {
  try {
    // Fetch the prescription to get the current medicationData
    const { data: prescriptionData, error: fetchError } = await supabase
    .from('prescriptions')
    .select('resource')
    .eq('id', prescriptionId)
    .single();


    if (fetchError) throw fetchError;

    const medicationData = prescriptionData.resource.medicationData;

    // Check if the index is valid
    if (index < 0 || index >= medicationData.length) {
      throw new Error("Invalid index for medication data");
    }

    // Remove the medication from the array
    const updatedMedicationData = medicationData.filter((_, i) => i !== index);

    // Update the prescription's resource with the modified medicationData
    const { error: updateError } = await supabase
      .from('prescriptions')
      .update({ resource: { ...prescriptionData.resource, medicationData: updatedMedicationData } })
      .eq('id', prescriptionId);

    if (updateError) throw updateError;

    return true; // Return true if deletion was successful
  } catch (error) {
    console.error("Error deleting medication:", error);
    throw new Error("Failed to delete medication: " + error.message);
  }
};

export default deletePrescriptionMedicationById;