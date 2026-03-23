
/*Actualiza la cantidad de un color via API route*/

export const updateColorInBackend = async (
  id: string,
  number: number
): Promise<void> => {
  const res = await fetch("/api/updateColor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, number }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error desconocido");
  }
};