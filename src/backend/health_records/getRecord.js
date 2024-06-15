import { PROJECT } from "../project/db";

export async function getRecord() {
  try {
    // Query all records from the 'other_records' table
    const otherRecords = await PROJECT.selectAllFrom('other_records');

    return otherRecords;
    
  } catch (error) {
    console.error('Exception thrown while fetching records:', error);
   
  }
}

export async function getRecordById(id) {
  try {
  
    const record = await PROJECT.selectFrom('other_records', {
      column: 'id',
      value: id

    });

    return record;
  } catch (error) {
    console.error('Exception thrown while fetching the record by ID:', error);
  }
}