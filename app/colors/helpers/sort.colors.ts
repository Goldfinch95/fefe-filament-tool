import { Color } from "../types/colors.types";

/* recibe un array de colores y devuelve uno nuevo ordenado alfabeticamente*/

export const sortColorsAlphabetically = (colores: Color[]): Color[] =>
  [...colores].sort((a, b) => a.name.localeCompare(b.name));