import { currentUser } from "@/app/store";
import { login } from "../login/login";

export const doctor = {
	getDoctorByCurrentUser: async () => {
		const { user } = currentUser.getState();
		console.log(user)
		if (user && user.fullName) {
			const fullName = user.fullName;
			const type = user.type;
			const license = user.license_id;
			console.log("Full Name:", fullName);
			console.log("type:", type);
			console.log(license)

			return { fullName, type, license };
		} else {
			console.log("Full name not available for current user.");
			return null;
		}
	},
};

export default doctor;
