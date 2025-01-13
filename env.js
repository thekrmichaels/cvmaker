const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_CVMAKER_API } =
  import.meta.env;

const Supabase = {
  supabaseUrl: VITE_SUPABASE_URL,
  supabaseKey: VITE_SUPABASE_ANON_KEY,
};

export { Supabase, VITE_CVMAKER_API as CVMaker_API };
