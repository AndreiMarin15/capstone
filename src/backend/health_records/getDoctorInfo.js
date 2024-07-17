import { PROJECT } from "../project/db";

const getDoctorInfo = async () => {
    try {
		const doctorData = await PROJECT.selectAllFrom("doctors");
		return doctorData;
	} catch (error) {
		console.error("Error fetching comments:", error);
		throw error;
	}
};

export default getDoctorInfo;
