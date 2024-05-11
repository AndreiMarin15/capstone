import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";

const referral = {
	getDoctorData: async (doctor_email) => {
		const doctor = await project.selectFrom("doctors", {
			column: "email",
			value: doctor_email,
		});

		const data = doctor[0];

		return data;
	},

	getDoctorSpecialization: async (specialization_id) => {
		const specialization = await project.selectFrom("specializations", {
			column: "id",
			value: specialization_id,
		});

		const data = specialization[0];

		return data.doctor_specialization_name;
	},
};

export default referral;
