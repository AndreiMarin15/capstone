import { PUBLIC } from "./public/db";
import { PROJECT } from "./project/db";
import { authentication } from "./auth";
export const DoctorSignUp = {
	selectSpecializations: async () => {
		const specializationQuery = await PROJECT.selectAllFrom("specializations");

		return specializationQuery;
	},

	signUpAsDoctor: async (doctorData) => {
		const account = await authentication.signUpNewUser(doctorData.email, doctorData.password);

		// console.log(account);
		// console.log(account.user.id);

		return account;
	},
};
