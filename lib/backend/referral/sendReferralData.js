import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
import { client } from "../initSupabase";
import { currentUser } from "../../../src/app/store";

const sProject = client("project");
function computeAge(birthdate) {
	const dob = new Date(birthdate);
	const today = new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const m = today.getMonth() - dob.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
		age--;
	}
	return age;
}
const sendReferralData = {
	newReferralRequest: async (data) => {
		const referralData = {
			patient_id: data.patient_id,
			referred_to: data.doctor_id,
			referred_by: currentUser.getState().info.id,
			notes: data.notes,
		};

        console.log(referralData)
		const referral = await project.insertInto("referrals", referralData);
		console.log(referral);

		return referral;
	},
	acceptReferralRequest: async (referral_id) => {
		const referral = await project.updateTable("referrals", { accepted: true }, { id: referral_id });

		console.log(referral);
		return referral;
	},
};

export default sendReferralData;
