import React from "react";
import { columns, pedidosColumns } from "./columns"
import { DataTable } from "./data-table";

const data: pedidosColumns[] = [
    { id: "1", product: "Maceta moderna", stock: 5, color: "Rojo", client: "Cliente A", observation: "Entregar el lunes" },
    { id: "2", product: "Jarron elegante", stock: 3, color: "Azul", client: "Cliente B", observation: "" },
    { id: "3", product: "Porta lápices", stock: 10, color: "Verde", client: "Cliente C", observation: "Incluir nota de agradecimiento" },
    { id: "4", product: "Maceta minimalista", stock: 2, color: "Blanco", client: "Cliente D", observation: "" },
    { id: "5", product: "Jarron vintage", stock: 4, color: "Negro", client: "Cliente E", observation: "Urgente" },

]

export default function pedidosPage() {
  return (
    <div>
      <div className="dark min-h-screen bg-[url('/fefe.jfif')] bg-cover bg-center w-full  flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}   