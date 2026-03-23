/* Se usa para decidir si el texto encima de un color debe ser negro o blanco. */

export const textLight = (color: string): boolean => {
  // Extraemos r, g, b directamente del hex de 6 caracteres
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  //formula de iluminacion de botones
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // mayor a 128 = claro , sino = oscuro.
  return brightness > 128;
};