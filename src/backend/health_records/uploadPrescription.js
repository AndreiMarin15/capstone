// Import necessary dependencies from Supabase and other modules
import { PROJECT } from "../project/db";  // Assuming you have a db.js file for project schema
import { doctor } from "./doctor";  // Assuming doctor.js provides necessary functions

const uploadPrescription = async (prescription) => {
    try {
        const medicationDataArray = [];

        // Process each medication in the prescription
        await Promise.all(
            prescription.medications?.map(async (medication) => {
                const doctorInfo = await doctor.getDoctorByCurrentUser();
                
                const medicationData = {
                    status: "created",
                    resource: {
                        status: medication.status,
                        id: medication.id,
                        medicationCodeableConcept: [
                            {
                                coding: [
                                    {
                                        system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                                        display: medication.medicationCodeableConcept[0]?.coding[0]?.display, // generic name
                                    }
                                ],
                                text: medication.medicationCodeableConcept[0]?.text // brand name
                            }
                        ],
                        subject: {
                            type: medication.subject.type,
                            reference: medication.subject.reference,
                        },
                        dosageInstruction: [
                            {
                                text: medication.instructions,
                                doseAndRate: [
                                    {
                                        doseQuantity: {
                                            doseUnit: medication.dosageInstruction[0]?.doseAndRate[0]?.doseQuantity?.doseUnit,
                                        }
                                    }
                                ]
                            }
                        ],
                        dispenseRequest: {
                            dispenseInterval: medication.dispenseRequest.dispenseInterval, // Map from medication.duration
                            validityPeriod: {
                                start: medication.dispenseRequest.validityPeriod.start, // Map from medication.start
                                end: medication.dispenseRequest.validityPeriod.end // Map from medication.end
                            },
                        },
                        requester: {
                            agent: {
                                reference: doctorInfo.fullName,
                                license_id: doctorInfo.license
                                
                            }
                        },
                        form: {
                            text: medication.form.text
                        },
                        note: medication.note,
                        adverseEvent: {
                            adverseReaction: medication.adverseEvent.adverseReaction,
                        },
                    }
                };

                medicationDataArray.push(medicationData);
            })
        );

        // Prepare data for inserting into project.prescriptions
        const prescriptionData = {
            resource: {
                id: prescription.id,
                medicationData: medicationDataArray,
                resource_type: prescription.resource_type,
            },
           
        };
        // Insert data into project.prescriptions table
        const insertedPrescription = await PROJECT.insertInto('prescriptions', prescriptionData);
        console.log(prescriptionData)
        return { prescription: insertedPrescription, medicationDataArray };
    } catch (error) {
        throw error;
    }
};

// Export the uploadPrescription function
export default uploadPrescription;
