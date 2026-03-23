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
      <AlertDialogContent className="bg-zinc-900 text-white sm:h-1/6">
      {/* Titulo de confirmacion */}
        <AlertDialogTitle className={`text-4xl text-center font-poppins`}>
          Chequeado?
        </AlertDialogTitle>
        <div className="flex gap-2">
            {/* boton de cancelar y cierre de dialogo */}
          <AlertDialogCancel
            className={`w-1/2 text-lg text-center rounded-md border border-gray-300 hover:bg-gray-200 text-black font-poppins`}
          >
            No
          </AlertDialogCancel>
          {/* boton de confirmacion */}
          <AlertDialogAction
            className={`w-1/2 text-lg text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-poppins`}
            onClick={() => {
              // Verificamos que haya un índice de color seleccionado antes de llamar al helper
              if (alertSelectedIndex === null) return;
              // El componente  llama al helper le pasa todo lo que necesita
              handleReset(
                alertSelectedIndex,
                colors,
                setColors,
                setAlertSelectedIndex,
                onClose
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

export default AlertReset;