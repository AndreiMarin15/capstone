import { PROJECT } from "../project/db"; // Adjust the import path as necessary

// const getCollaborationByPatientId = async (patientId) => {
//     try {
//         const collaborationData = await PROJECT.from('collaborations').select('*').eq('patientId', patientId);

//         if (collaborationData instanceof Error) {
//             throw collaborationData;
//         }

//         console.log("Fetched collaboration data:", collaborationData);
//         return collaborationData;
//     } catch (error) {
//         console.error("Error fetching collaboration data:", error);
//         throw error;
//     }
// };

const uploadCollaboration = async (collaboration) => {
    console.log("Collaboration data received:", collaboration);

    try {

        // Construct collaboration data for insertion
        const collaborationData = {
            doctor: collaboration.name,
            specialty: collaboration.specialty,
            note: collaboration.note,
            patient: collaboration.patient,
            patientId: collaboration.patientId,
        };
        console.log("Collaboration data to insert:", collaborationData);

        // Insert collaboration data into Supabase
        const insertedData = await PROJECT.insertInto('collaborations', [collaborationData]);

        if (insertedData instanceof Error) {
            throw insertedData;
        }
        
        console.log("Insertion response data:", insertedData);

        // Extract the ID of the newly inserted collaboration
        const insertedId = insertedData[0]?.id;
        console.log("Inserted collaboration ID:", insertedId);

        // Return the inserted ID or any other relevant data
        return insertedId;
    } catch (error) {
        console.error("Error uploading collaboration:", error);
        throw error;
    }
};

export default uploadCollaboration;
