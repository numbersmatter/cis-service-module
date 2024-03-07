import { Listbox, Transition } from "@headlessui/react";
import { CheckCircleIcon, FaceFrownIcon, FaceSmileIcon, FireIcon, HandThumbUpIcon, HeartIcon, PaperClipIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CalendarDaysIcon, CreditCardIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ContainerPadded } from "~/components/common/containers";
import ServiceTransactionHeader from "~/components/pages/service-transactions/headers";
import { classNames } from "~/lib";
import { protectedRoute } from "~/lib/auth/auth.server";
import { serviceTransactionsDb } from "~/lib/service-transactions/service-transactions-crud.server";

const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
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

  const lineItems = invoice

  return json({ serviceID, service, lineItems });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};









export default function ServiceTransactionServiceIDRoute() {
  const { serviceID, service, lineItems } = useLoaderData<typeof loader>();


  return (
    <ContainerPadded>
      <ServiceTransactionHeader serviceID={serviceID} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Invoice summary */}
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
              <dl className="flex flex-wrap">
                <div className="flex-auto pl-6 pt-6">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    Value
                  </dt>
                  <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">${service.value.toFixed(2)}</dd>
                </div>
                <div className="flex-none self-end px-6 pt-4">
                  <dt className="sr-only">Status</dt>
                  <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                    Paid
                  </dd>
                </div>
                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                  <dt className="flex-none">
                    <span className="sr-only">Client</span>
                    <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd className="text-sm font-medium leading-6 text-gray-900">Family Name</dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Recieved</span>
                    <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    {
                      service.service_completed_date ? new Date(service.service_completed_date).toDateString() : "Not Completed"
                    }
                  </dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Status</span>
                    <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    {service.status}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Go to family <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Transaction
            </h2>
            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
              <div className="sm:pr-4">
                <dt className="inline text-gray-500">
                  Created On {new Date(service.service_created_data).toDateString()}
                </dt>{' '}
                <dd className="inline text-gray-700">
                  { }
                </dd>
              </div>
              <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-500"></dt>{' '}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-31-01"></time>
                </dd>
              </div>
              <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-gray-900">From</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">
                    Food Delivery Program
                  </span>
                  <br />
                  Communities in Schools Thomasville
                  <br />

                </dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-gray-900">To</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">
                    Family
                  </span>
                  <br />
                  {/* 886 Walter Street */}
                  <br />
                  {/* New York, NY 12345 */}
                </dd>
              </div>
            </dl>
            <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
              <colgroup>
                <col className="w-full" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="border-b border-gray-200 text-gray-900">
                <tr>
                  <th scope="col" className="px-0 py-3 font-semibold">
                    Service Items
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Type
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Quanity
                  </th>
                  <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">{item.title}</div>
                      <div className="truncate text-gray-500">{item.description}</div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {item.hours}
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {item.rate}
                    </td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr>
                  <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                    Subtotal
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Subtotal
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                    Tax
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Tax
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                    Total
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                  >
                    Total
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                    {invoice.total}
                  </td>
                </tr>
              </tfoot> */}
            </table>
          </div>

          <div className="lg:col-start-3">
            {/* Activity feed */}
            <h2 className="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
            {/* <ul role="list" className="mt-6 space-y-6">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                  <div
                    className={classNames(
                      activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                      'absolute left-0 top-0 flex w-6 justify-center'
                    )}
                  >
                    <div className="w-px bg-gray-200" />
                  </div>
                  {activityItem.type === 'commented' ? (
                    <>
                      <img
                        src={activityItem.person.imageUrl}
                        alt=""
                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                        <div className="flex justify-between gap-x-4">
                          <div className="py-0.5 text-xs leading-5 text-gray-500">
                            <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                          </div>
                          <time
                            dateTime={activityItem.dateTime}
                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                          >
                            {activityItem.date}
                          </time>
                        </div>
                        <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        {activityItem.type === 'paid' ? (
                          <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                        )}
                      </div>
                      <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span>{' '}
                        {activityItem.type} the invoice.
                      </p>
                      <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {activityItem.date}
                      </time>
                    </>
                  )}
                </li>
              ))}
            </ul> */}

            {/* New comment form */}
            {/* <div className="mt-6 flex gap-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-50"
              />
              <form action="#" className="relative flex-auto">
                <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                    rows={2}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Add your comment..."
                    defaultValue={''}
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                  <div className="flex items-center space-x-5">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                      >
                        <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Attach a file</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                            <div className="relative">
                              <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                <span className="flex items-center justify-center">
                                  {selected.value === null ? (
                                    <span>
                                      <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                      <span className="sr-only">Add your mood</span>
                                    </span>
                                  ) : (
                                    <span>
                                      <span
                                        className={classNames(
                                          selected.bgColor,
                                          'flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                      >
                                        <selected.icon
                                          className="h-5 w-5 flex-shrink-0 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                      <span className="sr-only">{selected.name}</span>
                                    </span>
                                  )}
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                  {moods.map((mood) => (
                                    <Listbox.Option
                                      key={mood.value}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'bg-gray-100' : 'bg-white',
                                          'relative cursor-default select-none px-3 py-2'
                                        )
                                      }
                                      value={mood}
                                    >
                                      <div className="flex items-center">
                                        <div
                                          className={classNames(
                                            mood.bgColor,
                                            'flex h-8 w-8 items-center justify-center rounded-full'
                                          )}
                                        >
                                          <mood.icon
                                            className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                      </div>
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>

    </ContainerPadded>
  )

}