import { PUBLIC } from "./public/db";
import { PROJECT } from "./project/db";
import { authentication } from "./auth";
export const PatientSignUp = {
	signUpAsPatient: async (patientData) => {
		const account = await authentication.signUpNewUser(patientData.email, patientData.password);

		// console.log(account);
		// console.log(account.user.id);
		const patientInfo = {
			id: account.user.id,
			first_name: patientData.first_name,
			last_name: patientData.last_name,
			email: patientData.email,
			license_id: patientData.license_id,
			specialization_id: patientData.specialization_id,
		};

		const patientResource = {
			txid: 1,
			status: "created",
			resource: {
				identifier: account.user.id,
				active: true,
				name: doctorData.first_name + " " + doctorData.last_name,
				telecom: doctorData.email,
				gender: "",
				birthdate: "",
				qualification: {
					identifier: doctorData.license_id,
				},
			},
		};

		const accountResource = {
			id: account.user.id,
			txid: 1,
			status: "created",
			resource: {
				identifier: account.user.id,
				status: "active",
				name: patientData.first_name + " " + patientData.last_name,
			},
		};

		if (account.user.id) {
			const addResource = await PUBLIC.insertInto("patient", patientResource);
			const addPerson = await PUBLIC.insertInto("person", patientResource);
			if (addResource === null && addPerson === null) {
				const addAccount = await PUBLIC.insertInto("account", accountResource);

				if (addAccount === null) {
					const addaPatient = await PROJECT.insertInto("patients", patientInfo);
					console.log(addResource);
					console.log(addaPatient);
					console.log(addAccount);

					return account;
				}

				return {
					message: "Server Side Error. Please contact support and try again.",
				};
			}
		}

		return {
			message: "Server Side Error. Please contact support and try again.",
		};
	},
};
