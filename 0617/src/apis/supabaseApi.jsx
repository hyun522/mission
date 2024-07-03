import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://qqghxjixcyspqgtbzcpt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_API;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
