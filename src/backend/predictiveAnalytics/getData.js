import { client } from "../initSupabase";
const supabase = client("project");
const supa = client("public");
export const getPatient = async (patient_id) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", patient_id.patientId);
  return data[0];
};

export const getObservations = async (patient_id) => {
  console.log("PATIENT ID", patient_id.patientId);
  const systolic = await supa
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patient_id.patientId)
    .eq("resource->>id", "systolic")
    .order("ts", { ascending: false })
    .limit(1);
  console.log("SYSTOLIC", systolic);
  const sysBP = systolic.data[0].resource.valueQuantity.value ?? 0;

  const diastolic = await supa
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patient_id.patientId)
    .eq("resource->>id", "diastolic")
    .order("ts", { ascending: false })
    .limit(1);
  console.log("DIASTOLIC", diastolic);
  const diaBP = diastolic.data[0].resource.valueQuantity.value ?? 0;

  const BMIVal = await supa
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patient_id.patientId)
    .eq("resource->>id", "bmi")
    .order("ts", { ascending: false })
    .limit(1);
  console.log("BMI", BMIVal);
  const BMI = BMIVal.data[0].resource.valueQuantity.value;

  const rate = await supa
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patient_id.patientId)
    .eq("resource->>id", "heartRate")
    .order("ts", { ascending: false })
    .limit(1);
  console.log("HEART RATE", rate);
  const heartRate = rate.data[0].resource.valueQuantity.value;

  return {
    sysBP,
    diaBP,
    BMI,
    heartRate,
  };
};

export const getLabTests = async (patient_id) => {
  const response = await supa
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patient_id.patientId)
    .eq("resource->>id", "labtest")
    .order("ts", { ascending: false })
    .limit(1);

  console.log("LAB TEST RESPONSE", response);
  const labtest = response.data[0];

  const valueQuantities = labtest?.resource?.valueQuantity?.valueQuantities;
  console.log("VALUE QUANTITIES", valueQuantities);
  let cholesterol, glucose, sucrose;

  Array.isArray(valueQuantities) &&
    valueQuantities.forEach((item) => {
      switch (item.display) {
        case "Total Cholesterol":
          cholesterol = item.value ?? 0;
          break;
        case "Glucose":
          glucose = item.value ?? 0;
          break;
        case "Surcrose": // Assuming a typo in the original question, should be "Sucrose"
          sucrose = item.value ?? 0;
          break;
      }
    });

  console.log("CHOLESTEROL", cholesterol);
  console.log("GLUCOSE", glucose);
  return {
    totChol: cholesterol,
    glucose,
  };
};
