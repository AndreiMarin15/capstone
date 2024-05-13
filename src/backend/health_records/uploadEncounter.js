import { PUBLIC } from "../public/db";
import { doctor } from "./doctor";
const uploadEncounter = async (encounter) => {
	try {
		const contained = [];

		await Promise.all(
			encounter.contained?.map(async (element) => {
				const fhir = {
					status: "created",
					resource: element,
				};

				const inserted = await PUBLIC.insertInto(element.resource_type.toLowerCase(), fhir);
				console.log(inserted[0]);
				contained.push(inserted[0].id);
				console.log("Inserted ID:", inserted.id);
				console.log("HI");
				console.log(contained);
				if (inserted.status !== 201) {
					return;
				}
			})
		);
		const doctorInfo = await doctor.getDoctorByCurrentUser();
		const data = {
			status: "created",
			resource: {
				id: encounter.id,
				period: encounter.period,
				participant: {
					type: doctorInfo.type,
					actor: doctorInfo.fullName,
				},
				subject: {
					type: encounter.subject.type,
					reference: encounter.subject.reference,
				},

				contained: contained,
				resource_type: encounter.resource_type,
			},
			resource_type: encounter.resource_type,
		};
		console.log("Data:", data);
		const enc = await PUBLIC.insertInto(data.resource_type.toLowerCase(), data);

		return { enc, containedIDs: contained };
	} catch (error) {
		throw error;
	}
};

// Export the uploadEncounter function
export default uploadEncounter;
