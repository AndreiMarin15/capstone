import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { authentication } from "../auth";
import { currentUser } from "@/app/store";
export const DoctorSignUp = {
	// TODO: ADD SESSION HANDLING
	selectSpecializations: async () => {
		const specializationQuery = await PROJECT.selectAllFrom("specializations");

		return specializationQuery;
	},

	signUpAsDoctor: async (doctorData) => {
		const account = await authentication.signUpNewUser(doctorData.email, doctorData.password);

		// console.log(account);
		// console.log(account.user.id);
		const doctorInfo = {
			id: account.user.id,
			first_name: doctorData.first_name,
			last_name: doctorData.last_name,
			email: doctorData.email,
			license_id: doctorData.license_id,
			specialization_id: doctorData.specialization_id,
			gender: doctorData.gender,
			birthdate: doctorData.birthdate,
			years_of_practice: doctorData.years_of_practice,
			about: doctorData.about,
		};

		const practitionerResource = {
			status: "created",
			resource: {
				identifier: account.user.id,
				active: true,
				name: doctorData.first_name + " " + doctorData.last_name,
				telecom: doctorData.email,
				gender: doctorData.gender,
				birthdate: doctorData.birthdate,
				qualification: {
					identifier: doctorData.license_id,
				},
			},
		};

		const accountResource = {
			id: account.user.id,

			status: "created",
			resource: {
				identifier: account.user.id,
				description: "Practitioner",
				status: "active",
				name: doctorData.first_name + " " + doctorData.last_name,
			},
		};

		const personResource = {
			status: "created",
			resource: {
				identifier: account.user.id,
				description: "Practitioner",
				status: "active",
				name: doctorData.first_name + " " + doctorData.last_name,
				telecom: {
					email: doctorData.email,
				},
				gender: doctorData.gender,
				birthdate: doctorData.birthdate,
			},
		};

		if (account.user.id) {
			const addResource = await PUBLIC.insertIntoNoSelect("practitioner", practitionerResource);
			const addPerson = await PUBLIC.insertIntoNoSelect("person", personResource);
			if (addResource === null && addPerson === null) {
				const addAccount = await PUBLIC.insertIntoNoSelect("account", accountResource);

				if (addAccount === null) {
					const addDoctor = await PROJECT.insertIntoNoSelect("doctors", doctorInfo);
					if (addDoctor === null) {
						await authentication.mountUser();
						await currentUser.getState().setUser({
							...doctorInfo,
							fullName: doctorData.first_name + " " + doctorData.last_name,
							type: "doctor",
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
	},
};