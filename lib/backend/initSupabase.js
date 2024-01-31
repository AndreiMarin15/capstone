import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function client(schema) {
	const option = {
		db: { schema: schema },
	};
	return createClient(supabaseUrl, supabaseAnonKey, option);
}
