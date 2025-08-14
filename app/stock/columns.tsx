"use client"

// Formatea fechas tipo '2025-08-01' a '01 Ago 2025'
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${day} ${meses[parseInt(month, 10) - 1]} ${year}`;
}


import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StockColumns = {
  id: string
  product: string
  stock: number
  amount: number
  date: string
  observation: string  
}

export const columns: ColumnDef<StockColumns>[] = [
  {
    accessorKey: "product",
    header: "Producto",
    cell: ({ getValue }) => (
      <div className="font-bold">{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Cantidad",
  },
  {
    accessorKey: "amount",
    header: () => <div className="pr-20 text-center w-full">Precio por unidad</div>,
    cell: ({ getValue }) => (
      <div className="pr-20 text-center">{`$${String(getValue())}`}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ getValue }) => (
      <div className="">{formatDate(String(getValue()))}</div>
    ),
  },
  {
    accessorKey: "observation",
    header: "Observación",
  },
]