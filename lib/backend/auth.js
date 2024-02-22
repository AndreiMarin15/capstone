import { PUBLIC } from "./public/db";
import { client as c } from "./initSupabase";
import { currentUser } from "../../src/app/store";

const client = c("public");
export const authentication = {
	mounted: async () => {
		client.auth.onAuthStateChange((_, session) => {
			if (session && session.user) {
				return true;
			}
			return false;
		});
	},

	mountUser: async () => {
		client.auth.onAuthStateChange((_, session) => {
			if (session && session.user) {
				console.log(currentUser.getState());
				currentUser.getState().setInfo(session.user);
			}
		});

		return currentUser.getState().info;
	},

	unmountUser: async () => {
		currentUser.getState().setInfo({});
	},

	signUpNewUser: async (email, password) => {
		const { data, error } = await client.auth.signUp({
			email: email,
			password: password,
		});

		return error ? error : data;
	},

	signInWithEmail: async (email, password) => {
		const { data, error } = await client.auth.signInWithPassword({
			email: email,
			password: password,
		});

		return error ? error : data;
	},

	signOut: async () => {
		const { error } = await client.auth.signOut();

		return error ? error : null;
	},
};
