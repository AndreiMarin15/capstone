import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";

export const getMasterData = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const patient = await project.selectFrom("patient_information", {
    column: "id",
    value: user.id,
  });
  return patient[0];
};

export const getAllergies = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const patient = await project.selectFrom("allergy_list", {
    column: "id",
    value: user.id,
  });
  return patient[0];
};
const getAllergiesRaw = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const patient = await project.selectFrom("patients", {
    column: "id",
    value: user.id,
  });
  return patient[0].allergies;
};

export const updateAddAllergies = async (newAllergy) => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const allergies = await getAllergiesRaw();
  allergies.push(newAllergy);

  const res = await project.updateTable(
    "patients",
    { allergies: allergies },
    {
      id: user.id,
    }
  );
};