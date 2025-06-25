import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { id, number } = await request.json();
    console.log("ID recibido:", id);
    console.log("Número recibido:", number);

    if (!id || number === undefined) {
      console.log("Faltan id o number");
      return NextResponse.json({ error: "Faltan id o number" }, { status: 400 });
    }

    // Primero: verificar que existe el registro
    const { data: registro, error: selectError } = await supabaseAdmin
      .from("colores")
      .select("*")
      .eq("id", id);

    if (selectError) {
      console.log("Error al hacer select previo:", selectError);
      return NextResponse.json({ error: selectError.message }, { status: 500 });
    }

    if (!registro || registro.length === 0) {
      console.log("No existe registro con ese id");
      return NextResponse.json({ error: "No existe registro con ese id" }, { status: 404 });
    }

    console.log("Registro previo:", registro);

    // Ahora hacemos update y pedimos que devuelva el registro actualizado
    const { data, error } = await supabaseAdmin
      .from("colores")
      .update({ number })
      .eq("id", id)
      .select();

    if (error) {
      console.log("Error al actualizar:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Registro actualizado:", data);

    return NextResponse.json({ message: "Actualizado con éxito", data });
  } catch (error) {
    console.log("Error catch:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}