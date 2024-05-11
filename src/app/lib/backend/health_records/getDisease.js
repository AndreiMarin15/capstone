
import { PROJECT } from "../project/db";

export const retrieveDisease = async () => {
  const disease = await PROJECT.selectAllFrom("icd10");
  console.log(disease)
  return disease;
};

