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

		return letters.data;
	},

	getPatient: async () => {
		const patient = await supabase.from("patients").select("*").eq("id", currentUser.getState().info.id);

		return patient.data[0];
	},

	getLetter: async (id) => {
		const letter = await supabase.from("written_referrals").select("*").eq("id", id);

		return letter.data[0];
	},

	getDoctor: async (license_id) => {
		const doctor = await supabase.from("doctors").select("*").eq("license_id", license_id);

		return doctor.data[0];
	},
};

export default referralLetters;
