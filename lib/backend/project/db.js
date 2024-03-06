import { client } from "../initSupabase";

const supabase = client("project");
export const PROJECT = {
	selectAllFrom: async (table) => {
		const { data: data, error } = await supabase.from(table).select();

		return error ? error : data;
	},

	selectFrom: async (table, options) => {
		const { data: data } = await supabase.from(table).select("*").eq(options.column, options.value);
		
		// const options = {
		// 	column: "last_name",
		// 	value: "Doe"
		// }
		return data;
	},

	insertInto: async (table, colData) => {
		const { data, error } = await supabase.from(table).insert(colData);

		return error ? error : data;
	},

	updateTable: async (table, colData, where) => {
		const { data, error } = await supabase.from(table).update(colData).match(where);

		return error ? error : data;
	},

	deleteTable: async (table, where) => {
		const { data, error } = await supabase.from(table).delete().match(where);

		return error ? error : data;
	},
};
