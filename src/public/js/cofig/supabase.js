
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const SUPABASE_URL = "https://nldmtwggyobypqntjawy.supabase.co";
const SUPABASE_KEY = "sb_publishable_8YASRjBzyuZc7Gw4LTyCLg_7ZA2B_Vp";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);