import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://qqghxjixcyspqgtbzcpt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ2h4aml4Y3lzcHFndGJ6Y3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTI2NTYsImV4cCI6MjAzMzQyODY1Nn0.ahTNdiwIK_dAj4kb0A7lafaaq3OwYHBWGS6GNQ0yiCU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
