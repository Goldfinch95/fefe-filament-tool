/* COMPONENTE: Diálogo de confirmación para revertir un color a su valor anterior */

"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/common/components/ui/alert-dialog";
import { AlertRevertProps } from "../types/alert.types";
import { handleRevert } from "../helpers/revert_value.colors";

const AlertRevert = ({
  open,
  onClose,
  alertSelectedIndex,
  colors,
  setColors,
  setAlertSelectedIndex,
  previousValues,
  setPreviousValues,
}: AlertRevertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[620px] min-h-[320px] !p-0 overflow-hidden border-0 bg-zinc-900">

        {/* Header centrado */}
        <div className="px-7 pt-6 pb-5 flex flex-col items-center text-center">
          <AlertDialogTitle className="text-white text-4xl font-medium font-poppins mb-1">
            ¿Revertir al valor anterior?
          </AlertDialogTitle>
          <p className="text-white/40 pt-6 text-lg font-poppins leading-relaxed">
            Se restaurará el número previo a la última resta.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mx-7" />

        {/* Botones */}
        <div className="px-7  flex gap-3">
          <AlertDialogCancel
            className="flex-1 h-14 rounded-[10px] bg-white/[0.06] border-white/[0.10]
              text-white text-base font-medium font-poppins
              hover:bg-white/[0.10] transition-colors"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 h-14 rounded-[10px] bg-red-600 hover:bg-red-500
              text-white text-base font-medium font-poppins
              transition-colors border-0"
            onClick={() => {
              if (alertSelectedIndex === null) return;
              handleRevert(
                alertSelectedIndex,
                colors,
                previousValues,
                setColors,
                setPreviousValues,
                setAlertSelectedIndex,
                onClose,
              );
            }}
          >
            Confirmar
          </AlertDialogAction>
        </div>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertRevert;