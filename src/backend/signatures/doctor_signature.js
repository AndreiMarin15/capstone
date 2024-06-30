import { currentUser } from "@/app/store";
import { useSignature } from "@/app/store";
import { client } from "@/backend/initSupabase";

const project = client("project");

export const uploadSignature = async () => {
	const update = await project
		.from("doctors")
		.update({ signature: useSignature.getState().signature })
		.eq("id", currentUser.getState().info.id);

	console.log(update);
};
