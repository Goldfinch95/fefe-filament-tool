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
]

export default function stockPage() {
  return (
    <div>
      <div className="min-h-screen bg-[url('/fefe.jfif')] bg-cover bg-center w-full  flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}


/*bg-[url('/fefe.jfif')] bg-cover bg-center*/