import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SectionHeaderWithAddAction } from "~/components/common/section-headers";
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
      <SectionHeaderWithAddAction
        title="Service Lists"
        addButton={<Link to="/service-lists/add" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">New Service List</Link>}
      />
      <DataTable columns={serviceListIndexCols} data={serviceLists} />
    </div>
  );
}