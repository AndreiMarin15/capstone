import { PROJECT } from "../project/db";

const updatePrescription = async (prescriptionId, updatedData) => {
    try {
        // Ensure updatedData object exists
        if (!updatedData || !updatedData.medicationData) {
            throw new Error("Invalid updated data. Medication data is missing.");
        }

        // Fetch the existing prescription data to get the current medicationData
        const existingPrescriptions = await PROJECT.selectFrom("prescriptions", { column: "id", value: prescriptionId });
        const existingMedications = existingPrescriptions[0]?.resource.medicationData || [];
        console.log(existingPrescriptions);// Get the first record's medicationData
        console.log("Existing Medications:", existingMedications);
        console.log("New Medications:", updatedData.medicationData);
        // Combine existing medications with the new ones
        const combinedMedicationData = [
            ...existingMedications,
            ...updatedData.medicationData.map(med => ({
                ...med,
                // Add or modify fields if necessary here
            }))
        ];

        // Prepare the updated resource field
        const updatedResource = {
            status: "incomplete", // Set the desired status
            subject: {
                type: "Patient",
                reference: updatedData.patientId, // Include the patient reference
            },
            requester: {
                agent: {
                    reference: updatedData.doctorName, // Include the doctor's name
                    license_id: updatedData.doctorLicense, // Include the doctor's license
                },
            },
            resource_type: "prescription", // Set the resource type
            medicationData: combinedMedicationData, // Include the combined medication data
        };

        // Prepare the data for updating the prescription
        const prescriptionData = {
            resource: updatedResource,
        };

        // Update the prescription in the project.prescriptions table
        const updatedPrescription = await PROJECT.updateTable("prescriptions", prescriptionData, { id: prescriptionId });
        console.log("Prescription data updated:", updatedPrescription);
        return updatedPrescription;
    } catch (error) {
        console.error("Error in updatePrescription:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export default updatePrescription;
