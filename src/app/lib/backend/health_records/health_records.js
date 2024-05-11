import { PROJECT } from "../project/db";
import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";

const supabase = client("public");
export const healthRecords = {
	getPatients: async () => {
		const patients = await PROJECT.selectAllFrom("patients");

		console.log(patients);
		return patients;
	},

	getPatientData: async (patientId) => {
		const patient = await PROJECT.selectFrom("patients", { column: "id", value: patientId });

		console.log(patient);
		return patient[0];
	},

	getPatientFhirData: async (patientId) => {
		const { data: patient } = await supabase
			.from("patient")
			.select("*")
			.contains("resource", { identifier: patientId });

		return patient[0];
	},
};
