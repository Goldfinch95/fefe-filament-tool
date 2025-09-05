"use client";
import { useColors } from "@/common/hooks/useColors";
import ColorCard from "@/app/components/ColorCard";
import ColorDialog from "@/app/components/ColorDialog";
import AlertRevert from "@/app/components/AlertRevert";
import AlertReset from "@/app/components/AlertReset";

export default function ColorsPage() {
  const {
    colors,
    selectedIndex,
    setSelectedIndex,
    alertSelectedIndex,
    setAlertSelectedIndex,
    alertOpen,
    setAlertOpen,
    inputValue,
    setInputValue,
    handleAccept,
    previousValues,
    setPreviousValues,
    setColors,
  } = useColors();

  /*modifica el gap del ul para que entre mas colores*/
    return (
    <>
    
  <main className="w-full h-screen">
        <ul className="overflow-auto grid-costum pt-18 px-0 sm:px-5 sm:pt-0 gap-10 sm:gap-5">
          {colors.map((color, index) => (
            <ColorCard
              key={color.id}
              color={color}
              index={index}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              onDeselect={() => setSelectedIndex(null)} // <-- Añadido
              onAlertX={() => {
                setAlertSelectedIndex(index);
                setAlertOpen("X");
              }}
              onAlertY={() => {
                setAlertSelectedIndex(index);
                setAlertOpen("Y");
              }}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onAccept={handleAccept}
            >
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


