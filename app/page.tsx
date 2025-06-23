"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const initialColors = [
  { color: "blue", name: "azul", number: 1000 },
  { color: "#ffffff", name: "blanco", number: 1000 },
  { color: "#000000", name: "negro", number: 1000 },
  { color: "gray", name: "gris", number: 1000 },
  { color: "rgba(255, 255, 255, 0.1)", name: "trans", number: 1000 },
  { color: "#dd0795", name: "fucsia", number: 1000 },
  { color: "pink", name: "rosa", number: 1000 },
  { color: "brown", name: "marron", number: 1000 },
  { color: "green", name: "verde", number: 1000 },
  { color: "#FFF52D", name: "amarillo", number: 1000 },
  { color: "red", name: "rojo", number: 1000 },
];

export default function Home() {
  const [colors, setColors] = useState(initialColors);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // Controla qué alerta está abierta, o null para ninguna
  const [alertOpen, setAlertOpen] = useState<"X" | "Y" | null>(null);

  function parseColor(color: string): [number, number, number] {
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const bigint = parseInt(
        hex.length === 3
          ? hex
              .split("")
              .map((c) => c + c)
              .join("")
          : hex,
        16
      );
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    const rgb = color
      .replace(/rgba?\(/, "")
      .replace(")", "")
      .split(",")
      .map((v) => parseFloat(v.trim()));

    return [rgb[0], rgb[1], rgb[2]];
  }

  function isColorLight(color: string): boolean {
    if (color === "transparent") return true;
    try {
      const [r, g, b] = parseColor(color);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    } catch {
      return false;
    }
  }

  function getTextColor(color: string): string {
    const colorLower = color.toLowerCase();
    if (colorLower === "#ffff00" || colorLower === "yellow") {
      return "text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]";
    }
    const isLight = isColorLight(color);
    return isLight
      ? "text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
      : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]";
  }

  function handleAccept() {
    if (selectedIndex === null) return;

    const restar = parseInt(inputValue);
    if (isNaN(restar) || restar <= 0) return;

    const current = colors[selectedIndex];
    const nuevoValor = Math.max(current.number - restar, 1);

    const nuevosColores = [...colors];
    nuevosColores[selectedIndex] = {
      ...current,
      number: nuevoValor,
    };

    setColors(nuevosColores);
    setSelectedIndex(null);
    setInputValue("");
  }

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center p-4">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 w-full max-w-6xl">
          {colors.map(({ color, name, number }, index) => {
            const textColor = getTextColor(color);
            return (
              <Dialog
                key={index}
                open={selectedIndex === index}
                onOpenChange={(open) => !open && setSelectedIndex(null)}
              >
                <DialogTrigger asChild>
                  <li
                    onClick={() => setSelectedIndex(index)}
                    className={`relative aspect-square rounded-xl cursor-pointer flex flex-col items-center justify-center border-2 border-gray-300 ${textColor} hover:-translate-y-1 duration-500`}
                    style={{ backgroundColor: color }}
                  >
                    {/* Botones pequeños en esquina superior derecha */}
                    <div className="absolute top-2 right-2 flex gap-0 z-10">
                      {/* Botón X abre alerta X */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAlertOpen("X");
                        }}
                        className="w-10 h-10 bg-white border border-black rounded-l-sm flex items-center justify-center font-bold text-gray-900 hover:bg-gray-200"
                      >
                        X
                      </button>

                      {/* Botón Y abre alerta Y */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAlertOpen("Y");
                        }}
                        className="w-10 h-10 bg-white border border-black rounded-r-sm flex items-center justify-center font-bold text-gray-900 hover:bg-gray-200"
                      >
                        Y
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-base">{number}</p>
                  </li>
                </DialogTrigger>

                <DialogContent className="max-w-sm bg-zinc-900 text-white">
                  <DialogTitle className="text-xl font-bold mb-4">
                    {name}
                  </DialogTitle>
                  <Input
                    type="number"
                    placeholder="Cantidad a restar"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mb-4 bg-zinc-800 text-white placeholder-gray-400"
                  />
                  <DialogClose asChild>
                    <Button
                      onClick={handleAccept}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Aceptar
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            );
          })}
        </ul>
      </main>

      {/* AlertDialog para X */}
      <AlertDialog
        open={alertOpen === "X"}
        onOpenChange={(open) => !open && setAlertOpen(null)}
      >
        <AlertDialogContent className="bg-zinc-900 text-white">
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>Checkeado?</AlertDialogDescription>
          <div className="flex mt-6 space-x-4">
            <AlertDialogCancel className="w-1/2 text-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-200 text-black">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-1/2 text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => {
                setAlertOpen(null);
              }}
            >
              Ok
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* AlertDialog para Y */}
      <AlertDialog
        open={alertOpen === "Y"}
        onOpenChange={(open) => !open && setAlertOpen(null)}
      >
        <AlertDialogContent className="bg-zinc-900 text-white">
          <AlertDialogDescription>
            te confundiste putita?
          </AlertDialogDescription>
          <div className="flex mt-6 space-x-4">
            <AlertDialogCancel className="w-1/2 text-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-200 text-black">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-1/2 text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => {
                setAlertOpen(null);
              }}
            >
              Ok
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
