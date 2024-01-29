import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vtciatzxvkkgtutukoil.supabase.co";
const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Y2lhdHp4dmtrZ3R1dHVrb2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTc2MTUsImV4cCI6MjAxNzUzMzYxNX0.WXXhafW7nm_aHs0f-RebsqhCLnxesbT9c9G1uQOAFsw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
