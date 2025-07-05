import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('count', { count: 'exact', head: true });
    
    if (error) throw error;
    return { success: true, message: 'Conexiune reușită la baza de date' };
  } catch (error) {
    console.error('Eroare conexiune baza de date:', error);
    return { success: false, error: error.message };
  }
};
