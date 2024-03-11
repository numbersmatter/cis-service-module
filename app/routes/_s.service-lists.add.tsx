import type { ActionFunctionArgs } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { DataTable } from "~/components/display/data-table";
import { protectedRoute } from "~/lib/auth/auth.server";
import { serviceListsDb } from "~/lib/database/service-lists/service-lists-crud.server";
import { serviceListIndexCols } from "~/lib/database/service-lists/tables";
import z from "zod";
import { makeDomainFunction } from "domain-functions";
import { servicePeriodsDb, servicePeriodToDbModel } from "~/lib/database/service-periods/service-periods-crud.server";
import { seatsDb } from "~/lib/database/seats/seats-crud.server";
import { Service } from "node_modules/@google-cloud/storage/build/esm/src/nodejs-common";
import AddServiceListForm from "~/components/pages/service-lists/add-list-form";
import { performMutation } from "remix-forms";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  service_period_id: z.string(),
});



const mutation = () => makeDomainFunction(schema)
  (async (values) => {

    const service_period = await servicePeriodsDb.read(values.service_period_id);
    if (!service_period) {
      return { status: "error", message: "Service period not found" };
    }

    const seatsArray = await seatsDb.queryByString("service_period_id", values.service_period_id);

    const seatsIds = seatsArray.map(seat => seat.id);


    const service_periodDbModel = servicePeriodToDbModel(service_period);

    const serviceListData = {
      name: values.name,
      description: values.description,
      service_period_id: values.service_period_id,
      service_period: service_periodDbModel,
      serviceType: "FoodBoxOrder",
      seatsArray: seatsIds,
      serviceItems: [],
    }

    // const serviceListId = await serviceListsDb.create({
    //  ...serviceListData,
    // })

    return { status: "success", serviceListData }
  })



export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const serviceLists = await serviceListsDb.getAll();
  return json({ serviceLists });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const result = await performMutation({
    request,
    schema,
    mutation: mutation(),
  });

  return json(result);
};




export default function Route() {
  let { serviceLists } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();



  return (
    <div>
      <Form method="post">
        <AddServiceListForm />
      </Form>
      <pre>
        {JSON.stringify(actionData, null, 2)}
      </pre>
    </div>
  );
}