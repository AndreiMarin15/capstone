import { PROJECT } from "../project/db";
import { doctor } from "./doctor";

const uploadPrescription = async (prescription) => {
    try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        // Ensure prescription object exists
        if (!prescription || !prescription.resource) {
            throw new Error('Invalid prescription data. Prescription object or resource is missing.');
        }

        // Ensure medicationData exists and is an array
        const medicationDataArray = prescription.resource.medicationData || [];

        // Prepare data for inserting into project.prescriptions
        const prescriptionData = {
            resource: {
                requester: {
                    agent: {
                        reference: doctorInfo.fullName,
                        license_id: doctorInfo.license,
                    }
                },
                medicationData: medicationDataArray,
                resource_type: prescription.resource.resource_type,
               
            },
        };

        // Insert data into project.prescriptions table
        const insertedPrescription = await PROJECT.insertInto('prescriptions', prescriptionData);
        console.log("Prescription data inserted:", insertedPrescription);

        return { prescription: insertedPrescription, medicationDataArray };
    } catch (error) {
        console.error("Error in uploadPrescription:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export default uploadPrescription;