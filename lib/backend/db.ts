import { supabase } from "../initSupabase";


export const db = {
	selectAllFrom: async (table: string) => {
		const { data: data } = await supabase.from(table).select();

		return data;
	},

	selectFrom: async (table: string, options: string) => {
		const { data: data } = await supabase.from(table).select(options);

		return data;
	},

	insertInto: async (table: string, colData: []) => {
		const { data, error } = await supabase.from(table).insert(colData);

		return error ? error : data;
	},

	updateTable: async (table: string, colData: {}, where: {}) => {
		const { data, error } = await supabase.from(table).update(colData).match(where);

		return error ? error : data;
	},

	deleteTable: async (table: string, where: {}) => {
		const { data, error } = await supabase.from(table).delete().match(where);

		return error ? error : data;
	},
};
