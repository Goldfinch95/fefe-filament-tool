/*COMPONENTE: Diálogo de confirmación para resetear un color*/

"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/common/components/ui/alert-dialog";
import { AlertProps } from "../types/alert.types";
import { handleReset } from "../helpers/reset.colors";

const AlertReset = ({
  open,
  onClose,
  alertSelectedIndex,
  colors,
  setColors,
  setAlertSelectedIndex,
}: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[620px] min-h-[320px] !p-0 overflow-hidden border-0 bg-zinc-900">

        {/* Header centrado */}
        <div className="px-7 pt-6 pb-5 flex flex-col items-center text-center">
          <AlertDialogTitle className="text-white text-4xl font-medium font-poppins mb-1">
            ¿Resetear a 1000?
          </AlertDialogTitle>
          <p className="text-white/40 pt-4 text-lg font-poppins leading-relaxed">
            El valor actual se perderá.<br />
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mx-7" />

        {/* Botones */}
        <div className="px-7 pt-5 pb-7 flex gap-3">
          <AlertDialogCancel
            className="flex-1 h-14 rounded-[10px] bg-white/[0.06] border-white/[0.10]
              text-white text-2xl font-medium font-poppins
              hover:bg-white/[0.10] transition-colors"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 h-14 rounded-[10px] bg-red-600 hover:bg-red-500
              text-white text-2xl font-medium font-poppins
              transition-colors border-0"
            onClick={() => {
              if (alertSelectedIndex === null) return;
              handleReset(
                alertSelectedIndex,
                colors,
                setColors,
                setAlertSelectedIndex,
                onClose
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

export default AlertReset;