import { PROJECT } from "../project/db";
import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";
import { currentUser } from "@/app/store";

const supabase = client("public");
const proj = client("project");
export const healthRecords = {
  getPatients: async () => {
    console.log("user", currentUser.getState().info.id);
    const { data: patients, error } = await proj
      .from("patients")
      .select("*")
      .contains("handled_by", {
        main_practitioner: currentUser.getState().info.id,
      });

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
