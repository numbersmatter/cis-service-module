import type { ActionFunctionArgs } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { FormDialog } from "~/components/common/form-dialog";
import { SectionHeader } from "~/components/common/header-tabs";
import { DataTable } from "~/components/display/data-table";
import { Button } from "~/components/shadcn/ui/button";
import { protectedRoute } from "~/lib/auth/auth.server";
import { programsDb } from "~/lib/database/programs/programs-crud.server";
import { programsOfAreaColumns } from "~/lib/database/programs/tables";


const addProgramSchema = z.object({

})


const addProgramMutation = makeDomainFunction(addProgramSchema)(
  async (values) => {
    // do something

    await programsDb
  }
)


export const loader = async ({ request }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programs = await programsDb.getAll();
  return json({ programs });
};
export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);


  return null;
};





export default function Route() {
  const { programs } = useLoaderData<typeof loader>();
  return (
    <div>
      <SectionHeader title="Programs" text2="text2" text3="text3" />
      <div className="mt-6" />
      <div className="flex justify-end">
        <FormDialog addButton={<Button className="">Add Program</Button>}>

        </FormDialog>
      </div>
      <DataTable columns={programsOfAreaColumns} data={programs} />

    </div>
  );
}


function AddProgramDialog() {
  return (
    <div>
      <h1>Add Program</h1>
    </div>
  );
}