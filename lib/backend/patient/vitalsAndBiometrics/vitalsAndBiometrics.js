import { PROJECT as project, supabase } from "../../project/db";
import { authentication as auth } from "../../auth";

export const getVitalsAndBiometrics = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const query = await supabase.rpc("get_vitals_and_biometrics", {
    user_id: user.id,
  });
  const sortedJson = {};
  const data = query.data[0]?.data;
  const dataKeys = Object.keys(data);
  if (dataKeys) {
    dataKeys.sort((a, b) => new Date(a) - new Date(b));

    // Create a new sorted JSON object
    dataKeys.forEach((key) => {
      sortedJson[key] = data[key];
    });
  }
  return sortedJson;
};

export const getBP = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const { data, error } = await supabase.rpc("get_bp", {
    user_id: user.id,
  });
  return data ?? error;
};

export const getHeartRate = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const { data, error } = await supabase.rpc("get_heart_rate", {
    user_id: user.id,
  });
  return data ?? error;
};

export const getBiometrics = async () => {
  const result = await auth.getSession();
  const user = await result.session.user;
  const { data, error } = await supabase.rpc("get_biometrics", {
    user_id: user.id,
  });
  return data[0] ?? error;
};
