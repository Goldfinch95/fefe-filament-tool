import { SectionCards } from "./section-cards";

export default function BalancePage() {
  return (
    <div className="min-h-screen flex flex-1 flex-col gap-4 p-4 pt-18 sm:pt-0">
      <div id="balance">
        <SectionCards  />
      </div>
      <div id="ventas" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      <div id="gastos" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
