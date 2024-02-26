import { usePatientInfo } from "../../../src/app/store";
import { PROJECT } from "../project/db";

export const setPatient = {
  setPatientInfo: async (patientInfo) => {
    const patientInfo = await PROJECT.insertInto("patient", patientInfo);
  },
};
