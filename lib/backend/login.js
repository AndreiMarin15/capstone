import { authentication } from "./auth";
import { currentUser, useUserInfo } from "../../src/app/store";
import { PROJECT } from "./project/db";

export const login = {
	loginUser: async () => {
		const user = await authentication.signInWithEmail(useUserInfo.getState().email, useUserInfo.getState().password);
		authentication.mountUser();
		console.log(currentUser.getState());
		console.log(useUserInfo.getState());
		console.log(user);

		return user;
	},

	getUserType: async (user) => {
		let query = {};
		console.log(currentUser.getState().info);
		if (currentUser.getState().info.id) {
			query = await PROJECT.selectFrom("doctors", { column: "id", value: currentUser.getState().info.id });
			console.log(query.length);

			if (!query.length) {
				query = await PROJECT.selectFrom("patients", { column: "id", value: currentUser.getState().info.id });
				console.log(query);
				if (!query.length) {
					return null;
				}

				return "patient";
			}
			return "doctor";
		}

		return null;
	},
};
