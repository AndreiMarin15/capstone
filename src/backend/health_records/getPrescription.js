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


export async function getPrescriptionsByPatient(patientId) {
    try {
        // Retrieve all prescriptions
        const prescriptions = await PROJECT.selectAllFrom('prescriptions');

        // Filter prescriptions based on patientId within the nested resource JSON
        const filteredPrescriptions = prescriptions.filter(prescription => {
            return prescription.resource.medicationData.some(medication => 
                medication.resource.subject && medication.resource.subject.reference === patientId
            );
        });

        console.log("Retrieved Prescriptions for Patient ID:", patientId, filteredPrescriptions);

        return filteredPrescriptions;
        
    } catch (error) {
        console.error("Error in getPrescriptionsByPatient:", error);
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