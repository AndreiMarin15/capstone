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

export const importCarePlan = async (carePlan) => {
  const { data, error } = await supabase
    .from("careplan")
    .insert({ status: "created", resource: carePlan });
  return data ? data : error;
};
