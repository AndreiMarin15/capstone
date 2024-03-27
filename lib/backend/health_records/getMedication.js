
import { PROJECT } from "../project/db";

export const retrieveMedications = async () => {
  const drugs = await PROJECT.selectAllFrom("doh-drug");
  return drugs;
};
