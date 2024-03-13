import type { ActionFunctionArgs } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { Button } from "~/components/shadcn/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/shadcn/ui/card"
import { protectedRoute } from "~/lib/auth/auth.server";
import { serviceListsDb } from "~/lib/database/service-lists/service-lists-crud.server";
import { calculateTotalValue } from "~/lib/database/service-lists/utils";
import { serviceTransactionsDb } from "~/lib/database/service-transactions/service-transactions-crud.server";
import { ServiceTransaction } from "~/lib/database/service-transactions/types/service-trans-model";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const listID = params.listID ?? "listID";
  const serviceList = await serviceListsDb.read(listID);
  if (!serviceList) {
    return json({ error: "Service List not found" }, { status: 404 });
  }

  const serviceType = serviceList.serviceType;
  const numberOfRecords = serviceList.seatsArray.length;

  return json({ serviceType: "Food Box Request", numberOfRecords });
};

const schema = z.object({
  actionType: z.literal("applyServiceList"),
  serviceListID: z.string().length(20),
})

const mutation = makeDomainFunction(schema)(
  (async (values) => {
    const serviceList = await serviceListsDb.read(values.serviceListID);
    if (!serviceList) {
      throw new Response("Service List not found", { status: 404 })
    }

    const transactionValue = calculateTotalValue(serviceList.serviceItems)

    const transaction_promises = serviceList.seatsArray.map(async (seat) => {
      // create transaction
      const transactionData: ServiceTransaction = {
        service_type: serviceList.serviceType,
        status: "pending",
        delivered_to: seat,
        service_created_data: new Date(),
        service_updated_date: new Date(),
        id: "",
        service_period_id: serviceList.service_period_id,
        value: transactionValue,
      }

      return serviceTransactionsDb.create(
        transactionData
      );
    })

    const transactions = await Promise.all(transaction_promises);


    console.log(values);
    return transactions;
  })
)


export const action = async ({ request, params }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const listID = params.listID ?? "listID";
  const serviceList = await serviceListsDb.read(listID);
  if (!serviceList) {
    return json({ error: "Service List not found" }, { status: 404 });
  }

  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  return json({ result });
};





export default function Route() {
  const data = useLoaderData<typeof loader>();
  return (
    <PreviewCard
      serviceType="Food Box Request"
      numberOfRecords={2}
    />
  )
}


function PreviewCard({
  serviceType,
  numberOfRecords,
}: {
  serviceType: string,
  numberOfRecords: number
}) {
  return (

    <Card>
      <CardHeader>
        <CardTitle> Apply This List of Services</CardTitle>
        <CardDescription>
          This will create individual service transactions for your seats selected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action will create {serviceType} transactions on {numberOfRecords.toString()} records</p>

      </CardContent>
      <CardFooter className="flex flex-row justify-between" >
        <Button variant="link">Back</Button>
        <Button variant="default">Apply</Button>
      </CardFooter>
    </Card>
  )
}