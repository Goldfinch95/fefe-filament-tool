import { SectionCards } from "./components/Section-Cards";
import { DataTable } from "./components/Data-table";
import data from "./data.json"

export default function BalancePage() {
  return (
    <div className="  flex-col p-4 pt-18 sm:pt-0">
      <div id="balance">
        <SectionCards  />
      </div>
      <div>
        <DataTable  data={data}/>
      </div>
      {/*<div id="gastos" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />*/}
    </div>
  );
}
