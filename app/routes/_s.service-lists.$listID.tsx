import type { ActionFunctionArgs } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Fragment, useState } from 'react'
import { ContainerPadded } from "~/components/common/containers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { Form, isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import DataCards from "~/components/pages/home/data-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/ui/card"
import { Input } from "~/components/shadcn/ui/input"
import { Label } from "~/components/shadcn/ui/label"

import { RouteError, StandardError } from "~/components/common/ErrorPages";
import { serviceListsDb } from "~/lib/database/service-lists/service-lists-crud.server";
import ProgressPanels, { Step } from "~/components/common/progress-panels";
import { ServiceListProgress } from "~/components/pages/service-lists/service-list-tabs";
import { ProgressTabsContent } from "~/components/shadcn/ui/tabs-progress";
import { Button } from "~/components/shadcn/ui/button";
import { FoodBoxRequestInvoiceTable } from "~/components/pages/service-transactions/service-invoice";
import { FoodBoxOrder } from "~/lib/database/food-box-order/types/food-box-order-model";
import { DataTable } from "~/components/display/data-table";
import { serviceListItemsCols } from "~/lib/database/service-lists/tables";
import { FormDialog } from "~/components/common/form-dialog";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";

const schema = z.object({
  item_name: z.string(),
  quantity: z.number(),
  value: z.number(),
})

const mutation = makeDomainFunction(schema)(
  (async (values) => {



    return { status: "success", values }
  })
)

const foodBoxRequest: FoodBoxOrder = {
  id: "1",
  photo_url: "",
  notes: "",
  value_estimation_process: "other",
  value_estimation_type: "other",
  delivery_method: 'DoorDash',
  items: [
    {
      item_id: "fdsfef",
      item_name: "March 1, 2024 Menu Box",
      value: 7000,
      quantity: 1,
      type: "menu-box"
    },
    {
      item_id: "fdfac",
      item_name: "Bread Item",
      value: 300,
      quantity: 1,
      type: "individual-items"
    },

  ],
}



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const listID = params.listID ?? "listID"
  const serviceList = await serviceListsDb.read(listID);

  if (!serviceList) {
    throw new Response("Service List not found", { status: 404 });
  }

  const headerData = {
    programName: "Service List",
    servicePeriodName: "Spring 2024",
    programAreaName: "CIS - Food Pantry"
  }

  const steps: Step[] = [
    { id: 'items', name: 'Menu Items', to: '#', status: 'complete' },
    { id: 'seat', name: 'Seat Selection', to: '#', status: 'current' },
    { id: 'preview', name: 'Preview', to: '#', status: 'upcoming' },
  ]

  return json({ user, headerData, serviceList, steps });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const result = await performMutation({
    request,
    schema,
    mutation
  })

  return json({ result });
};


export default function Route() {
  const data = useLoaderData<typeof loader>();
  const [steps, setSteps] = useState(data.steps)


  return (
    <>

      <ServiceListProgress defaultValue="items" steps={steps}>
        <ProgressTabsContent value="items" >
          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>
                Add the menu items for this service list.
              </CardDescription>
            </CardHeader>
            <DataTable columns={serviceListItemsCols} data={data.serviceList.serviceItems} />

            <CardFooter>
              <FormDialog>
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
                        <Input name="quantity" type="number" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="value">Unit Value</Label>
                        <Input name="value" type="number" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Add Item</Button>
                    </CardFooter>
                  </Card>
                </Form>
              </FormDialog>
            </CardFooter>
          </Card>


        </ProgressTabsContent>

      </ServiceListProgress>
      <pre>{JSON.stringify(data.serviceList, null, 2)} </pre>

    </>
  )
}


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const test = error
    return <RouteError routeError={error} />
  }
  else if (error instanceof Error) {
    return (
      <StandardError error={error} />
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}