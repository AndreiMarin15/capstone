import { currentUser } from "@/app/store";
import { login } from "../login/login";

export const doctor = {
	getDoctorByCurrentUser: async () => {
		const { user } = currentUser.getState();

		if (user && user.fullName) {
			const fullName = user.fullName;
			const type = user.type;

			console.log("Full Name:", fullName);
			console.log("type:", type);

			return { fullName, type };
		} else {
			console.log("Full name not available for current user.");
			return null;
		}
	},
};

export default doctor;
