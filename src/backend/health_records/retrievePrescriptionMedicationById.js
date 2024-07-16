import { client } from "../initSupabase";
export const supabase = client("project");

const retrievePrescriptionMedicationById = async (prescriptionId, index) => {
  try {
    // Fetch the prescription to get the medicationData
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

    // Return the specific medication object
    return medicationData[index];
  } catch (error) {
    console.error("Error retrieving medication:", error);
    throw new Error("Failed to retrieve medication: " + error.message);
  }
};

export default retrievePrescriptionMedicationById;
