import React from "react";
import { columns, StockColumns } from "./columns"
import { DataTable } from "./data-table"


const data: StockColumns[] = [
  { id: "1", product: "Caja aparatos bucales", stock: 0, amount: 7110.93, date: "2025-06-02", observation: "" },
  { id: "2", product: "Lampara cohete", stock: 1, amount: 17200, date: "2025-06-03", observation: "Sin luz" },
  { id: "3", product: "Enrollador de vendas", stock: 1, amount: 5600, date: "2025-06-03", observation: "" },
  { id: "4", product: "Tarjeta kit formula 1", stock: 1, amount: 800, date: "2025-06-03", observation: "" },
  { id: "5", product: "LLavero zapatilla", stock: 6, amount: 600, date: "2025-06-03", observation: "Sin anillo" },
  { id: "6", product: "Maceta de gato lindo %150", stock: 0, amount: 12500, date: "2025-08-01", observation: "" },
  { id: "7", product: "Mini lampara de mesa", stock: 1, amount: 3300, date: "2025-06-03", observation: "Sin luz" },
  { id: "8", product: "Conejo sujeta botella", stock: 1, amount: 14500, date: "2025-06-03", observation: "" },
  { id: "9", product: "Maceta pensante", stock: 0, amount: 4400, date: "2025-06-03", observation: "" },
  { id: "10", product: "Maceta cuernos", stock: 0, amount: 3300, date: "2025-06-03", observation: "" },
  { id: "11", product: "Jarron para flores de ladrillo", stock: 1, amount: 13300, date: "2025-06-04", observation: "" },
  { id: "12", product: "Sostenedor de hojas cocodrilo", stock: 2, amount: 700, date: "2025-06-04", observation: "" },
  { id: "13", product: "Organizador de escritorio", stock: 1, amount: 16800, date: "2025-06-05", observation: "" },
  { id: "14", product: "Soporte joystick calavera", stock: 0, amount: 8700, date: "2025-06-08", observation: "" },
  { id: "15", product: "Cuelga llaves de pared", stock: 1, amount: 8800, date: "2025-06-08", observation: "" },
  { id: "16", product: "Clip cierra bolsa", stock: 0, amount: 700, date: "2025-06-08", observation: "" },
  { id: "17", product: "Lilo y Stich", stock: 0, amount: 2800, date: "2025-06-08", observation: "" },
  { id: "18", product: "Tope multiuso", stock: 1, amount: 4900, date: "2025-06-08", observation: "" },
  { id: "19", product: "Maceta acolchonada 80", stock: 0, amount: 9000, date: "2025-06-13", observation: "" },
  { id: "20", product: "Soporte Messi", stock: 1, amount: 13500, date: "2025-06-13", observation: "" },
  { id: "21", product: "Tarjeta Kit avion Fokker G-1", stock: 1, amount: 1300, date: "2025-06-13", observation: "" },
  { id: "22", product: "Maceta Buho", stock: 0, amount: 5300, date: "2025-06-13", observation: "" },
  { id: "23", product: "Organizador escritorio Lego 2", stock: 1, amount: 5600, date: "2025-07-01", observation: "" },
  { id: "24", product: "Organizador escritorio Lego 4", stock: 1, amount: 9000, date: "2025-07-01", observation: "" },
  { id: "25", product: "Organizador escritorio Lego 6", stock: 1, amount: 12300, date: "2025-07-01", observation: "" },
  { id: "26", product: "Organizador escritorio Lego 8", stock: 1, amount: 16000, date: "2025-07-01", observation: "" },
  { id: "27", product: "Perchero de puerta", stock: 1, amount: 2500, date: "2025-06-13", observation: "" },
  { id: "28", product: "Maceta acolchonada 120", stock: 0, amount: 13000, date: "2025-06-14", observation: "" },
  { id: "29", product: "Jarron moderno espiralado", stock: 1, amount: 3100, date: "2025-06-14", observation: "" },
  { id: "30", product: "Salchicha porta papel", stock: 0, amount: 16000, date: "2025-07-01", observation: "" },
  { id: "31", product: "Corona led", stock: 1, amount: "18000", date: "2025-06-18", observation: "" },
  { id: "32", product: "Nespresso harry Potter", stock: 0, amount: 11000, date: "2025-06-18", observation: "" },
  { id: "33", product: "Maceta cucurucho", stock: 0, amount: 3400, date: "2025-06-23", observation: "" },
  { id: "34", product: "Maceta arrecife", stock: 1, amount: 9800, date: "2025-06-23", observation: "" },
  { id: "35", product: "Sapo recipiente", stock: 0, amount: 6500, date: "2025-07-01", observation: "" },
  { id: "36", product: "Tejido Capibara", stock: 2, amount: 3500, date: "2025-07-01", observation: "" },
  { id: "37", product: "Tejido Cerdito", stock: 2, amount: 3500, date: "2025-07-01", observation: "" },
  { id: "38", product: "Tejido Cangrejo", stock: 4, amount: 3500, date: "2025-07-01", observation: "" },
  { id: "39", product: "Expositor de llaveros", stock: 0, amount: 5100, date: "2025-06-23", observation: "" },
  { id: "40", product: "Soporte regulable para celular", stock: 0, amount: 2000, date: "2025-06-24", observation: "" },
  { id: "41", product: "Anillo agarra celular", stock: 2, amount: 500, date: "2025-06-26", observation: "" },
  { id: "42", product: "Labubu Venom/Carnage", stock: 2, amount: 8500, date: "2025-07-01", observation: "" },
  { id: "43", product: "Tetris", stock: 0, amount: 27000, date: "2025-08-01", observation: "" },
  { id: "44", product: "Tetris Caja", stock: 0, amount: 20000, date: "2025-08-01", observation: "" },
  { id: "45", product: "Organizador de cocina Mutillo", stock: 0, amount: 32700, date: "2025-07-01", observation: "Mas completo" },
  { id: "46", product: "Salchicha porta botella geometrico", stock: 0, amount: 19000, date: "2025-07-01", observation: "" },
  { id: "47", product: "Chimuelo articulado", stock: 4, amount: 3500, date: "2025-07-01", observation: "" },
  { id: "48", product: "Chop 600cc", stock: 0, amount: 18000, date: "2025-08-01", observation: "2000 Logo extra" },
  { id: "49", product: "Labubu", stock: 0, amount: 5400, date: "2025-07-01", observation: "" },
  { id: "50", product: "Organizador Brembo", stock: 1, amount: 27000, date: "2025-08-01", observation: "rojo" },
  { id: "51", product: "LLavero", stock: 1, amount: 1400, date: "", observation: "(x50 1200) (x100 1000)" }
]

export default function stockPage() {
  return (
    <div>
      <div className="min-h-screen bg-[url('/fefe.jfif')] bg-cover bg-center w-full  flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable columns={columns} data={data} />
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </div>
  );
}


/*bg-[url('/fefe.jfif')] bg-cover bg-center*/