import { client } from "../initSupabase";
import { currentUser } from "@/app/store";
const project = client("project");

export const getAttachments = async (patient_id, referred_to, referred_by) => {
	const user = currentUser.getState().user;

	// Corrected query to ensure proper logical grouping and syntax

	// const query =
	// 	`(uploaded_for.eq.${referred_to}|uploaded_by.eq.${referred_to})&` +
	// 	`(uploaded_for.eq.${referred_by}|uploaded_by.eq.${referred_by})&` +
	// 	`(referred_to.eq.${user.id}|referred_by.eq.${user.id})&` +
	// 	`patient_id.eq.${patient_id}`;

	// const attachments = await project.from("attachments").select("*").or(query).order("created_at", { ascending: false });
	const attachments = await project
		.from("attachments")
		.select("*")
		.or(`uploaded_for.eq.${referred_to},uploaded_by.eq.${referred_to}`)
		.or(`uploaded_for.eq.${referred_by},uploaded_by.eq.${referred_by}`)
		.or(`uploaded_for.eq.${user.id},uploaded_by.eq.${user.id}`)
		.eq("patient_id", patient_id);

	console.log("ATTACHMENTS", attachments);
	return attachments.data;
};

export const addAttachment = async (attachment, recepient, patient_id) => {
	const user = currentUser.getState().user;
	console.log("USER", user);
	const data = {
		...attachment,
		uploaded_for: recepient,
		uploaded_by: user.id,
		patient_id: patient_id,
	};

	const result = await project.from("attachments").insert([data]);
	console.log("RESULT", result);
	return result;
};
