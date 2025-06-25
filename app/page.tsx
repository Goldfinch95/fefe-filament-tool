"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
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

type Color = {
  id: string;
  name: string;
  color: string;
  number: number;
};

export default function Home() {
  // Estado para almacenar la lista de colores desde la base de datos
  const [colors, setColors] = useState<Color[]>([]);
  // Estado para controlar qué índice está seleccionado (para el diálogo)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Estado para controlar qué índice está seleccionado para la alerta "X"
  const [alertSelectedIndex, setAlertSelectedIndex] = useState<number | null>(
    null
  );
  // Estado para el valor del input (cantidad a restar)
  const [inputValue, setInputValue] = useState<string>("");
  // Estado para controlar cuál alerta está abierta ("X", "Y" o ninguna)
  const [alertOpen, setAlertOpen] = useState<"X" | "Y" | null>(null);
  // Estado para guardar los valores anteriores de "number" para permitir revertir cambios
  const [previousValues, setPreviousValues] = useState<Record<string, number>>(
    {}
  );

  /**
   * Función que hace la llamada POST a la API interna para actualizar un color
   * @param id - UUID del color a actualizar
   * @param number - Nuevo valor para el campo number
   */
  async function updateColorInBackend(id: string, number: number) {
    const res = await fetch("/api/updateColor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, number }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error desconocido");
    }
  }

  /* Ordena alfabéticamente los colores. */
  function ordenarColoresAlfabeticamente(colores: Color[]): Color[] {
    return [...colores].sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Función para obtener la lista de colores desde Supabase y actualizar el estado local
   */
  const fetchColorsFromBackend = useCallback(async () => {
    try {
      const { data, error } = await supabase.from<"colores", Color>("colores").select("*");
      if (error) throw error;
      if (data) {
        const coloresOrdenados = ordenarColoresAlfabeticamente(data);
        setColors(coloresOrdenados);
      }
    } catch (error) {
      console.error("Error cargando colores:", error);
    }
  }, []);

  // Al montar el componente, traemos los colores desde el backend
  useEffect(() => {
    fetchColorsFromBackend();
  }, [fetchColorsFromBackend]);

  /**
   * Función para convertir un color hexadecimal o RGB string a un array RGB numérico
   * @param color - Color en formato hexadecimal o rgb(a)
   * @returns array con valores [r, g, b]
   */
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

  /**
   * Determina si un color es claro o no para decidir color de texto adecuado
   * @param color - Color en formato hexadecimal o rgb(a)
   * @returns true si el color es claro, false si es oscuro
   */
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

  /**
   * Obtiene la clase CSS del color del texto según el color de fondo para mejor contraste
   * @param color - Color de fondo
   * @returns string con clases tailwind para el color de texto y sombra
   */
  function getTextColor(color: string): string {
    const colorLower = color.toLowerCase();
    if (colorLower === "#ffff00" || colorLower === "yellow") {
      return "text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]";
    }
    return isColorLight(color)
      ? "text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
      : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]";
  }

  /**
   * Función que maneja la aceptación del input para restar un valor al número del color seleccionado
   * Actualiza el estado local y también hace la llamada para actualizar el backend
   */
  async function handleAccept() {
    if (selectedIndex === null) return;

    const restar = parseInt(inputValue);
    if (isNaN(restar) || restar <= 0) return;

    const current = colors[selectedIndex];
    const nuevoValor = Math.max(current.number - restar, 0);

    // Guardamos el valor anterior para poder revertirlo si hace falta
    setPreviousValues((prev) => ({ ...prev, [current.id]: current.number }));

    // Actualizamos el estado local con el nuevo valor
    const nuevosColores = [...colors];
    nuevosColores[selectedIndex] = { ...current, number: nuevoValor };
    setColors(nuevosColores);

    setInputValue("");

    // Actualizamos el backend con el nuevo valor
    try {
      await updateColorInBackend(current.id, nuevoValor);
    } catch (error) {
      console.error("Error actualizando backend:", error);
    }
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
                    <div className="absolute top-2 right-2 flex gap-0 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAlertSelectedIndex(index);
                          setAlertOpen("X");
                        }}
                        className="w-10 h-10 bg-white border border-black rounded-l-sm flex items-center justify-center font-bold text-gray-900 hover:bg-gray-200"
                      >
                        X
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAlertSelectedIndex(index);
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
                      onClick={handleAccept}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isNaN(Number(inputValue)) || Number(inputValue) <= 0}
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

      {/* Alerta para revertir el cambio */}
      <AlertDialog
        open={alertOpen === "X"}
        onOpenChange={(open) => !open && setAlertOpen(null)}
      >
        <AlertDialogContent className="bg-zinc-900 text-white">
          <AlertDialogTitle>¿Te confundiste?</AlertDialogTitle>

          <div className="flex mt-6 space-x-4">
            <AlertDialogCancel className="w-1/2 text-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-200 text-black">
              No
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <button
                className="w-1/2 text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={async () => {
                  if (alertSelectedIndex === null) {
                    setAlertOpen(null);
                    return;
                  }

                  const colorActual = colors[alertSelectedIndex];
                  const valorPrevio = previousValues[colorActual.id];

                  if (valorPrevio === undefined) {
                    setAlertOpen(null);
                    return;
                  }

                  try {
                    // Actualiza el backend con el valor previo para revertir el cambio
                    await updateColorInBackend(colorActual.id, valorPrevio);

                    // Actualiza el estado local con el valor previo
                    const copia = [...colors];
                    copia[alertSelectedIndex] = {
                      ...colorActual,
                      number: valorPrevio,
                    };
                    setColors(copia);

                    // Limpia el valor previo almacenado para ese color
                    setPreviousValues((prev) => {
                      const newPrev = { ...prev };
                      delete newPrev[colorActual.id];
                      return newPrev;
                    });

                    setAlertSelectedIndex(null);
                    setAlertOpen(null);
                  } catch (error) {
                    console.error("Error al revertir:", error);
                  }
                }}
              >
                Sí
              </button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta para reiniciar */}
      <AlertDialog
        open={alertOpen === "Y"}
        onOpenChange={(open) => {
          if (!open) {
            setAlertOpen(null);
          }
        }}
      >
        <AlertDialogContent className="bg-zinc-900 text-white">
          <AlertDialogTitle>Chequeado?</AlertDialogTitle>
          <div className="flex mt-6 space-x-4">
            <AlertDialogCancel className="w-1/2 text-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-200 text-black">
              No
            </AlertDialogCancel>

            <AlertDialogAction
              className="w-1/2 text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={async () => {
                if (alertSelectedIndex === null) {
                  console.log("❌ No hay color seleccionado");
                  return;
                }

                try {
                  const colorActual = colors[alertSelectedIndex];

                  // Actualiza backend a number=1000
                  await updateColorInBackend(colorActual.id, 1000);

                  // Clona el array y actualiza el color seleccionado localmente
                  const nuevaLista = [...colors];
                  nuevaLista[alertSelectedIndex] = {
                    ...nuevaLista[alertSelectedIndex],
                    number: 1000,
                  };

                  // Actualiza el estado con la nueva lista
                  setColors(nuevaLista);

                  // Resetea selección y cierra alerta
                  setAlertSelectedIndex(null);
                  setAlertOpen(null);
                } catch (error) {
                  console.error("Error actualizando backend en alerta Y:", error);
                }
              }}
            >
              Sí
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
