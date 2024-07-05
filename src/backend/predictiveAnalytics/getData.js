import { client } from "../initSupabase";
const supabase = client("project");

export const getPatients = async (patient_id) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", patient_id);
  return data[0];
};

export const getObservations = async (patient_id) => {
  const systolic = await supabase
    .from("observations")
    .select()
    .eq("resource->subject->>reference", patient_id)
    .eq("id", "systolic")
    .order("ts", { ascending: false })
    .limit(1);
  const sysBP = systolic.data[0].resource.valueQuantity.value;

  const diastolic = await supabase
    .from("observations")
    .select()
    .eq("resource->subject->>reference", patient_id)
    .eq("id", "diastolic")
    .order("ts", { ascending: false })
    .limit(1);
  const diaBP = diastolic.data[0].resource.valueQuantity.value;

  const BMIVal = await supabase
    .from("observations")
    .select()
    .eq("resource->subject->>reference", patient_id)
    .eq("id", "bmi")
    .order("ts", { ascending: false })
    .limit(1);

  const BMI = BMIVal.data[0].resource.valueQuantity.value;

  const rate = await supabase
    .from("observations")
    .select()
    .eq("resource->subject->>reference", patient_id)
    .eq("id", "heartRate")
    .order("ts", { ascending: false })
    .limit(1);
  const heartRate = rate.data[0].resource.valueQuantity.value;

  return {
    sysBP,
    diaBP,
    BMI,
    heartRate,
  };
};

export const getLabTests = async (patient_id) => {
  const response = await supabase
    .from("observations")
    .select()
    .eq("resource->subject->>reference", patient_id)
    .eq("id", "labtest")
    .order("ts", { ascending: false })
    .limit(1);

  const labtest = response.data[0];

  const valueQuantities = labtest.valueQuantity.valueQuantities;

  let cholesterol, glucose, sucrose;

  valueQuantities.forEach((item) => {
    switch (item.display) {
      case "Total Cholesterol":
        cholesterol = item.value;
        break;
      case "Glucose":
        glucose = item.value;
        break;
      case "Surcrose": // Assuming a typo in the original question, should be "Sucrose"
        sucrose = item.value;
        break;
    }
  });

  return {
    cholesterol,
    glucose,
  };
};
