import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { db } from "~/lib/database/firestore.server";
import { DriveThruForm } from "~/lib/database/drive-thru/types";
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from "~/components/shadcn/ui/dialog";
import { Button } from "~/components/shadcn/ui/button";
import { FormNumberField } from "~/components/forms/number-field";
import { useState } from "react";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const formID = params.formID ?? "formID"
  const driveThruForm = await db.drive_thru.read(formID);

  if (!driveThruForm) {
    throw new Response("Not Found", { status: 404 });
  }

  const driveThruFormData = {
    ...driveThruForm,
    created_date: driveThruForm.created_date.toDate()
  } as DriveThruForm;


  return json({ driveThruForm, driveThruFormData });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  let { user, staffData } = await protectedRoute(request);

  return null;
};


export default function Route() {
  const data = useLoaderData<typeof loader>();

  const createdDate = new Date(data.driveThruFormData.created_date);
  const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;

  const formInfo = data.driveThruFormData

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Drive Thru Form</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {formattedDate}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <InfoDisplay
            label="Staff Name"
            value={formInfo.staff_name}
            id="staff_name"
            type="string"
          />
          <InfoDisplay
            label="Staff ID"
            value={formInfo.staff_id}
            id="staff_id"
            type="string"
          />
          <InfoDisplay
            label="Language"
            value={formInfo.form_responses.language}
            id="language"
            type="string"
          />
          <InfoDisplayEditNumber
            label="Number of Adults"
            value={formInfo.form_responses.household_adults} id="household_adults"
            type="number"
          />
          <InfoDisplayEditNumber
            label="Number of Children"
            value={formInfo.form_responses.household_children} id="household_children"
            type="number"
          />
          <InfoDisplayEditNumber
            label="Number of Primary Children"
            value={formInfo.form_responses.primary_children} id="primary_children"
            type="number"
          />
          <InfoDisplayEditNumber
            label="Number of Elementary Children"
            value={formInfo.form_responses.elementary_children} id="elementary_children"
            type="number"
          />
          <InfoDisplayEditNumber
            label="Number of Middle Children"
            value={formInfo.form_responses.middle_children} id="middle_children"
            type="number"
          />
          <InfoDisplayEditNumber label="Number of High Children" value={formInfo.form_responses.high_children} id="high_children" type="number" />
          <InfoDisplay label="Notes" value={formInfo.form_responses.notes} id="notes" type="textArea" />


        </dl>
      </div>
    </>
  )
}


function InfoDisplay({
  label, value, id, type
}: {
  label: string, value: string | number, id: string, type: "string" | "number" | "textArea"
}) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {label}
      </dt>
      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <span className="flex-grow">{value}</span>
        <span className="ml-4 flex-shrink-0">

        </span>
      </dd>
    </div>
  )
}
function InfoDisplayEditNumber({
  label, value, id, type
}: {
  label: string, value: string | number, id: string, type: "string" | "number" | "textArea"
}) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {label}
      </dt>
      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <span className="flex-grow">{value}</span>
        <span className="ml-4 flex-shrink-0">
          <UpdateData id={id} value={value.toString()} label={label} />
        </span>
      </dd>
    </div>
  )
}

function UpdateData({ id, value, label }: { id: string, value: string | number, label: string }) {
  const [open, setOpen] = useState(false);

  const fetcher = useFetcher();
  const actionData = fetcher.data;


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="secondary">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <fetcher.Form method="post">
          <DialogHeader>
            <DialogTitle> Edit Value</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">

            <FormNumberField id={id} label={label} defaultValue={value.toString()} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"secondary"} className="">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="">Submit</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}
