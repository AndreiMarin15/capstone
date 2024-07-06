import { supabase } from "../../public/db";
import { currentUser } from "@/app/store";
import { sendNotification } from "@/backend/sendNotification";
export const careplanInfo = {
  getCareplanInformation: async (patientID) => {
    const { data, error } = await supabase
      .from("careplan")
      .select("*")
      .eq("resource->subject->>reference", patientID);
    console.log(data);
    return data ? data : error;
  },
};

export const importCarePlan = async (carePlan) => {
  const { data, error } = await supabase
    .from("careplan")
    .insert({ status: "created", resource: carePlan });

  await fetch("http://localhost:6001/endotracker/careplan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carePlan),
  });

  await sendNotification(
    carePlan.subject.reference,
    "New Care Plan",
    "You have a new care plan",
    currentUser.getState().user.id
  );
  return data ? data : error;
};
