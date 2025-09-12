import { TrendingDown, TrendingUp } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from "@/common/components/ui/card"

const DATA = [
  {
    id: 1,
    title: "Debe",
    amount: "$146.342,00",
    trending: "up",
    info: "bajale a las compras"
  },
  {
    id: 2,
    title: "Haber",
    amount: "$177.945,00",
    trending: "down",
    info: "requiere mas atención"
  },
  {
    id: 3,
    title: "Resultado",
    amount: "$316.027,87",
    trending: "up",
    info: "superando los objetivos"
  }
]

export function SectionCards() {
  return (
    <div className="grid py-2 auto-rows-min gap-4 md:grid-cols-3 ">
        {DATA.map((item,i) => (
        <Card key={i} className="@container/card dark">
        <CardHeader>
          <CardDescription>{item.title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.amount}
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                {item.trending === "up" ? "subiendo los gastos" : "bajaste 20% este periodo"} {item.trending === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            </div>
          <div className="text-muted-foreground">
            {item.info}
          </div>
        </CardFooter>
      </Card>   
        ))}
    </div>
  )
}

