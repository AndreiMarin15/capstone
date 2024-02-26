import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { authentication } from "../auth";
import { currentUser } from "../../../src/app/store";
export const PatientSignUp = {
	signUpAsPatient: async (userData, patientData) => {
		const account = await authentication.signUpNewUser(userData.email, userData.password);

		if (account.user != null) {
			const fhirResources = {
				account: {
					id: account.user.id,
					status: "created",
					resource: {
						identifier: account.user.id,
						name: patientData.personal_information.first_name + " " + patientData.personal_information.last_name,
						descripton: "Patient",
					},
				},

				person: {
					status: "created",
					resource: {
						identifier: account.user.id,
						name: patientData.personal_information.first_name + " " + patientData.personal_information.last_name,
						telecom: {
							email: userData.email,
						},
						gender: patientData.personal_information.gender,
						birthdate: patientData.personal_information.birthdate,
						deceased: false,
						address: {
							street_address: patientData.personal_information.street_address,
						},
						photo: patientData.personal_information.photo,
					},
				},

				patient: {
					status: "created",
					resource: {
						philhealth_id: patientData.personal_information.philhealth_id,
						identifier: account.user.id,
						active: true,
						name: patientData.personal_information.first_name + " " + patientData.personal_information.last_name,
						telecom: {
							email: userData.email,
						},
						gender: patientData.personal_information.gender,
						birthdate: patientData.personal_information.birthdate,
						deceased: false,
						address: {
							street_address: patientData.personal_information.street_address,
						},
						photo: patientData.personal_information.photo,
					},
				},

				allergyintolerance: {
					status: "created",
					resource: {}, // mag for each na loop to populate and isa isa ilagay sa db
				},

				familymemberhistory: {
					status: "created",
					resource: {}, // mag for each na loop to populate and isa isa ilagay sa db
				},
			};

			// console.log(account);
			// console.log(account.user.id);
			const patientInfo = {
				id: account.user.id,
				...patientData,
			};

			if (account.user.id) {
				const addResource = await PUBLIC.insertInto("patient", fhirResources.patient);
				console.log(addResource);
				const addPerson = await PUBLIC.insertInto("person", fhirResources.person);
				console.log(addPerson);
				if (addResource === null && addPerson === null) {
					const addAccount = await PUBLIC.insertInto("account", fhirResources.account);
					console.log(addAccount);
					if (addAccount === null) {
						const addPatient = await PROJECT.insertInto("patients", patientInfo);
						console.log(addPatient);

						//TODO: UPDATE
						// const addAllergiIntolerance = await PUBLIC.insertInto("allergyintolerance", fhirResources.allergyintolerance)

						// const addFamilyMemberHistory = await PUBLIC.insertInto("familymemberhistory", fhirResources.familymemberhistory)

						if (addPatient === null) {
							await authentication.mountUser();
							await currentUser.getState().setUser({
								fullName:
									patientData.personal_information.first_name + " " + patientData.personal_information.last_name,
								type: "patient",
							});
							return account;
						}

						return {
							message: "Server Side Error. Please contact support and try again.",
						};
					}

					return {
						message: "Server Side Error. Please contact support and try again.",
					};
				}
			}

			return {
				message: "Server Side Error. Please contact support and try again.",
			};
		} else {
			return account;
		}
	},
};
