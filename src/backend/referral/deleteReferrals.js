import { client } from "../initSupabase";
import { currentUser } from "@/app/store";

const sProject = client("project");

export const deleteReferral = async (referralId) => {
  const referral_chat_id = await sProject
    .from("referrals")
    .select("chat_id")
    .eq("id", referralId);
  const chat_id = referral_chat_id.data[0].chat_id;
  const messegaes_header = await sProject
    .from("messages_header_referrals")
    .delete()
    .eq("chat_id", chat_id);
  console.log(messegaes_header);

  const messages = await sProject
    .from("messages_referrals")
    .delete()
    .eq("message_header_id", chat_id);
  console.log(messages);
  const deleted = await sProject
    .from("referrals")
    .delete()
    .eq("id", referralId);
  const deleteAttending = await deleteAttendingDoctor(referralId);
  console.log(deleteAttending);
  console.log(deleted);
  return deleted;
};

export const deleteAttendingDoctor = async (referralId) => {
  const referral = await sProject
    .from("referrals")
    .select("*")
    .eq("id", referralId);
  console.log(referral);
  const patient_id = referral?.data[0]?.patient_id;
  const referred_to = referral?.data[0]?.referred_to;

  const deleted = await sProject
    .from("attending_doctors")
    .delete()
    .eq("patient_id", patient_id)
    .eq("doctor_id", referred_to);

  console.log(deleted);
  return deleted;
};
