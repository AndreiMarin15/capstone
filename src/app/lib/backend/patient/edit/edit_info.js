// import { PUBLIC } from "../../public/db";
// import { PROJECT } from "../../project/db";
// import { client } from "../../initSupabase";
// import { authentication } from "../../auth";
// import { currentUser } from "../../../../src/app/store";
// import { newChat } from "../../message/getMessages";
// const supabase = client("project");

// export const UpdateFamilyMemberHistory = async (patientId, familyHistoryData) => {
//     try {
//         for (const familyMember of familyHistoryData) {
//             const { data, error } = await PUBLIC.insertIntoNoSelect("familymemberhistory", {
//                 identifier: patientId,
//                 patient: patientId,
//                 name: `${familyMember.first_name} ${familyMember.last_name}`,
//                 relationship: familyMember.relationship,
//                 sex: familyMember.gender,
//                 age: familyMember.age,
//                 condition: {
//                     code: familyMember.medical_condition,
//                     outcome: familyMember.medical_condition_outcome,
//                     onset: familyMember.medical_condition_date,
//                 },
//                 procedure: familyMember.medical_procedures,
//             });

//             if (error) {
//                 console.error("Error inserting family member history:", error);
//                 return { success: false, message: "Failed to update family member history." };
//             }
//         }

//         return { success: true, message: "Family member history updated successfully." };
//     } catch (error) {
//         console.error("Error updating family member history:", error);
//         return { success: false, message: "Failed to update family member history." };
//     }
// };
import { PUBLIC } from "../../../lib/backend/public/db";
import { PROJECT } from "../../../lib/backend/project/db";
import { client } from "../../initSupabase";
import { authentication } from "../../auth";

const supabase = client("project");

export const PatientEditInfo = {
	updateMasterData: async (userId, updatedInfo) => {
		// Assuming updatedInfo contains the fields to be updated
		// and userId is the identifier for the patient to be updated

		// Update patient information in the database
		const { data, error } = await supabase
			.from("patients")
			.update({ personal_information: updatedInfo })
			.eq("id", userId);

		if (error) {
			console.error("Error updating master data: ", error);
			return { message: "Error updating master data", error };
		} else {
			console.log("Master data updated successfully: ", data);
			return { message: "Master data updated successfully", data };
		}
	},
};
