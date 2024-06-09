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
					license: observation.participant.license
				},
				resource_type: observation.resource_type,
				rangeQuantity: {
					rangeQuantities: observation.rangeQuantity.rangeQuantities?.map((range) => ({
						level: range.display,
						min: range.min,
						symbol: range.symbol,
						max: range.max,
					})),
				},
				valueQuantity: {
					valueQuantities: observation.valueQuantity.valueQuantities?.map((val) => ({
						display: val.display,
						unit: val.unit,
						value: val.value,
					})),
				},
				uploadedDateTime: observation.uploadedDateTime,
				effectiveDateTime: observation.effectiveDateTime,
				requestedDateTime: observation.requestedDateTime,
				codeText: observation.codeText,
				imageSrc: observation.imageSrc,
			},
		};

		const insertedObservation = await PUBLIC.insertInto("observation", observationData);

		return insertedObservation;
	} catch (error) {
		console.error("Error uploading observation:", error.message);
		return { error: error.message };
	}
};
