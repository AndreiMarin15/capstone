import { PROJECT } from "../project/db";

export async function getPrescriptions() {
    try {
        // Retrieve prescriptions from project.prescriptions table
        const prescriptions = await PROJECT.selectAllFrom('prescriptions');

        console.log("Retrieved Prescriptions:", prescriptions);

        return prescriptions;
        
    } catch (error) {
        console.error("Error in getPrescriptions:", error);
        throw error;
    }
}

export async function getPrescriptionById(prescriptionId) {
    try {
        const prescription = await PROJECT.selectFrom('prescriptions', {
            column: 'id',
            value: prescriptionId
        });

        console.log("Retrieved Prescription by ID:", prescription);

        return prescription;
        
    } catch (error) {
        console.error(`Error in getPrescriptionById for ID ${prescriptionId}:`, error);
        throw error;
    }
}