import { Listbox, Transition } from "@headlessui/react";
import { CheckCircleIcon, FaceFrownIcon, FaceSmileIcon, FireIcon, HandThumbUpIcon, HeartIcon, PaperClipIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CalendarDaysIcon, CreditCardIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ContainerPadded } from "~/components/common/containers";
import { AddItemDialog } from "~/components/common/form-dialog";
import ServiceTransactionHeader from "~/components/pages/service-transactions/headers";
import ServiceInvoice from "~/components/pages/service-transactions/service-invoice";
import { classNames } from "~/lib";
import { protectedRoute } from "~/lib/auth/auth.server";
import { familyDb } from "~/lib/database/families/family-crud.server";
import { FoodBoxOrder } from "~/lib/database/food-box-order/types/food-box-order-model";
import { seatsDb } from "~/lib/database/seats/seats-crud.server";
import { serviceTransactionsDb } from "~/lib/database/service-transactions/service-transactions-crud.server";

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

  ],
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const serviceID = params["serviceID"] ?? "serviceID";

  const service = await serviceTransactionsDb.read(serviceID);
  if (!service) {
    return redirect("/service-transactions");
  }

  const seat = await seatsDb.read(service.delivered_to);
  if (!seat) {
    throw new Response("Transaction is not associated with a seat", { status: 404 });
  }

  const family = await familyDb.read(seat.family_id);
  if (!family) {
    throw new Response("Seat is not associated with a family", { status: 404 });
  }

  // const id = 

  const lineItems = foodBoxRequest

  return json({ serviceID, service, lineItems, seat, family });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};









export default function ServiceTransactionServiceIDRoute() {
  const { serviceID, service, lineItems, family, seat } = useLoaderData<typeof loader>();

  const { service_completed_date, ...rest } = service

  const serviceTransaction = {
    ...rest,
    service_created_data: new Date(service.service_created_data),
    service_updated_date: new Date(service.service_updated_date),
  }

  const familyName = family.family_name;
  const seatData = () => {
    const { unenrolled_date, ...rest } = seat;
    if (seat.unenrolled_date) {
      return {
        ...seat,
        created_date: new Date(seat.created_date),
        updated_date: new Date(seat.updated_date),
        enrolled_date: new Date(seat.enrolled_date),
        unenrolled_date: new Date(seat.unenrolled_date),
      }
    }

    return {
      ...rest,
      created_date: new Date(seat.created_date),
      updated_date: new Date(seat.updated_date),
      enrolled_date: new Date(seat.enrolled_date),
    }
  }

  return (
    <ContainerPadded>
      <ServiceInvoice seat={seatData()} service={serviceTransaction} familyName={familyName}>
        {foodBoxRequest.items.map((item) => (
          <tr key={item.item_id} className="border-b border-gray-100">
            <td className="max-w-0 px-0 py-5 align-top">
              <div className="truncate font-medium text-gray-900">
                {item.item_name}
              </div>
              <div className="truncate text-gray-500">
                {item.item_name}
              </div>
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {item.type}
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {item.quantity}
            </td>
            <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.value}</td>
          </tr>
        ))}
      </ServiceInvoice>
      <pre>{JSON.stringify(lineItems, null, 2)}</pre>
    </ContainerPadded>
  )
}