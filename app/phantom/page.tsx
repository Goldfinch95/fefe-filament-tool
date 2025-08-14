import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/fefe.jfif')] bg-cover bg-center flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* blocks */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
};

export default page;