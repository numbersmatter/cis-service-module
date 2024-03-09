import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { AddSeatsTabs } from "~/components/pages/service-periods/add-seat-tabs";
import { ServicePeriodTabs } from "~/components/pages/service-periods/headers";
import { Label } from "~/components/shadcn/ui/label";
import { protectedRoute } from "~/lib/auth/auth.server";
import { servicePeriodExists } from "~/lib/database/service-periods/domain-logic/checks.server";
import { ServicePeriodId } from "~/lib/database/service-periods/types/service-periods-model";

const schema = z.object({
  fname: z.string().min(2).max(50),
  lname: z.string().min(2).max(50),
  phone: z.string().length(10),
  street: z.string().min(2).max(50),
  unit: z.string().max(50),
  city: z.string().min(2).max(50),
  state: z.string().length(2),
  zip: z.string().length(5),
  dropOffNotes: z.string(),
})


const mutation = makeDomainFunction(schema)(async (values) => {
  console.log(values);
  return { status: "success" }

})

export const action = async ({ request }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const result = await performMutation({ request, schema, mutation });

  return json({ result })
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const periodID: ServicePeriodId = params["periodID"] ?? "periodID";

  const exists = await servicePeriodExists(periodID);
  if (!exists) {
    return json({ periodID }, 404);
  }




  return json({ periodID });
};


export default function Route() {
  const { periodID } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <div className="mx-auto prose">
        <h3>Add Seat to Service Period</h3>
      </div>
      {
        actionData && <div>
          <pre>{JSON.stringify(actionData, null, 2)}</pre>
        </div>
      }
      <AddSeatsTabs />

    </div>
  )
}

