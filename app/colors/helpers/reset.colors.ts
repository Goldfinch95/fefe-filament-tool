import { Color } from "@/interfaces/types";
import { updateColorInBackend } from "../services/update_colors.service";


/* resetea el valor numerico del color */
export const handleReset = async (
  alertSelectedIndex: number,
  colors: Color[],
  setColors: (colors: Color[]) => void,
  setAlertSelectedIndex: (index: number | null) => void,
  onClose: () => void
) => {
    //color a resetear
  const current = colors[alertSelectedIndex];
  //sincronizar con la base de datos. reseteo a 1000 de valor numerico.
  await updateColorInBackend(current.id, 1000);
  //actualizacion del estado local.
  const updated = [...colors];
  updated[alertSelectedIndex] = { ...current, number: 1000 };
  setColors(updated);
  //limpiamos el indice seleccionado
  setAlertSelectedIndex(null);
  //cierra el dialogo
  onClose();
};