//PÁGINA DE COLORES
"use client";

import { useColorsList } from "./hooks/use_list.colors";
import { useColorUpdate } from "./hooks/use_update.colors";
import { useColorAlerts } from "./hooks/use_alerts.colors";
import ColorCard from "./components/Color_Card";
import ColorDialog from "./components/Color_Dialog";
import AlertRevert from "./components/Alert_Revert";
import AlertReset from "./components/Alert_Reset";

export default function ColoresPage() {
  // Maneja la lista de colores traída desde la API
  const { colors, setColors } = useColorsList();

  // Maneja el estado de las alertas (reset y revert)
  const { alertSelectedIndex, setAlertSelectedIndex, alertOpen, setAlertOpen } =
    useColorAlerts();

  // Maneja la resta de cantidad y la sincronización con el backend
  const {
    selectedIndex,
    setSelectedIndex,
    inputValue,
    setInputValue,
    previousValues,
    setPreviousValues,
    handleAccept,
  } = useColorUpdate(colors, setColors);

  return (
    <>
      <main className="w-full h-screen">
        {/* Grid responsivo de tarjetas de colores */}
        <ul className="overflow-auto grid-costum pt-18 px-0 sm:px-5 sm:pt-0 gap-10 sm:gap-5">
          {colors.map((color, index) => (
            <ColorCard
              key={color.id}
              color={color}
              index={index}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              onDeselect={() => setSelectedIndex(null)}
              onAlertX={() => {
                setAlertSelectedIndex(index);
                setAlertOpen("X"); // abre AlertRevert
              }}
              onAlertY={() => {
                setAlertSelectedIndex(index);
                setAlertOpen("Y"); // abre AlertReset
              }}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onAccept={handleAccept}
            >
              {/* ColorDialog queda como children por si se necesita en el futuro */}
              <ColorDialog
                name={color.name}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onAccept={handleAccept}
              />
            </ColorCard>
          ))}
        </ul>
      </main>

      {/* Alerta para revertir al valor anterior (botón ← de la tarjeta) */}
      <AlertRevert
        open={alertOpen === "X"}
        onClose={() => setAlertOpen(null)}
        alertSelectedIndex={alertSelectedIndex}
        colors={colors}
        previousValues={previousValues}
        setColors={setColors}
        setPreviousValues={setPreviousValues}
        setAlertSelectedIndex={setAlertSelectedIndex}
      />

      {/* Alerta para resetear a 1000 (botón ↺ de la tarjeta) */}
      <AlertReset
        open={alertOpen === "Y"}
        onClose={() => setAlertOpen(null)}
        alertSelectedIndex={alertSelectedIndex}
        colors={colors}
        setColors={setColors}
        setAlertSelectedIndex={setAlertSelectedIndex}
      />
    </>
  );
}
