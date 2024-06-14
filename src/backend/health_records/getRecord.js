import { PROJECT } from "../project/db"; // Assuming this imports Supabase client instance

export async function getRecord() {
  try {
    // Query all records from the 'other_records' table
    const otherRecords = await PROJECT.selectAllFrom('other_records');

    return otherRecords;
    
  } catch (error) {
    console.error('Exception thrown while fetching records:', error);
   
  }
}
