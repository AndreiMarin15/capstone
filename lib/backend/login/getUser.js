
import { currentUser, useUserInfo } from "../../../src/app/store";
import { PROJECT } from "../project/db";

export const getUser = {
	getPatientName: async () => {
		const patient = await PROJECT.selectFrom("patients", { column: "id", value: currentUser.getState().info.id });

		const firstName = patient.personal_information.first_name;
		const lastName = patient.personal_information.last_name;

		return `${firstName} ${lastName}`;
	},
};
