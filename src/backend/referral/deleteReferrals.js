import { client } from "../initSupabase";
import { currentUser } from "@/app/store";

const sProject = client("project");

export const deleteReferral = async (referralId) => {
	const deleted = await sProject.from("referrals").delete().eq("id", referralId);
	console.log(deleted);
	return deleted;
};
