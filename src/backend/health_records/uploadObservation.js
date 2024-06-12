import { PUBLIC } from "../public/db";

export const uploadObservation = async (observation) => {
  try {
    const observationData = {
      status: "created",
      resource: {
        id: observation.id,
        status: observation.status,
        code: {
          coding: [
            {
              code: observation.code.coding[0].code,
              system: observation.code.coding[0].system,
            },
          ],
        },
        subject: {
          type: observation.subject.type,
          reference: observation.subject.reference || "",
        },
        participant: {
          type: observation.participant.type,
          actor: observation.participant.actor,
          license_id: observation.participant.license,
        },
        resource_type: observation.resource_type,
        rangeQuantity: {
          rangeQuantities: observation.rangeQuantity.rangeQuantities?.map((range) => ({
            level: range.level || "",
            min: range.min || "",
            max: range.max || "",
          })) || [],
        },
        valueQuantity: {
          value: observation.valueQuantity.value || "",
          unit: observation.valueQuantity.unit || "",
        },
        uploadedDateTime: observation.uploadedDateTime || "",
        time: observation.time || "",
        when: observation.when || "",
        machine: observation.machine || "",
      },
    };

    const insertedObservation = await PUBLIC.insertInto("observation", observationData);

    return insertedObservation;
  } catch (error) {
    console.error("Error uploading observation:", error.message);
    return { error: error.message };
  }
};
