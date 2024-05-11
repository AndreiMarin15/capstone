import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
import { currentUser } from "@/app/store";
import { client } from "../initSupabase";
const supabase = client("project");
const referralLetters = {
	getLetters: async () => {
		const letters = await supabase
			.from("written_referrals")
			.select("*")
			.eq("patient_id", currentUser.getState().info.id);

		console.log(letters);
		return letters.data;
	},

	getLetter: async (id) => {
		const letter = await supabase.from("written_referrals").select("*").eq("id", id);

		return letter.data[0];
	},
};

export default referralLetters;
