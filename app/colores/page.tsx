"use client";
import { useColors } from "@/hooks/useColors";
import ColorCard from "@/components/ui/ColorCard";
import ColorDialog from "@/components/ColorDialog";
import AlertRevert from "@/components/ui/AlertRevert";
import AlertReset from "@/components/ui/AlertReset";

export default function colorsPage() {
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

 
    return (
    <>
      <main className="flex bg-[url('/fefe.jfif')] bg-center bg-[#11110f]  bg-no-repeat items-center justify-center p-4">
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-7 gap-6 w-50%">
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




