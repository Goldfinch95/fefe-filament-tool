import { useEffect, useState } from "react";
import {
  fetchColorsFromBackend,
  updateColorInBackend,
} from "@/infrastructure/services/colors";
import { Color } from "@/interfaces/types";

export function useColors() {
  /*Estados*/
  // lista de colores
  const [colors, setColors] = useState<Color[]>([]);
  // índice  seleccionado
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // índice seleccionado "X"
  const [alertSelectedIndex, setAlertSelectedIndex] = useState<number | null>(
    null
  );
  //  controlar  alerta  abierta ("X", "Y" o ninguna)
  const [alertOpen, setAlertOpen] = useState<"X" | "Y" | null>(null);
  //  valor del input
  const [inputValue, setInputValue] = useState<string>("");
  //  guardar  valor anterior de "number"
  const [previousValues, setPreviousValues] = useState<Record<string, number>>(
    {}
  );

  // --- Obtener colores al iniciar la app ---

  useEffect(() => {
    fetchColorsFromBackend()
      .then(setColors)
      .catch((err) => console.error("Error al cargar colores:", err));
  }, []);

  // --- Aplicar resta y actualizar estado/backend ---

  const handleAccept = async () => {
    if (selectedIndex === null) return;
    const amount = parseInt(inputValue);
    if (isNaN(amount) || amount <= 0) return;

    const current = colors[selectedIndex];
    const updatedValue = Math.max(current.number - amount, 0);

    setPreviousValues((prev) => ({ ...prev, [current.id]: current.number }));

    const updated = [...colors];
    updated[selectedIndex] = { ...current, number: updatedValue };
    setColors(updated);
    setInputValue("");

    await updateColorInBackend(current.id, updatedValue);
  };
  return {
    colors,
    selectedIndex,
    setSelectedIndex,
    alertSelectedIndex,
    setAlertSelectedIndex,
    alertOpen,
    setAlertOpen,
    inputValue,
    setInputValue,
    previousValues,
    setPreviousValues,
    handleAccept,
    setColors,
  };
}
