import { PROJECT } from "../project/db";

const getMedicationComments = async (medication_id) => {
    try {
		const commentsData = await PROJECT.selectAllFrom("medication_comments");
		return commentsData;
	} catch (error) {
		console.error("Error fetching comments:", error);
		throw error;
	}
};

export default getMedicationComments;