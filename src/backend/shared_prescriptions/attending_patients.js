import { PROJECT } from "../project/db";
import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";
import { currentUser } from "@/app/store";

const supabase = client("public");
const proj = client("project");
export const attendingPatients = {
  getPatients: async () => {
    console.log("user", currentUser.getState().info.id);
    const { data: attendingPatients, error } = await proj
      .from("attending_doctors")
      .select("*")
      .eq("doctor_id", currentUser.getState().info.id);

    console.log(attendingPatients);
    console.log(error);

    const patientIds = attendingPatients.map((patient) => patient.patient_id);

    const { data: patients } = await proj
      .from("patients")
      .select("*")
      .in("id", patientIds);

    console.log(patients);
    return patients;
  },

  getPatientData: async (patientId) => {
    const patient = await PROJECT.selectFrom("patients", {
      column: "id",
      value: patientId,
    });

    console.log(patient);
    return patient[0];
  },

  getPatientFhirData: async (patientId) => {
    const { data: patient } = await supabase
      .from("patient")
      .select("*")
      .contains("resource", { identifier: patientId });

    return patient[0];
  },
};
