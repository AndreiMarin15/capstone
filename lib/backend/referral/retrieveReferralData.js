import { PROJECT as project } from "../project/db";
import { authentication as auth } from "../auth";
import { client } from "../initSupabase";
import { currentUser } from "../../../src/app/store";
import { newChat } from "./referralMessages";

const sProject = client("project");
const sFhir = client("public");
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
const retrieveReferralData = {
	getPatients: async () => {
		const query = await sProject.from("patients").select("*");
		console.log(query);
		const patients = query.data.map((patient) => {
			return {
				name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
				age: computeAge(patient.personal_information.birthdate),
				id: patient.id,
				gender: patient.personal_information.gender,
			};
		});

		return patients;
	},
	getDoctors: async () => {
		const query = await sProject
			.from("doctors")
			.select("*")
			.not("id", "eq", currentUser.getState().info.id)
			.not("specialization_id", "eq", currentUser.getState().user.specialization_id);

		const doctorsPromises = query.data.map(async (doctor) => {
			const specialization = await sProject
				.from("specializations")
				.select("doctor_specialization_name")
				.eq("id", doctor.specialization_id);
			const data = {
				name: `${doctor.first_name} ${doctor.last_name}`,
				age: computeAge(doctor.birthdate),
				id: doctor.id,
				specialization: specialization.data[0].doctor_specialization_name,
			};
			return data;
		});

		const doctors = await Promise.all(doctorsPromises);

		return doctors;
	},

	getReferrals: async () => {
		console.log(currentUser.getState().info.id);
		const query = await sProject
			.from("referrals")
			.select("*")
			.or(`referred_to.eq.${currentUser.getState().info.id},referred_by.eq.${currentUser.getState().info.id}`);

		console.log(query);
		const referralsPromises = query.data.map(async (referral) => {
			const patient = await sProject.from("patients").select("personal_information").eq("id", referral.patient_id);
			const referred_by = await sProject
				.from("doctors")
				.select("first_name, last_name, specialization_id")
				.eq("id", referral.referred_by);
			const referred_to = await sProject
				.from("doctors")
				.select("first_name, last_name, specialization_id")
				.eq("id", referral.referred_to);

			console.log(referred_by);
			console.log(referred_to);

			const by_specialization = await sProject
				.from("specializations")
				.select("doctor_specialization_name")
				.eq("id", referred_by.data[0].specialization_id);

			const to_specialization = await sProject
				.from("specializations")
				.select("doctor_specialization_name")
				.eq("id", referred_to.data[0].specialization_id);

			console.log(by_specialization, to_specialization);
			console.log(referral.accepted);
			const displayAccept =
				referral.referred_to === currentUser.getState().info.id && referral.accepted !== true ? true : false;
			// kapag di ako nag refer, true, if ako nag refer, false
			const data = {
				patient: `${patient.data[0].personal_information.first_name} ${patient.data[0].personal_information.last_name}`,
				patient_id: referral.patient_id,
				referred_to: referral.referred_to,
				referred_by: referral.referred_by,
				id: referral.id,
				notes: referral.notes,
				display_accept: displayAccept,
				accepted: referral.accepted,
				name: displayAccept
					? referred_by.data[0].first_name + " " + referred_by.data[0].last_name
					: referred_to.data[0].first_name + " " + referred_to.data[0].last_name,
				specialty: displayAccept
					? by_specialization.data[0].doctor_specialization_name
					: to_specialization.data[0].doctor_specialization_name,
				chat_id: referral.chat_id,
			};
			return data;
		});

		const referrals = await Promise.all(referralsPromises);
		console.log(referrals);
		return referrals;
	},

	updateReferralRequest: async (referral_id, accepted) => {
		// try {
		const update = await sProject.from("referrals").update({ accepted: accepted }).eq("id", referral_id);
		console.log(update);

		if (accepted) {
			const referral = await sProject.from("referrals").select("*").eq("id", referral_id);

			const patient = await sProject.from("patients").select("*").eq("id", referral.data[0].patient_id);
			const referred_by = await sProject
				.from("doctors")
				.select("first_name, last_name, specialization_id")
				.eq("id", referral.data[0].referred_by);
			const referred_to = await sProject
				.from("doctors")
				.select("first_name, last_name, specialization_id")
				.eq("id", referral.data[0].referred_to);

			const to_specialization = await sProject
				.from("specializations")
				.select("doctor_specialization_name")
				.eq("id", referred_to.data[0].specialization_id);

			const updatePatient = await sProject
				.from("patients")
				.update({
					handled_by: {
						main_practitioner: patient.data[0].handled_by
							? patient.data[0].handled_by.main_practitioner
							: currentUser.getState().info.id,
						referred_practicioners: patient.data[0].handled_by
							? [...patient.data[0].handled_by.referred_practicioners, referral.data[0].referred_to]
							: [referral.data[0].referred_to],
					},
				})
				.eq("id", referral.data[0].patient_id);

			// Fetch the current resource
			const currentResource = await sFhir
				.from("patient")
				.select("resource")
				.contains("resource", { identifier: patient.data[0].id });

			// Add the general_practitioner to the current resource
			const updatedResource = {
				...currentResource.data[0].resource,
				general_practitioner: {
					type: "practitioner",
					identifier: [referral.data[0].referred_to],
				},
			};

			// Update the resource with the new value
			const updateFhirPatient = await sFhir
				.from("patient")
				.update({ resource: updatedResource })
				.contains("resource", { identifier: patient.data[0].id });

			console.log(updatePatient);
			console.log(updateFhirPatient);

			return {
				patient: `${patient.data[0].personal_information.first_name} ${patient.data[0].personal_information.last_name}`,
				patient_id: referral.data[0].patient_id,
				referred_to: referral.data[0].referred_to,
				referred_by: referral.data[0].referred_by,
				id: referral.data[0].id,
				notes: referral.data[0].notes,
				display_accept: false,
				accepted: true,
				name: referred_to.data[0].first_name + " " + referred_to.data[0].last_name,
				specialty: to_specialization.data[0].doctor_specialization_name,
			};
		}
		// } catch (err) {
		// 	console.log(err);
		// }
	},
};

export default retrieveReferralData;
