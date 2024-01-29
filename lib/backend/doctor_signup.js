import { db } from "./db";
import { authentication } from "./auth";
export const DoctorSignUp = {
	selectSpecializations: async () => {
		const specializationQuery = await db.selectAllFrom("doctor-specializations");

		return specializationQuery;
	},

    signUpAsDoctor: async (doctorData) => {
         authentication.signUpNewUser(doctorData.email, doctorData.password)

         
    }
};
