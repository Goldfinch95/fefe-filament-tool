/* COMPONENTE: Tarjeta visual de cada color */

import { ReactNode } from "react";
import AlertButton from "./Alert_Button";
import { Dialog, DialogTitle, DialogTrigger, DialogContent } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faRotate } from "@fortawesome/free-solid-svg-icons";
import { getTextColor } from "../helpers/text.colors"
import { Color } from "../types/colors.types";



interface Props {
  color: Color;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onAlertX: () => void; // dispara el AlertRevert
  onAlertY: () => void; // dispara el AlertReset
  inputValue: string;
  setInputValue: (value: string) => void;
  onAccept: () => void;
  children?: ReactNode;
}

const ColorCard = ({
  color,
  isSelected,
  onSelect,
  onDeselect,
  onAlertX,
  onAlertY,
  inputValue,
  setInputValue,
  onAccept,
}: Props) => {
  return (
    <Dialog
      open={isSelected}
      onOpenChange={(open) => (open ? onSelect() : onDeselect())}
    >
      {/* La tarjeta en sí actúa como trigger del Dialog */}
      <DialogTrigger asChild>
        <li
          onClick={onSelect}
          className={`relative size-26 sm:size-48 aspect-square rounded-xl cursor-pointer 
            flex flex-col items-center justify-center 
            border-2 border-gray-300 ${getTextColor(color.color)} 
            hover:-translate-y-1 duration-500`}
          style={{ backgroundColor: color.color }}
        >
          {/* Botón superior izquierdo: revertir al valor anterior */}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10">
            <AlertButton
              icon={<FontAwesomeIcon icon={faBackward} className="text-sm sm:text-xl" />}
              onClick={onAlertX}
            />
          </div>

          {/* Botón superior derecho: resetear a 1000 */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
            <AlertButton
              icon={<FontAwesomeIcon icon={faRotate} className="text-sm sm:text-xl" />}
              onClick={onAlertY}
            />
          </div>

          {/* Nombre del color */}
          <h3 className={`text-xs sm:text-lg font-semibold mt-4 text-center drop-shadow-sm font-varela`}>
            {color.name}
          </h3>

          {/* Cantidad disponible */}
          <p className="text-xs sm:text-2xl font-normal text-center drop-shadow-sm">
            {color.number}
          </p>
        </li>
      </DialogTrigger>

      {/* Dialog para restar cantidad */}
      <DialogContent className="w-fill bg-zinc-900 text-white">
        <DialogTitle className={`text-3xl sm:text-4xl mt-1 text-center font-poppins`}>
          {color.name}
        </DialogTitle>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isNaN(Number(inputValue)) && Number(inputValue) > 0) {
              onAccept();
              onDeselect(); // cierra el Dialog después de confirmar
            }
          }}
          className="space-y-4"
        >
          <Input
            type="number"
            placeholder="Cantidad a restar"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`h-12 p-4 bg-zinc-800 text-white placeholder-gray-400
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
              [&appearance:textfield] font-poppins`}
          />
          <Button
            type="submit"
            className={`text-base sm:text-2xl w-full h-12 my-2 bg-blue-600 hover:bg-blue-700 text-white font-poppins`}
            disabled={isNaN(Number(inputValue)) || Number(inputValue) <= 0}
          >
            Aceptar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ColorCard;