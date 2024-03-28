import { PROJECT as project } from "../../project/db";
import { authentication as auth } from "../../auth";

export const getPatientRawData = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const patient = await project.selectFrom("patients", {
    column: "id",
    value: user.id,
  });
  return patient[0];
};

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
  const patientRawData = await getPatientRawData();
  return patientRawData.allergies;
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

export const getFamilyAndSocialHistory = async () => {
  const patientRawData = await getPatientRawData();
  return {
    familyHistory: patientRawData["family_history"],
    socialHistory: patientRawData["social_history"],
  };
};

// FOR DOCTOR
const getAllergiesRawDoctor = async (patientId) => {
  const patientRawData = await getPatientRawDataDoctor(patientId);
  return patientRawData.allergies;
};

const getPatientRawDataDoctor = async (user) => {
  const patient = await project.selectFrom("patients", {
    column: "id",
    value: user,
  });
  return patient[0];
};

export const getMasterDataDoctor = async (user) => {
  const patient = await project.selectFrom("patient_information", {
    column: "id",
    value: user,
  });
  return patient[0];
};

export const getAllergiesDoctor = async (user) => {
  const patient = await project.selectFrom("allergy_list", {
    column: "id",
    value: user,
  });
  return patient[0];
};

export const updateAddAllergiesDoctor = async (user, newAllergy) => {
  const allergies = await getAllergiesRawDoctor(user);
  allergies.push(newAllergy);

  const res = await project.updateTable(
    "patients",
    { allergies: allergies },
    {
      id: user,
    }
  );
};

export const getFamilyAndSocialHistoryDoctor = async (user) => {
  const patientRawData = await getPatientRawDataDoctor(user);
  return {
    familyHistory: patientRawData["family_history"],
    socialHistory: patientRawData["social_history"],
  };
};
