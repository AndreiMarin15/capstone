import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";
import { client } from "../../initSupabase";
import { currentUser, useUserInfo, useDoctorInfo, usePatientInfo } from "../../../../src/app/store";
const supabase = client("project");
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

	getNotifications: async () => {},
};

export default dashboard;
