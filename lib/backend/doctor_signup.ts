import { db } from "./db";
import { authentication } from "./auth";
export const DoctorSignUp = {
	selectSpecializations: async () => {
		const specializationQuery = await db.selectAllFrom("doctor-specializations");

		return specializationQuery;
	},

    // signUpAsDoctor: async (email: string, password: string, doctorData: {}) => {
    //      authentication.signUpNewUser()
    // }
};
