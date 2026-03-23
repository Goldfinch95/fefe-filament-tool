import { Color } from "../types/colors.types";
import { updateColorInBackend } from "../services/update_colors.service";

/* deshace la última operación de resta, volviendo el color a su valor anterior. */
export const handleRevert = async (
  alertSelectedIndex: number,
  colors: Color[],
  previousValues: Record<string, number>,
  setColors: (colors: Color[]) => void,
  setPreviousValues: (prev: Record<string, number>) => void,
  setAlertSelectedIndex: (index: number | null) => void,
  onClose: () => void
) => {
  //index del color seleccionado
  const current = colors[alertSelectedIndex];
  //valor previo
  const previous = previousValues[current.id];

  // Si no hay valor previo cerramos sin hacer nada
  if (previous === undefined) {
    onClose();
    return;
  }

  //sincronizacion con la base de datos
  await updateColorInBackend(current.id, previous);

  // Actualizamos el estado local
  const updated = [...colors];
  updated[alertSelectedIndex] = { ...current, number: previous };
  setColors(updated);

  // Eliminamos el valor previo una vez revertido
  const updatedPrev = { ...previousValues };
  delete updatedPrev[current.id];
  setPreviousValues(updatedPrev);
  //limpiamos el index seleccionado
  setAlertSelectedIndex(null);
  //cerramos el dialogo
  onClose();
};