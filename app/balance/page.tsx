import { SectionCards } from "./components/Section-Cards";
import { DataTable } from "./components/Data-table";
import dataJson from "./data.json"
import { SellData } from "@/interfaces/types";

const data = dataJson as unknown as SellData[];
const totalSells = data.reduce((acc, item) => acc + item.amount, 0);
const totalObjects = data.reduce((acc, item) => acc + item.number, 0);

export default function BalancePage() {
  return (
    <div className="  flex-col p-4 pt-18 sm:pt-0">
      <div id="balance">
        <SectionCards  totalSells={totalSells} totalObjects={totalObjects} />
      </div>
      <div>
        <DataTable  data={data}/>
      </div>
      <div className="pt-10">
        <DataTable  data={data}/>
      </div>
    </div>
  );
}
