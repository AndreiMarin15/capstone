import { PUBLIC } from "../public/db";
import { getEncounters } from "./getEncounter";
import { doctor } from "./doctor";

const uploadMedication = async (medication) => {
    console.log("Medication data received:", medication);

    try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        
        // Construct medication data for insertion
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
                                display: medication.medicationCodeableConcept[0]?.coding[0]?.display,
                            }
                        ],
                        text: medication.medicationCodeableConcept[0]?.text
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
                    dispenseInterval: medication.dispenseRequest.dispenseInterval,
                    validityPeriod: {
                        start: medication.dispenseRequest.validityPeriod.start,
                        end: medication.dispenseRequest.validityPeriod.end
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

        // Insert medication data into Supabase
        const insertedMedication = await PUBLIC.insertInto('medicationrequest', medicationData);
        
        console.log("Insertion response:", insertedMedication);

        // Extract the ID of the newly inserted medication
        const insertedId = insertedMedication[0]?.id;

        // Return the inserted ID or any other relevant data
        return insertedId;
    } catch (error) {
        throw error;
    }
};

export default uploadMedication;