import { textLight } from "./text_light.colors";

/* Devuelve la clase de Tailwind correcta según el color de fondo */
export const getTextColor = (color: string): string => {
  if (color.toLowerCase() === "#ffff00") {
    return "text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]";
  }
  return textLight(color)
    ? "text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
    : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]";
};