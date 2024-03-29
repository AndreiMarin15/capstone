import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";
import { supabase } from "../../project/db";
import { currentUser, useUserInfo, useDoctorInfo, usePatientInfo } from "../../../../src/app/store";

const dashboard = {
	getDoctorData: async () => {
		const result = await auth.getSession();
		const user = await result.session.user;

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
		};
	},

	getPatients: async () => {
		const patients = await project.selectAllFrom("patients");

		console.log(patients);

		return patients;
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
