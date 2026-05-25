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
import ColorDialog from "./Color_Dialog";

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

      {/* Dialog rediseñado */}
      <ColorDialog
        name={color.name}
        number={color.number}
        color={color.color}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAccept={onAccept}
      />
    </Dialog>
  );
};

export default ColorCard;