import { DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  onAccept: () => void;
}

const  ColorDialog = ({ name, inputValue, setInputValue, onAccept }: Props) => {
  return (
    <DialogContent className="max-w-sm bg-zinc-900 text-white">
      <DialogTitle className="text-xl font-bold mb-4">{name}</DialogTitle>
      <Input
        type="number"
        placeholder="Cantidad a restar"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mb-4 bg-zinc-800 text-white placeholder-gray-400"
      />
      <DialogClose asChild>
        <Button
          onClick={onAccept}
          disabled={isNaN(Number(inputValue)) || Number(inputValue) <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Aceptar
        </Button>
      </DialogClose>
    </DialogContent>
  );
}


export default ColorDialog;