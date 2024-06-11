import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
import { client } from "../initSupabase";
import { currentUser } from "@/app/store";
import { newChat } from "./referralMessages";
import { sendNotification, updateNotification, getNotifications } from "../sendNotification";
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
		const chatId = await newChat(data.doctor_id);

		console.log(chatId);
		const referralData = {
			patient_id: data.patient_id,
			referred_to: data.doctor_id,
			referred_by: currentUser.getState().info.id,
			notes: data.notes,
			chat_id: chatId[0].id,
		};

		console.log(referralData);
		const referral = await project.insertInto("referrals", referralData);
		sendNotification(data.doctor_id, "Referral", "You have a new referral request", currentUser.getState().info.id);
		console.log(referral);

		return referral;
	},

	referManyPatients: async (patients, selectedDoctorId, notes) => {
		console.log(patients, selectedDoctorId, notes);
		patients.forEach(async (patient) => {
			const chatId = await newChat(selectedDoctorId);

			const data = {
				referred_by: currentUser.getState().info.id,
				referred_to: selectedDoctorId,
				patient_id: patient.resource?.subject?.reference,
				chat_id: chatId[0].id,
				notes: notes,
			};
			const referral = await project.insertInto("referrals", data);
			sendNotification(selectedDoctorId, "Referral", "You have a new referral request", currentUser.getState().info.id);
			console.log(referral);
		});
		return true;
	},
	acceptReferralRequest: async (referral_id) => {
		const referral = await project.updateTable("referrals", { accepted: true }, { id: referral_id });

		console.log(referral);
		return referral;
	},
	sendWrittenReferral: async (data, patient) => {
		const toInsert = {
			patient_id: patient,
			doctor_id: currentUser.getState().info.id,
			doctor_license: currentUser.getState().user.license_id,
			referral_data: data,
		};

		const referral = await project.insertInto("written_referrals", toInsert);
		sendNotification(patient, "Referral", "You have a new written referral", currentUser.getState().info.id);
		console.log(referral);

		return referral;
	},
};

export default sendReferralData;
