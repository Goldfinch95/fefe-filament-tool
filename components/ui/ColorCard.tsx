import { ReactNode } from "react"; 
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { getTextColor } from "@/lib/colorHelpers";
import { Color } from "@/lib/types";
import AlertButton from "./AlertButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faBackward, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Poppins, Varela_Round } from 'next/font/google';


const varela = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

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

  return (
    <Dialog
      open={isSelected}
      onOpenChange={(open) => (open ? onSelect() : onDeselect())}
    >
      <DialogTrigger asChild>
        <li
          onClick={onSelect}
          className={` relative 
    size-26 sm:size-48 
    aspect-square 
    rounded-xl cursor-pointer 
    flex flex-col items-center justify-center 
    border-2 border-gray-300 ${textColor} 
    hover:-translate-y-1 duration-500`}
          style={{ backgroundColor: color.color }}
        >
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10">
            <AlertButton icon={<FontAwesomeIcon icon={faBackward} />} onClick={onAlertX} />
          </div>

          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
            <AlertButton icon={<FontAwesomeIcon icon={faRotate}  />} onClick={onAlertY} />
          </div>
          <h3 className={`text-xs sm:text-lg font-semibold mt-4 text-center drop-shadow-sm ${varela.className}`}>{color.name}</h3>
          <p className="text-xs sm:text-2xl font-normal text-center drop-shadow-sm">{color.number}</p>
        </li>
      </DialogTrigger>

      <DialogContent className="w-fill  bg-zinc-900 text-white">
        <DialogTitle className={`text-3xl sm:text-4xl mt-1  text-center  ${poppins.className}`}>
          {color.name}
        </DialogTitle>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isNaN(Number(inputValue)) && Number(inputValue) > 0) {
              onAccept();
              onDeselect(); // Cierra el diálogo
            }
          }}
          className="space-y-4"
        >
          <Input
            type="number"
            placeholder="Cantidad a restar"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`  h-12 p-4 bg-zinc-800 text-white placeholder-gray-400 
             [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&appearance:textfield] ${poppins.className}`}
          />

          <Button
            type="submit"
            className={`text-base sm:text-2xl w-full h-12 my-2 bg-blue-600 hover:bg-blue-700 text-white ${poppins.className}`}
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
