import { useEffect, useState } from "react";
import { Color } from "../types/colors.types";
import { fetchColorsFromBackend } from "../services/colors.service";
import { sortColorsAlphabetically } from "../helpers/sort.colors";


/* carga y guarda la lista de colores*/

export function useColorsList() {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    fetchColorsFromBackend()
      .then(setColors)
      .catch((err) => console.error("Error al cargar colores:", err));
  }, []);

  return { colors, setColors };
}