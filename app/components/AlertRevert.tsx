"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/common/components/ui/alert-dialog";
import { Color } from "@/interfaces/types";
import { updateColorInBackend } from "@/infrastructure/services/colors";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

interface Props {
  open: boolean;
  onClose: () => void;
  alertSelectedIndex: number | null;
  colors: Color[];
  previousValues: Record<string, number>;
  setColors: (colors: Color[]) => void;
  setPreviousValues: (prev: Record<string, number>) => void;
  setAlertSelectedIndex: (index: number | null) => void;
}

const AlertRevert = ({
  open,
  onClose,
  alertSelectedIndex,
  colors,
  previousValues,
  setColors,
  setPreviousValues,
  setAlertSelectedIndex,
}: Props) => {
  const handleConfirm = async () => {
    if (alertSelectedIndex === null) return;

    const current = colors[alertSelectedIndex];
    const previous = previousValues[current.id];

    if (previous === undefined) {
      onClose();
      return;
    }

    try {
      await updateColorInBackend(current.id, previous);

      const updated = [...colors];
      updated[alertSelectedIndex] = { ...current, number: previous };
      setColors(updated);

      const updatedPrev = { ...previousValues };
      delete updatedPrev[current.id];
      setPreviousValues(updatedPrev);

      setAlertSelectedIndex(null);
      onClose();
    } catch (error) {
      console.error("Error al revertir:", error);
    }
  };

  const puedeRevertir =
    alertSelectedIndex !== null &&
    previousValues[colors[alertSelectedIndex].id] !== undefined;

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className=" bg-zinc-900 text-white sm:h-1/6">
        <AlertDialogTitle className={`text-4xl text-center ${poppins.className}`}>
          ¿Te confundiste?
        </AlertDialogTitle>
        <div className="flex gap-2">
          <AlertDialogCancel className={`w-1/2 text-lg text-center rounded-md border border-gray-300 hover:bg-gray-200 text-black ${poppins.className}`}>
            No
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!puedeRevertir}
            className={`w-1/2  text-lg text-center rounded-md ${poppins.className} ${
              puedeRevertir
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Sí
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertRevert;
