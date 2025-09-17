import { TrendingDown, TrendingUp } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from "@/common/components/ui/card"




// Recibe los datos externos para sumar las ventas

export function SectionCards({ totalSells, totalObjects }: { totalSells: number, totalObjects : number }) {
  // Formatea el número como moneda argentina
  function formatAmount(amount: number): string {
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const debeAmount = 100;
  const resultado = totalSells - debeAmount;

  const DATA = [
    {
      id: 1,
      title: "Debe",
      amount: formatAmount(debeAmount),
      trending: "down",
      info: "bajale a las compras"
    },
    {
      id: 2,
      title: "Haber",
      amount: formatAmount(totalSells), 
      trending: "up",
      info: "vas bien, seguí así"
    },
    {
      id: 3,
      title: "Resultado",
      amount: formatAmount(resultado), 
      trending: "none",
      info: "superando los objetivos"
    }
  ];

  

  return (
    <div className="grid pt-2 py-5 auto-rows-min gap-4 px-4 lg:px-6 md:grid-cols-3 ">
      {DATA.map((item, i) => (
        <Card key={i} className="@container/card dark">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.amount}
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
  <div className="line-clamp-1 flex gap-2 font-medium">
    {item.trending === "up"
      ? `de un total de ${totalObjects} productos vendidos`
      : item.trending === "down"
        ? "de un total de 1 producto gastado"
        : null}
    {" "}
    {item.trending === "up"
      ? <TrendingUp className="size-4" />
      : item.trending === "down"
        ? <TrendingDown className="size-4" />
        : null}
  </div>
  <div className="text-muted-foreground">
    {item.info}
  </div>
</CardFooter>
        </Card>
      ))}
    </div>
  );
}

