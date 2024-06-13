import { PROJECT } from "../project/db";
import { doctor } from "./doctor";

const uploadPrescription = async (prescription) => {
    try {
        // Ensure prescription object exists
        if (!prescription) {
            throw new Error('Invalid prescription data. Prescription object is missing.');
        }

        const medicationDataArray = [];

        // Check if prescription.medications exists and is an array
        if (prescription.medications && Array.isArray(prescription.medications)) {
            // Process each medication in the prescription
            await Promise.all(
                prescription.medications.map(async (medication) => {
                    try {
                        const doctorInfo = await doctor.getDoctorByCurrentUser();

                        // Default values for medication data
                        const defaultMedicationData = {
                            status: "created",
                            resource: {
                                status: medication.status || "", // Default status
                                id: medication.id || "", // Default ID
                                medicationCodeableConcept: [
                                    {
                                        coding: [
                                            {
                                                system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                                                display: medication.medicationCodeableConcept?.[0]?.coding?.[0]?.display || "", // Default display
                                            }
                                        ],
                                        text: medication.medicationCodeableConcept?.[0]?.text || "" // Default text
                                    }
                                ],
                                subject: {
                                    type: medication.subject?.type || "", // Default type
                                    reference: medication.subject?.reference || "", // Default reference
                                },
                                dosageInstruction: [
                                    {
                                        text: medication.instructions || "", // Default instructions
                                        doseAndRate: [
                                            {
                                                doseQuantity: {
                                                    doseUnit: medication.dosageInstruction?.[0]?.doseAndRate?.[0]?.doseQuantity?.doseUnit || "", // Default dose unit
                                                }
                                            }
                                        ]
                                    }
                                ],
                                dispenseRequest: {
                                    dispenseInterval: medication.dispenseRequest?.dispenseInterval || "", // Default dispense interval
                                    validityPeriod: {
                                        start: medication.dispenseRequest?.validityPeriod?.start || "", // Default validity period start
                                        end: medication.dispenseRequest?.validityPeriod?.end || "" // Default validity period end
                                    },
                                },
                                requester: {
                                    agent: {
                                        reference: doctorInfo.fullName || "", // Default full name
                                        license_id: doctorInfo.license || "" // Default license ID
                                    }
                                },
                                form: {
                                    text: medication.form?.text || "" // Default form text
                                },
                                note: medication.note || "", // Default note
                                adverseEvent: {
                                    adverseReaction: medication.adverseEvent?.adverseReaction || "", // Default adverse reaction
                                },
                            }
                        };

                        // Push default medication data to array
                        medicationDataArray.push(defaultMedicationData);
                    } catch (error) {
                        console.error('Error processing medication:', error);
                        throw error; // Rethrow to stop Promise.all if medication processing fails
                    }
                })
            );
        }

        // Prepare data for inserting into project.prescriptions
        const prescriptionData = {
            resource: {
                id: prescription.id || "Sample", // Default value if prescription.id is not provided
                medicationData: medicationDataArray,
                resource_type: prescription.resource_type || "prescription", // Default value if not provided
            },
        };

        // Insert data into project.prescriptions table
        const insertedPrescription = await PROJECT.insertInto('prescriptions', prescriptionData);
        console.log("Prescription data:", prescriptionData);

        return { prescription: insertedPrescription, medicationDataArray };
    } catch (error) {
        console.error("Error in uploadPrescription:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export default uploadPrescription;
