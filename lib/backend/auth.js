import { PUBLIC } from "./public/db";
import { client as c } from "./initSupabase";
const supabase = PUBLIC;

const client = c("public");

export const authentication = {
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
