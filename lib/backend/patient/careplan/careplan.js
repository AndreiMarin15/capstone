import { supabase } from "../../public/db";

export const careplanInfo = {
  getCareplanInformation: async (patientID) => {
    const { data, error } = await supabase
      .from("careplan")
      .select("*")
      .eq("resource->subject->>reference", patientID);
    return data ? data : error;
  },
};
