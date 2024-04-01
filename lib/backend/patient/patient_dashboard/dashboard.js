import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";
import { PUBLIC } from "../../public/db";
import { currentUser, useUserInfo, useDoctorInfo, usePatientInfo } from "../../../../src/app/store";
import { client } from "../../initSupabase";

const fhir = client("public");
const dashboard = {
	getPatientData: async () => {
		const result = await auth.getSession();
		const user = await result.session.user;

		const patient = await project.selectFrom("patients", {
			column: "id",
			value: user.id,
		});

		const data = patient[0];
		const formatTimestamp = (timestamp) => {
			let date = new Date(timestamp);
			let formattedDate =
				date.getFullYear() +
				"-" +
				(date.getMonth() + 1).toString().padStart(2, "0") +
				"-" +
				date.getDate().toString().padStart(2, "0");
			return formattedDate;
		};
		const calculateAge = (birthdayString) => {
			const birthday = new Date(birthdayString);
			const today = new Date();

			let age = today.getFullYear() - birthday.getFullYear();
			const monthDifference = today.getMonth() - birthday.getMonth();

			if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
				age--;
			}

			return age;
		};

		console.log(data);

		return {
			name: `${data.personal_information.first_name} ${data.personal_information.last_name}`,
			age: calculateAge(data.personal_information.birthdate),
			gender: data.personal_information.gender,
			birthday: data.personal_information.birthdate,
			address: `${data.personal_information.street_address}, ${data.personal_information.city}, ${data.personal_information.state}, ${data.personal_information.postal_code}`,
			allergies: data.allergies,
			contact: `+63 ${data.personal_information.contact_number}`,
			memberSince: formatTimestamp(data.created_at),
			bmi: "24.9",
		};
	},

	getLatestCarePlan: async () => {
		const result = await auth.getSession();
		const user = await result.session.user;

		const last_careplan = await fhir
			.from("careplan")
			.select("*")
			.match("resource", { subject: { reference: user.id } })
			.order("ts", { ascending: false })
			.limit(1);
		
		
		console.log(last_careplan)
		const data = last_careplan.data[0];
		console.log(data);
		return data;
	},
};

export default dashboard;
