import { useState } from "react";

/* Maneja el estado de las dos alertas de la página: */
export function useColorAlerts() {
    /* Estados */
  //alerta seleccionada
  const [alertSelectedIndex, setAlertSelectedIndex] = useState<number | null>(null);
  //Controla cuál de las  alertas está abierta.
  const [alertOpen, setAlertOpen] = useState<"X" | "Y" | null>(null);

  return {
    alertSelectedIndex,
    setAlertSelectedIndex,
    alertOpen,
    setAlertOpen,
  };
}