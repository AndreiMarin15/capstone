import { PROJECT } from "../project/db";
import { doctor } from "./doctor";
import { sendNotification } from "../sendNotification";
import { currentUser } from "@/app/store";

const uploadPrescription = async (prescription, patientId) => {
	try {
		const doctorInfo = await doctor.getDoctorByCurrentUser();
		// Ensure prescription object exists
		if (!prescription || !prescription.resource) {
			throw new Error("Invalid prescription data. Prescription object or resource is missing.");
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
					},
				},
				subject: {
					type: "Patient",
					reference: patientId,
				},
				status: prescription.resource.status,
				medicationData: medicationDataArray,
				resource_type: prescription.resource.resource_type,
			},
		};

		// Insert data into project.prescriptions table
		const insertedPrescription = await PROJECT.insertInto("prescriptions", prescriptionData);
		console.log("Prescription data inserted:", insertedPrescription);

		// Send notification to patient
		sendNotification(patientId, "New Prescription", "You have a new prescription", currentUser.getState().user.id);
		return { prescription: insertedPrescription, medicationDataArray };
	} catch (error) {
		console.error("Error in uploadPrescription:", error);
		throw error; // Re-throw the error to be caught by the caller
	}
};

export default uploadPrescription;
