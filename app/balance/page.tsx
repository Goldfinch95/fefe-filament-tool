export default function BalancePage() {
  return (
    <div className="min-h-screen w-full bg-[url('/fefe.jfif')] bg-cover bg-center flex flex-1 flex-col gap-4 p-4 pt-0">
      
      <div id="top" className="grid py-2 auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div id="mid" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      <div id="bottom" className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
