/* COMPONENTE: Tarjeta visual de cada color */

import { ReactNode } from "react";
import AlertButton from "./Alert_Button";
import { Dialog, DialogTitle, DialogTrigger, DialogContent } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { getTextColor } from "../helpers/text.colors";
import { textLight } from "../helpers/text_light.colors";
import { Color } from "../types/colors.types";

interface Props {
  color: Color;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onAlertX: () => void;
  onAlertY: () => void;
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

  const textColor = getTextColor(color.color);
  const btnBg = textLight(color.color) ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";

  return (
    <Dialog
      open={isSelected}
      onOpenChange={(open) => (open ? onSelect() : onDeselect())}
    >
      <DialogTrigger asChild>
        <li
          onClick={onSelect}
          className={`relative size-26 sm:size-48 aspect-square rounded-2xl cursor-pointer
            flex flex-col justify-between p-3
            overflow-hidden ${textColor}
            hover:-translate-y-1 duration-200`}
          style={{ backgroundColor: color.color }}
        >
          {/* Nombre arriba */}
          <h3 className="text-xs font-medium uppercase tracking-widest opacity-70 font-poppins">
            {color.name}
          </h3>

          {/* Número y botones abajo en la misma línea */}
          <div className="flex justify-between items-end">
            <p className="text-2xl font-semibold leading-none">
              {color.number}
            </p>
            <div className="flex gap-1.5">
              <AlertButton
                icon={<FontAwesomeIcon icon={faBackwardStep} className="text-xs" />}
                onClick={onAlertX}
                btnBg={btnBg}
                btnBorder="transparent"
              />
              <AlertButton
                icon={<FontAwesomeIcon icon={faArrowsRotate} className="text-xs" />}
                onClick={onAlertY}
                btnBg={btnBg}
                btnBorder="transparent"
              />
            </div>
          </div>
        </li>
      </DialogTrigger>

      {/* Dialog para restar cantidad */}
      <DialogContent className="w-fill bg-zinc-900 text-white">
        <DialogTitle className="text-3xl sm:text-4xl mt-1 text-center font-poppins">
          {color.name}
        </DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isNaN(Number(inputValue)) && Number(inputValue) > 0) {
              onAccept();
              onDeselect();
            }
          }}
          className="space-y-4"
        >
          <Input
            type="number"
            placeholder="Cantidad a restar"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-12 p-4 bg-zinc-800 text-white placeholder-gray-400
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none font-poppins"
          />
          <Button
            type="submit"
            className="text-base sm:text-2xl w-full h-12 my-2 bg-blue-600 hover:bg-blue-700 text-white font-poppins"
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