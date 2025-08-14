"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type pedidosColumns = {
  id: string
  product: string
  stock: number
  color: string
  client: string
  observation: string  
}

export const columns: ColumnDef<pedidosColumns>[] = [
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
    accessorKey: "color",
    header: () => <div className="pr-20 text-center w-full">Color</div>,
    cell: ({ getValue }) => (
      <div className="pr-20 text-center">{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ getValue }) => (
      <div className="">{String(getValue())}</div>
    ),
  },
  {
    accessorKey: "observation",
    header: "Observación",
  },
]