import { Color } from "@/interfaces/types";
import { sortColorsAlphabetically } from "../helpers/sort.colors";

/* Trae todos los colores desde el servidor via API route*/

export const fetchColorsFromBackend = async (): Promise<Color[]> => {
  const res = await fetch("/api/colors");

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error desconocido");
  }

  const data: Color[] = await res.json();
  return sortColorsAlphabetically(data);
};