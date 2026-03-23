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
      <AlertDialogContent className="bg-zinc-900 text-white sm:h-1/6">
      {/* titulo de confirmacion */}
        <AlertDialogTitle className={`text-4xl text-center font-poppins`}>
          ¿Te confundiste?
        </AlertDialogTitle>
        <div className="flex gap-2">
            {/* boton de cancelar, cierra el dialogo */}
          <AlertDialogCancel
            className={`w-1/2 text-lg text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-poppins disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            No
          </AlertDialogCancel>
          {/* boton de confirmar */}
          <AlertDialogAction
            onClick={() => {
              // Verificamos que haya un índice seleccionado antes de llamar al helper
              if (alertSelectedIndex === null) return;

              // El componente llama al helper y le pasa todo lo que necesita
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
            Sí
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertRevert;
