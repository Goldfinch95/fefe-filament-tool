import { Color } from "@/lib/types";

export const sortColorsAlphabetically = (colores: Color[]): Color[] =>
  [...colores].sort((a, b) => a.name.localeCompare(b.name));