import { client } from "../initSupabase";
import { currentUser } from "@/app/store";
const project = client("project");

export const getAttachments = async (patient_id) => {
	const user = currentUser.getState().user;

	const query = `uploaded_for.eq.${user.id},uploaded_by.eq.${user.id}`;
	const attachments = await project
		.from("attachments")
		.select("*")
		.or(query)
		.eq("patient_id", patient_id)
		.order("created_at", { ascending: false });

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
