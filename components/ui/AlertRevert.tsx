"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Color } from "@/lib/types";
import { updateColorInBackend } from "@/services/colors";

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
      <AlertDialogContent className="max-w-sm bg-zinc-900 text-white">
        <AlertDialogTitle className="text-3xl font-bold mb-6 text-center">
          ¿Te confundiste?
        </AlertDialogTitle>
        <div className="flex mt-6 space-x-4">
          <AlertDialogCancel className="w-1/2 text-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-200 text-black">
            No
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!puedeRevertir}
            className={`w-1/2 text-center rounded-md px-4 py-2 ${
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
