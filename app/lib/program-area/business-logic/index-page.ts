import { programAreaDb } from "../program-area-crud";

export const getProgramAreas = async () => {
  const programAreas = await programAreaDb.getAll();
  return programAreas;
};

export const getProgramArea = async (id: string | undefined) => {
  if (!id) {
    throw new Response("No Program Area ID provided.", { status: 404 });
  }

  const programArea = await programAreaDb.read(id);
  if (!programArea) {
    throw new Response("Program Area not found", { status: 404 });
  }
  return programArea;
};
