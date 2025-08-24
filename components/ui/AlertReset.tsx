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
  setColors: (colors: Color[]) => void;
  setAlertSelectedIndex: (index: number | null) => void;
}

const AlertReset = ({
  open,
  onClose,
  alertSelectedIndex,
  colors,
  setColors,
  setAlertSelectedIndex,
}: Props) => {
  const handleReset = async () => {
    if (alertSelectedIndex === null) return;

    try {
      const current = colors[alertSelectedIndex];

      await updateColorInBackend(current.id, 1000);

      const updated = [...colors];
      updated[alertSelectedIndex] = { ...current, number: 1000 };
      setColors(updated);

      setAlertSelectedIndex(null);
      onClose();
    } catch (error) {
      console.error("Error al resetear:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="bg-zinc-900 text-white sm:h-1/6">
        <AlertDialogTitle className={`text-4xl text-center ${poppins.className}`}>Chequeado?</AlertDialogTitle>
        <div className="flex gap-2">
          <AlertDialogCancel className={`w-1/2 text-lg text-center rounded-md border border-gray-300 hover:bg-gray-200 text-black ${poppins.className}`}>
            No
          </AlertDialogCancel>
          <AlertDialogAction
            className={`w-1/2 text-lg text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${poppins.className}`}
            onClick={handleReset}
          >
            Sí
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export default AlertReset;