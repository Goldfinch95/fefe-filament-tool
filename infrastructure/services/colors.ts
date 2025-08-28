import { supabase } from "@/infrastructure/db/supabaseClient";
import { Color } from "@/interfaces/types";
import { sortColorsAlphabetically } from "@/common/utils/sort";

/* Actualiza un color en el backend mediante la API interna
 */

export const updateColorInBackend = async (id: string, number: number): Promise<void> => {
    const res = await fetch("/api/updateColor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, number}),
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.error || "Error Desconocido");
    }
};

/* Obtiene y ordena los colores desde Supabase
 */

export const fetchColorsFromBackend = async (): Promise<Color[]> => {
  const { data, error } = await supabase
    .from<"colores", Color>("colores")
    .select("*");

  if (error) throw error;

  return sortColorsAlphabetically(data || []);
};