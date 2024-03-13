import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SectionHeader } from "~/components/common/header-tabs";
import { DataTable } from "~/components/display/data-table";
import { protectedRoute } from "~/lib/auth/auth.server";
import { programsDb } from "~/lib/database/programs/programs-crud.server";
import { programsOfAreaColumns } from "~/lib/database/programs/tables";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programs = await programsDb.getAll();
  return json({ programs });
};


export default function Route() {
  const { programs } = useLoaderData<typeof loader>();
  return (
    <div>
      <SectionHeader title="Programs" text2="text2" text3="text3" />
      <div className="mt-6" />
      <DataTable columns={programsOfAreaColumns} data={programs} />

    </div>
  );
}