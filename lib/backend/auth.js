import { supabase } from "../initSupabase";

export const authentication = {
	signUpNewUser: async (email, password) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		return error ? error : data;
	},

	signInWithEmail: async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		return error ? error : data;
	},

	signOut: async () => {
		const { error } = await supabase.auth.signOut();

		return error ? error : null;
	},
};
