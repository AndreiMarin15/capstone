import { PROJECT } from "../project/db"; // Assuming this imports Supabase client instance


export async function uploadRecord({ title, description, upload, patientInfo, doctorInfo }) {
    // Prepare the resource data
    const resource = {
      title: title,
      description: description,
      upload: upload,
      subject: {
        type: "patient",
        reference: patientInfo.subject.reference,
      },
      participant: {
        type: doctorInfo.type,
        actor: doctorInfo.fullName,
        license: doctorInfo.license,
      },
    };
  
    // Insert the record into the database
    const { data, error } = await PROJECT.insertInto('other_records', { resource });
  
    if (error) {
      console.error('Error uploading record:', error);
      return { success: false, error };
    }
  
    return { success: true, data };
}