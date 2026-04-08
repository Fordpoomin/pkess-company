import { createClient } from "https://esm.sh/@supabase/supabase-js";

// REPLACE WITH YOUR URL AND PUBLIC KEY BELOW
const SUPABASE_URL = "{{https://xzhkisvxuxqhatqnxbyj.supabase.co}}";
const SUPABASE_PUBLIC_KEY = "{{sb_publishable_eW1h26naHmtx-CxAgDFe_g_kgUIrvfY}}";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
