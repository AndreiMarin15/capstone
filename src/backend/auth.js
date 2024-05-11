import { client as c } from "./initSupabase";
import { currentUser, useUserInfo, useDoctorInfo, usePatientInfo } from "@/app/store";

const client = c("public");
export const authentication = {
	getSession: async () => {
		const { data, error } = await client.auth.getSession();

		return error ? error : data;
	},

	mountUser: async () => {
		client.auth.onAuthStateChange((_, session) => {
			if (session && session.user) {
				currentUser.getState().setInfo(session.user);
			}
		});
		console.log(currentUser.getState().info);

		return currentUser.getState().info;
	},

	unmountUser: async () => {
		await currentUser.getState().setInfo({});
		await useUserInfo.getState().setEmail("");
		await useUserInfo.getState().setPassword("");
		await useDoctorInfo.getState().reset();
		await usePatientInfo.getState().reset();

		client.auth.setSession({});
	},

	signUpNewUser: async (email, password) => {
		const { data, error } = await client.auth.signUp({
			email: email,
			password: password,
		});

		if (!error) {
			authentication.mountUser();
		}

		return error ? error : data;
	},

	signInWithEmail: async (email, password) => {
		const { data, error } = await client.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (!error) {
			authentication.mountUser();
		}

		return error ? error : data;
	},

	signOut: async () => {
		const { error } = await client.auth.signOut();

		if (!error) {
			authentication.unmountUser();
		}

		return error ? error : null;
	},
};
