import { PROJECT } from "../project/db"; // Adjust the import path as necessary

const getCollaborationByPatientId = async (patientId) => {
    try {
        const collaborationData = await PROJECT.selectFrom('collaborations', { column: 'patientId', value: patientId });

        if (collaborationData instanceof Error) {
            throw collaborationData;
        }

        console.log("Fetched collaboration data:", collaborationData);
        return collaborationData;
    } catch (error) {
        console.error("Error fetching collaboration data:", error);
        throw error;
    }
};

export default getCollaborationByPatientId;
