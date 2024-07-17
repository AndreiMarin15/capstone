import { PROJECT } from "../project/db";
import { doctor } from "./doctor";

const uploadMedicationComment = async ({ medication_id, comments }) => {
  console.log("Comment data received:", { medication_id, comments });
  
  try {
    const doctorInfo = await doctor.getDoctorByCurrentUser();
    console.log(doctorInfo)
   const commentData = {
      medication_id: medication_id,
      comments: comments,
      doctor: {
        fullName: doctorInfo.fullName,
        license_id: doctorInfo.license,
      }, 
    };

    // Insert comment data into Supabase
    const insertedComment = await PROJECT.insertInto(
      "medication_comments",
      commentData
    );

    console.log("Insertion response:", insertedComment);

    // Return the inserted comment or any other relevant data
    return insertedComment[0]?.id; // or return the whole insertedComment if needed
  } catch (error) {
    throw error;
  }
};

export default uploadMedicationComment;
