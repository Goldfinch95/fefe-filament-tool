// PAGINA PRINCIPAL
import { redirect } from "next/navigation";

// Redirige automáticamente a COLORES al entrar a la app
export default function Home() {
  redirect("/colors");
}