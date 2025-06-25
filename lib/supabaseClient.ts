// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Las claves vienen desde las variables de entorno 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Creamos el cliente de Supabase y lo exportamos
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Solo para pruebas, expone supabase globalmente
if (typeof window !== "undefined") {
  (window as any).supabase = supabase;
}