import { client } from "../initSupabase";
export const supabase = client("project");

export const saveUpdatePrescriptionMedicationData = async (prescriptionId, index, updatedMedication) => {
  try {
    // Get the current prescription
    const { data: prescription, error: fetchError } = await supabase
      .from('prescriptions')
      .select('resource')
      .eq('id', prescriptionId)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    // Update the medicationData array at the specified index
    const medicationData = prescription.resource.medicationData;
    console.log(medicationData)
    // Ensure the index is within bounds
    if (index < 0 || index >= medicationData.length) {
      throw new Error("Index out of bounds");
    }

    // Update the specific medication entry
    medicationData[index] = {
      ...medicationData[index], // Keep existing properties
      ...updatedMedication,      // Merge with the new updated data
    };

    // Update the prescription in the database
    const { data, error } = await supabase
      .from('prescriptions')
      .update({
        resource: {
          ...prescription.resource,
          medicationData,
        },
      })
      .eq('id', prescriptionId);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error('Error updating medication data:', error);
    throw error;
  }
};