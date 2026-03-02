import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const PROXY_URL = "https://proxy.arunkumarsurla1.workers.dev";

export const supabase = createClient(PROXY_URL, supabaseAnonKey);

