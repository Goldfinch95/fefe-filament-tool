/* COMPONENTE: Dialogo que aparece al hacer click en una tarjeta de color */

import { DialogContent, DialogTitle, DialogClose } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

interface Props {
  name: string;
  number: number;
  color: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  onAccept: () => void;
}

const ColorDialog = ({ name, number, color, inputValue, setInputValue, onAccept }: Props) => {
  return (
    <DialogContent className="w-[620px] min-h-[320px] p-0 overflow-hidden border-0 bg-zinc-900">
      {/* Header */}
      <div className="flex items-center gap-3 px-7 pt-7 pb-5">
        <span
          className="size-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <DialogTitle className="text-white text-2xl font-medium font-poppins tracking-tight">
          {name}
        </DialogTitle>
        <span className="ml-auto text-xl text-white/40 font-poppins">
          {number} unid.
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mx-7" />

      {/* Body */}
      <div className="px-7 pt-6 pb-7 flex flex-col gap-4">
        <Input
          type="number"
          placeholder="Cantidad a restar"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-14 bg-white/[0.06] border-white/[0.10] text-white placeholder-white/30
            rounded-[10px] px-4 !text-lg font-poppins
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            focus-visible:border-white/30 focus-visible:ring-0"
        />

        <DialogClose asChild>
          <Button
            onClick={onAccept}
            disabled={isNaN(Number(inputValue)) || Number(inputValue) <= 0}
            className="w-full h-14 rounded-[10px] bg-green-600 hover:bg-green-500
              text-white text-2xl font-medium font-poppins
              disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Aceptar
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default ColorDialog;