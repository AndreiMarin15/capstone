import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
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
const retrieveData = {
	getPatients: async () => {},
	getDoctors: async () => {},
};

export default retrieveData;
