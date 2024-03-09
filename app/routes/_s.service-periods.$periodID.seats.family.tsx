import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { ServicePeriodTabs } from "~/components/pages/service-periods/headers";
import { Label } from "~/components/shadcn/ui/label";
import { protectedRoute } from "~/lib/auth/auth.server";
import { servicePeriodExists } from "~/lib/service-periods/domain-logic/checks.server";
import { ServicePeriodId } from "~/lib/service-periods/types/service-periods-model";

const schema = z.object({
})

export const action = async ({ request }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);
  // const result = await performMutation({
  //   request,
  //   schema,
  //   mutation: () => void,
  // })
  // if (!result.success) {
  //   return json(result, 400)
  // }
  return redirect(`/service-transactions/`)
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
        <h3>Add Family and Seat</h3>
      </div>
      {
        actionData && <div>
          <pre>{JSON.stringify(actionData, null, 2)}</pre>
        </div>
      }
      <Form method="POST" className="grid gap-4 py-4">
        <input type="hidden" name="servicePeriodId" value={periodID} readOnly />
        <FormInputText label="First Name" id="fName" />
        <FormInputText label="Last Name" id="lName" />
        <FormInputText label="Phone" id="phone" defaultValue="" />
        <FormInputText label="Street" id="street" />
        <FormInputText label="Unit" id="unit" />
        <FormInputText label="City" id="city" defaultValue="Thomasville" />
        <FormInputText label="State" id="state" defaultValue="NC" />
        <FormInputText label="Zip" id="zip" defaultValue="27360" />
        <FormInputText label="Drop Off Notes" id="dropOffNotes" defaultValue="" />
        <div className="grid grid-cols-4 items-center gap-4">
          <button type="submit">Save changes</button>
        </div>
      </Form>

    </div>
  )
}

function FormInputText({
  label, id, defaultValue
}: {
  label: string, id: string, defaultValue?: string
}) {
  return <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
    <Label className="text-left md:text-right">{label}</Label>
    <input readOnly id={id} name={id} defaultValue={defaultValue} className="col-span-3" />
  </div>;
}
