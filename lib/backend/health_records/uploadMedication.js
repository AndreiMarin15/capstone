import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { getEncounters } from "./getEncounter";
import { doctor } from "./doctor";
const uploadMedication = async (medication) => {
    console.log("Medication data received:", medication);
    try {
        
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        // const encounterDate = await getEncounters.resource.period.start;
        // console.log(getEncounters.resource.period.start)
        const medicationData = {
            status: "created",
        resource:{
            status: medication.status,
            id: medication.id,
            medicationCodeableConcept: [ {
                coding: [
                    {
                        system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                        
                        display: medication.medicationCodeableConcept[0]?.coding[0]?.display,//generic name
                    }
                ],
                text: medication.medicationCodeableConcept[0]?.text//brand name
            }
            ],

            subject: {
                type: medication.subject.type,
                reference: medication.subject.reference,
            },

            // period: encounterDate,

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
                    reference: doctorInfo.fullName
                }
            },
            form: {
                text: medication.form
            },
            note: medication.note,

            adverseEvent: {
               adverseReaction: medication.adverseEvent.adverseReaction,
            }, 
            }
        };
       
        const insertedMedication = await PUBLIC.insertInto('medicationrequest', medicationData);
        console.log("Insertion response:", insertedMedication);
        return insertedMedication;
    } catch (error) {
        throw error;
    }
};



export default uploadMedication;
