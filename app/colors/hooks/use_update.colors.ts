import { useState } from "react";
import { Color } from "../types/colors.types";
import { updateColorInBackend } from "../services/update_colors.service";

export function useColorUpdate(colors: Color[], setColors: (colors: Color[]) => void) {
    /*   estados   */
  // indice de color seleccionado  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // cantidad a restar
  const [inputValue, setInputValue] = useState<string>("");
  // objeto: color y valor
  const [previousValues, setPreviousValues] = useState<Record<string, number>>({});

  const handleAccept = async () => {

    if (selectedIndex === null) return;

    //convertir de valor string a valor number.
    const amount = parseInt(inputValue);
    //comprobar que sea un numero positivo.
    if (isNaN(amount) || amount <= 0) return;

    //obtener color segun indice seleccionado
    const current = colors[selectedIndex];

    //calculo del nuevo valor.
    const updatedValue = Math.max(current.number - amount, 0);

    //almacena valor anterior,por si el usuario quiere revertir
    setPreviousValues((prev) => ({ ...prev, [current.id]: current.number }));

    //actualizamos valor
    const updated = [...colors];
    updated[selectedIndex] = { ...current, number: updatedValue };
    setColors(updated);

    // limpieza del input
    setInputValue("");

    //sincronizacion con la base de datos
    await updateColorInBackend(current.id, updatedValue);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    inputValue,
    setInputValue,
    previousValues,
    setPreviousValues,
    handleAccept,
  };
}