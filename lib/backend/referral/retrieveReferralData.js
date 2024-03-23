import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
import { client } from "../initSupabase";
import { currentUser } from "../../../src/app/store";

const sProject = client("project");
function computeAge(birthdate) {
	const dob = new Date(birthdate);
	const today = new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const m = today.getMonth() - dob.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
		age--;
	}
	return age;
}
const retrieveReferralData = {
	getPatients: async () => {
		const query = await sProject.from("patients").select("*");
		console.log(query);
		const patients = query.data.map((patient) => {
			return {
				name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
				age: computeAge(patient.personal_information.birthdate),
				id: patient.id,
			};
		});

		return patients;
	},
	getDoctors: async () => {
		const query = await sProject.from("doctors").select("*").not("id", "eq", currentUser.getState().info.id);

		const doctorsPromises = query.data.map(async (doctor) => {
			const specialization = await sProject
				.from("specializations")
				.select("doctor_specialization_name")
				.eq("id", doctor.specialization_id);
			const data = {
				name: `${doctor.first_name} ${doctor.last_name}`,
				age: computeAge(doctor.birthdate),
				id: doctor.id,
				specialization: specialization.data[0].doctor_specialization_name,
			};
			return data;
		});

		const doctors = await Promise.all(doctorsPromises);

		return doctors;
	},
};

export default retrieveReferralData;
