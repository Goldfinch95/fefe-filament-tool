'use client';

import { useState } from 'react';
import { filamentColors } from "../utils/asetts";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<null | {
    color: string;
    name: string;
    number: string;
  }>(null);

  // Convierte color hex o rgb/rgba a [r, g, b]
  function parseColor(color: string): [number, number, number] {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const bigint = parseInt(
        hex.length === 3
          ? hex.split('').map((c) => c + c).join('')
          : hex,
        16
      );
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    const rgb = color
      .replace(/rgba?\(/, '')
      .replace(')', '')
      .split(',')
      .map((v) => parseFloat(v.trim()));

    return [rgb[0], rgb[1], rgb[2]];
  }

  // Calcula si el color es claro (true) u oscuro (false)
  function isColorLight(color: string): boolean {
    if (color === 'transparent') return true;
    try {
      const [r, g, b] = parseColor(color);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    } catch {
      return false;
    }
  }

  // Decide la clase de texto según color con casos especiales
  function getTextColor(color: string): string {
    const colorLower = color.toLowerCase();

    if (colorLower === '#ffff00' || colorLower === 'yellow') {
      return 'text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]';
    }

    const isLight = isColorLight(color);
    return isLight
      ? 'text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
      : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]';
  }

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center p-4">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 w-full max-w-6xl">
          {filamentColors.map(({ color, name, number }, index) => {
            const textColor = getTextColor(color);
            return (
              <Dialog key={index} onOpenChange={(open) => !open && setSelectedColor(null)}>
                <DialogTrigger asChild>
                   <li
                    onClick={() => setSelectedColor({ color, name, number })}
                    className={`aspect-square rounded-xl cursor-pointer flex flex-col items-center justify-center border-2 border-gray-300 ${textColor} hover:-translate-y-1 duration-500`}
                    style={{ backgroundColor: color }}
                  >
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-base">{number}</p>
                  </li>
                </DialogTrigger>
                <DialogContent className="max-w-sm bg-zinc-900 text-white">
                   <DialogTitle className="text-xl font-bold mb-4">
                    {selectedColor?.name}
                  </DialogTitle>
                  <Input type="text" />
                  <DialogClose className="mt-4 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Aceptar
                  </DialogClose>
                </DialogContent>
              </Dialog>
            );
          })}
        </ul>
      </main>
    </>
  );
}







