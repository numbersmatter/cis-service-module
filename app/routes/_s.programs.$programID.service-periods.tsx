import type { ActionFunctionArgs } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { Button } from "~/components/shadcn/ui/button";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { ContainerPadded } from "~/components/common/containers";
import { FormDialogVer1 } from "~/components/common/form-dialog";
import { HeaderTabs, SectionHeader, TabOption } from "~/components/common/header-tabs";
import { DataTable } from "~/components/display/data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/shadcn/ui/card";
import { Input } from "~/components/shadcn/ui/input";
import { Label } from "~/components/shadcn/ui/label";
import { protectedRoute } from "~/lib/auth/auth.server";
import { programsDb } from "~/lib/database/programs/programs-crud.server";
import { servicePeriodsDb } from "~/lib/database/service-periods/service-periods-crud.server";
import { servicePeriodsOfProgramColumns } from "~/lib/database/service-periods/tables";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const programID = params.programID ?? "programID";

  const program = await programsDb.read(programID);
  if (!program) {
    throw new Response("Program not found", { status: 404 });
  }

  const servicePeriods = await servicePeriodsDb.byProgramId(programID);

  const tabs: TabOption[] = [
    { name: 'Overview', to: '', end: true },
    { name: 'Service Periods', to: 'service-periods', end: false },
  ]

  const baseUrl = `/programs/${programID}`;

  return json({ tabs, baseUrl, program, servicePeriods });
};


const schema = z.object({
  name: z.string(),
  description: z.string(),
});

const mutation = makeDomainFunction(schema)(
  async (values) => {
    return values;
  }
)

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { user } = await protectedRoute(request);

  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  return json({ result });
};


export default function ProgramIDRouteServicePeriods() {
  const { tabs, baseUrl, servicePeriods } = useLoaderData<typeof loader>();

  const servicePeriodTableData = servicePeriods.map((sp) => {
    return {
      name: sp.name,
      description: sp.description,
      id: sp.id,
    }
  })

  return (
    <>

      <HeaderTabs tabs={tabs} baseUrl={baseUrl} defaultTab="service-periods" />
      <div className="mt-6 flex flex-row justify-between">
        <FormDialogVer1>
          <Form method="post">
            <Card>
              <CardHeader>
                <CardTitle>Other Item</CardTitle>
                <CardDescription>
                  Add other item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="item_name">Name</Label>
                  <Input name="item_name" id="item_name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" name="quantity" type="number" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="value">Unit Value</Label>
                  <Input id="value" name="value" type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button name="actionType" value="addItem" type="submit">
                  Add Item
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </FormDialogVer1>
      </div>
      <div className="mt-6" />
      <DataTable columns={servicePeriodsOfProgramColumns} data={servicePeriodTableData} />

    </>
  )


}