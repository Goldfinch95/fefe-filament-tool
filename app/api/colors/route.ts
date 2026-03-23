import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* el cliente de Supabase automáticamente adjuntar el apikey y el Authorization en cada request  */
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/*Trae todos los colores desde la base de datos */

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("colores")
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}