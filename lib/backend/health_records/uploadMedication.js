import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { getEncounters } from "./getEncounter";
import { doctor } from "./doctor";
const uploadMedication = async (medication) => {
    try {
        const doctorInfo = await doctor.getDoctorByCurrentUser();
        // const encounterDate = await getEncounters.resource.period.start;
        // console.log(getEncounters.resource.period.start)
        const medicationData = {
            status: "created",
            // intent: "order",
        resource:{
            medicationCodeableConcept: [ {
                coding: [
                    {
                        system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                        code: medication.code, //registration number
                        display: medication.medicationName //generic name + brand name
                    }
                ],
                text: medication.formDisplay//generic name + brand name
            }
            ],

            // period: encounterDate,

            dosageInstruction: [
                {
                    sequence: 1,
                    text: medication.instructions,
                    doseAndRate: [
                        {
                            doseQuantity: {
                                doseUnit: medication.doseUnit
                            }
                        }
                    ]
                }
            ],
            dispenseRequest: {
                medicationCodeableConcept: {
                    coding: [
                        {
                            system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                            code: medication.code,
                            display: medication.name
                        }
                    ],
                    text: medication.name
                },
                dispenseInterval: medication.duration,
                validityPeriod: {
                    start: medication.Start,
                    end: medication.End,
                },
                numberOfRepeatsAllowed: medication.numberOfRepeatsAllowed
            },
            authoredOn: medication.authoredOn,
            requester: {
                agent: {
                    reference: doctorInfo.fullName
                }
            },
            form: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-EntityCode",
                        code: medication.formCode,
                        display: medication.formDisplay
                    }
                ],
                text: medication.form
            },
            note: medication.note
            }
        };

        const insertedMedication = await PUBLIC.insertInto('medicationrequest', medicationData);

        return insertedMedication;
    } catch (error) {
        throw error;
    }
};



export default uploadMedication;
