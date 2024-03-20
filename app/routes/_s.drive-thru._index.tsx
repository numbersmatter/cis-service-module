import { Link, Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { ContainerPadded } from "~/components/common/containers";
import { SectionHeaderWithAddAction } from "~/components/common/section-headers";
import { DataTable } from "~/components/display/data-table";
import { driveThruTable } from "~/lib/database/drive-thru/drive-thru-tables";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  return json({});
};


const driveThruForms = [
  {
    staff_id: "1",
    staff_name: "John Doe",
    created_date: new Date().toLocaleDateString(),
    form_id: "3"
  }
]



export default function Route() {

  return (
    <>
      <SectionHeaderWithAddAction
        title="Drive Thru Forms"
        addButton={<LinkToAdd />}
      />
      <DataTable columns={driveThruTable} data={driveThruForms} />
    </>
  )
}


function LinkToAdd() {
  return (
    <Link to="/drive-thru/add" className="">Add Drive Thru Form</Link>
  )
}