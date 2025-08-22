export default function BalancePage() {
  return (
    <div className="min-h-screen w-screen bg-[url('/fefe.jfif')] bg-cover bg-center flex flex-1 flex-col gap-4 p-4 pt-0">
      
      <div id="balance" className="grid py-2 auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div id="ventas" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      <div id="gastos" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
