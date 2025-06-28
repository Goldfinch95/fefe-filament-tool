/**
 * Parsea un color hexadecimal (#RGB, #RRGGBB, #RRGGBBAA) a [r, g, b, a]
 */
export const parseColor = (color: string): [number, number, number, number] => {
  if (color === "transparent") return [0, 0, 0, 0];

  if (!color.startsWith("#")) {
    throw new Error("Solo se aceptan colores hexadecimales.");
  }

  const hex = color.slice(1).toLowerCase();

  let r = 0, g = 0, b = 0, a = 255;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseInt(hex.slice(6, 8), 16);
  } else {
    throw new Error("Formato de color hex inválido.");
  }

  return [r, g, b, a];
};

/**
 * Determina si un color es claro para elegir contraste sobre fondo oscuro
 */
export const isColorLight = (color: string): boolean => {
  try {
    const [r, g, b, a] = parseColor(color);

    // Si el color es muy transparente, asumimos fondo oscuro → texto claro
    if (a < 128) {
      return false;
    }

    // Mezclar color con fondo oscuro (0,0,0) según opacidad
    const alpha = a / 255;
    const rFinal = Math.round(r * alpha);
    const gFinal = Math.round(g * alpha);
    const bFinal = Math.round(b * alpha);

    // Cálculo de luminosidad
    const brightness = (rFinal * 299 + gFinal * 587 + bFinal * 114) / 1000;

    return brightness > 128;
  } catch (err) {
    console.error("Color inválido en isColorLight:", color);
    return false;
  }
};

/**
 * Devuelve la clase de texto ideal para contraste sobre un fondo dado
 */
export const getTextColor = (color: string): string => {
  const colorLower = color.toLowerCase();

  if (colorLower === "#ffff00" || colorLower === "yellow") {
    return "text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]";
  }

  return isColorLight(color)
    ? "text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
    : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]";
};
