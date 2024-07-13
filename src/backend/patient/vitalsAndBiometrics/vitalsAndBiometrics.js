import { PROJECT as project, supabase } from "../../project/db";
import { supabase as publicSupabase } from "../../public/db";
import { authentication as auth } from "../../auth";
import { useRecordValidity } from "@/app/store";
const recordValidity = useRecordValidity.getState();
export const getVitalsAndBiometrics = async () => {
	const result = await auth.getSession();
	const user = await result.session.user;
	const query = await supabase.rpc("get_vitals_and_biometrics", {
		user_id: user.id,
	});
	const sortedJson = {};
	const data = query.data[0]?.data;

	if (data == {}) {
		const dataKeys = Object.keys(data);
		if (dataKeys) {
			dataKeys?.sort((a, b) => new Date(a) - new Date(b));

			// Create a new sorted JSON object
			dataKeys.forEach((key) => {
				sortedJson[key] = data[key];
			});
		}
		return sortedJson;
		console.log(data);
	}
	return data;
};

export const getBP = async () => {
	const result = await auth.getSession();
	const user = await result.session.user;
	const { data, error } = await supabase.rpc("get_bp", {
		user_id: user.id,
	});
	return data ?? error;
};

export const getHeartRate = async () => {
	const result = await auth.getSession();
	const user = await result.session.user;
	const { data, error } = await supabase.rpc("get_heart_rate", {
		user_id: user.id,
	});
	return data ?? error;
};

export const getBiometrics = async () => {
	const result = await auth.getSession();
	const user = await result.session.user;
	const { data, error } = await supabase.rpc("get_biometrics", {
		user_id: user.id,
	});
	return data[0] ?? error;
};

// doctor
export const getVitalsAndBiometricsDoctor = async (userId) => {
	const query = await supabase.rpc("get_vitals_and_biometrics", {
		user_id: userId,
	});
	console.log("VITALSQUERY",query);
	const sortedJson = {};
	const data = query.data[0]?.data;
	console.log("VITALSDATA",data);
	if (data == {}) {
		const dataKeys = Object.keys(data);
		if (dataKeys) {
			dataKeys?.sort((a, b) => new Date(a) - new Date(b));

			// Create a new sorted JSON object
			dataKeys.forEach((key) => {
				sortedJson[key] = data[key];
			});
		}
		return sortedJson;
	}
	console.log(data);
	return data;
};

const test = async (userId) => {
	const query = await supabase.rpc("get_vitals_and_biometrics", {
		user_id: userId,
	});
	const sortedJson = {};
	const data = query.data[0]?.data;

	if (data && Object.keys(data).length > 0) {
		const dataKeys = Object.keys(data);
		const filteredKeys = dataKeys.filter((key) => {
			// Include the key if both start and end dates are null, or if the key is within the range
			return (
				(recordValidity.start === null && recordValidity.end === null) ||
				(key >= recordValidity.start && key <= recordValidity.end)
			);
		});

		filteredKeys.sort((a, b) => new Date(a) - new Date(b));

		// Create a new sorted and filtered JSON object
		filteredKeys.forEach((key) => {
			sortedJson[key] = data[key];
		});

		console.log(sortedJson);
		return sortedJson;
	}

	console.log(data);
	return data;
};

export const getBPDoctor = async (userId) => {
	const { data, error } = await supabase.rpc("get_bp", {
		user_id: userId,
	});
	return data ?? error;
};

export const getHeartRateDoctor = async (userId) => {
	const { data, error } = await supabase.rpc("get_heart_rate", {
		user_id: userId,
	});
	return data ?? error;
};

export const getBiometricsDoctor = async (userId) => {
	const { data, error } = await supabase.rpc("get_biometrics", {
		user_id: userId,
	});
	return data[0] ?? error;
};

export const importVitalsAndBiometrics = async (data) => {
	const result = await auth.getSession();
	const user = await result.session.user;

	const { error } = await publicSupabase.from("observation").insert(data);
	return error;
};
