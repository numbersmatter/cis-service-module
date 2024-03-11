import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataTable } from "~/components/display/data-table";
import { protectedRoute } from "~/lib/auth/auth.server";
import { serviceListsDb } from "~/lib/database/service-lists/service-lists-crud.server";
import { serviceListIndexCols } from "~/lib/database/service-lists/tables";




export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const serviceLists = await serviceListsDb.getAll();
  return json({ serviceLists });
};



export default function Route() {
  let { serviceLists } = useLoaderData<typeof loader>();


  return (
    <div>
      <DataTable columns={serviceListIndexCols} data={serviceLists} />
    </div>
  );
}