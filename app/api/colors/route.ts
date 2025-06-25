import { NextResponse } from "next/server";

// Datos temporales en memoria (en producción usarías Supabase o DB)
let colors = [
  { color: "blue", name: "azul", number: 1000 },
  { color: "#ffffff", name: "blanco", number: 1000 },
  { color: "#000000", name: "negro", number: 1000 },
  { color: "gray", name: "gris", number: 1000 },
  { color: "#00ffffff", name: "trans", number: 1000 },
  { color: "#dd0795", name: "fucsia", number: 1000 },
  { color: "pink", name: "rosa", number: 1000 },
  { color: "brown", name: "marron", number: 1000 },
  { color: "green", name: "verde", number: 1000 },
  { color: "#FFF52D", name: "amarillo", number: 1000 },
  { color: "red", name: "rojo", number: 1000 },
  // ... los demás
];

// GET: obtener todos los colores
export async function GET() {
  return NextResponse.json(colors);
}

// POST: actualizar número de un color
export async function POST(request: Request) {
    const body = await request.json();
  const { name, number } = body;

  const index = colors.findIndex((c) => c.name === name);
    if (index === -1) {
      return NextResponse.json({ error: "Color no encontrado" }, { status: 404 });
    }
  
    colors[index].number = number;
  
    return NextResponse.json({ success: true, updated: colors[index] });
}


