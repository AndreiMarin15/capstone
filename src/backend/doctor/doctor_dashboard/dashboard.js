import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";
import { client } from "../../initSupabase";
import { currentUser, useUserInfo, useDoctorInfo, usePatientInfo } from "@/app/store";
const supabase = client("project");
const dashboard = {
	getDoctorData: async () => {
		const result = await auth.getSession();
		const user = await result?.session?.user;

		const doctor = await project.selectFrom("doctors", {
			column: "id",
			value: user.id,
		});
		const specialization = await project.selectFrom("specializations", {
			column: "id",
			value: doctor[0].specialization_id,
		});
		return {
			name: `${doctor[0].first_name} ${doctor[0].last_name}`,
			specialization: specialization[0].doctor_specialization_name,
			yearsOfExperience: doctor[0].years_of_practice,
			about: doctor[0].about,
			photo:
				doctor[0].photo ??
				"https://cdn.builder.io/api/v1/image/assets/TEMP/e08e006064acc91eb2be418d8e3ebc37f55fda5b8a64767df11d658a5723ca26?apiKey=66e07193974a40e683930e95115a1cfd&",
		};
	},

	getPatients: async () => {
		const patients = await project.selectAllFrom("patients");

		console.log(patients);
		const toReturn = patients.filter((patient) => {
			console.log(patient);
			if (patient.handled_by?.main_practitioner === currentUser.getState().info.id) {
				if (patient.handled_by.referred_practitioners?.length > 0) {
					return patient;
				}
			}
		});
		console.log(toReturn);
		return toReturn;
	},

	getHandledBy: async (doctorIds) => {
		console.log(doctorIds);
		const doctors = await supabase.from("doctors").select().in("id", doctorIds);

		console.log(doctors);
		return doctors;
	},

	updateDoctorInfo: async (about, yearsOfPractice) => {
		const update = await supabase
			.from("doctors")
			.update({ about, years_of_practice: yearsOfPractice })
			.match({ id: currentUser.getState().info.id });

		console.log(update);
	},

	getNotifications: async () => {},
};

export default dashboard;
