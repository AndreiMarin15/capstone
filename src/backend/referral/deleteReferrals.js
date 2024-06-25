import { client } from "../initSupabase";
import { currentUser } from "@/app/store";

const sProject = client("project");

export const deleteReferral = async (referralId) => {
	const deleted = await sProject.from("referrals").delete().eq("id", referralId);
	const deleteAttending = await deleteAttendingDoctor(referralId);
	console.log(deleteAttending);
	console.log(deleted);
	return deleted;
};

export const deleteAttendingDoctor = async (referralId) => {
	const referral = await sProject.from("referrals").select("*").eq("id", referralId);

	const patient_id = referral.data[0].patient_id;
	const referred_to = referral.data[0].referred_to;

	const deleted = await sProject
		.from("attending_doctors")
		.delete()
		.eq("patient_id", patient_id)
		.eq("doctor_id", referred_to);

	console.log(deleted);
	return deleted;
};
