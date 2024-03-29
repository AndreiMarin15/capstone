import { PUBLIC } from "../public/db";

export const uploadObservation = async (observation) => {
    try {
      // Modify the observation object as needed before inserting into the database
      const observationData = {
        status: "created",
        resource:{
        id: observation.id,
        code: {
          coding: [
            {
              code: observation.code.coding[0].code,
              system: observation.code.coding[0].system
            }
          ]
        },
        subject: {
            type: observation.subject.type,
            reference: observation.subject.reference || '',
        },
        resource_type: observation.resource_type,
        
        valueQuantity:{
            unit: observation.valueQuantity.unit,
           value: observation.valueQuantity.value,
        },
        effectiveDateTime: observation.effectiveDateTime,
        codeText: observation.codeText,
        imageSrc: observation.imageSrc,
            }
      };
  
      // Insert the modified observation data into the 'observation' table
      const insertedObservation = await PUBLIC.insertInto('observation',observationData);

      
      // Return the inserted observation
      return insertedObservation;
    } catch (error) {
      // Handle errors
      console.error("Error uploading observation:", error.message);
      return { error: error.message };
    }
  };
  