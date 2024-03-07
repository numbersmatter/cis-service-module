import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Fragment } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { ContainerPadded } from "~/components/common/containers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SectionHeaderWithAddAction } from "~/components/common/section-headers";
import DataCards from "~/components/pages/home/data-cards";
import { ServicePeriodHeader, ServicePeriodTabs } from "~/components/pages/service-periods/headers";

const tabs = [
  { name: 'Applied', href: '#', current: false },
  { name: 'Phone Screening', href: '#', current: false },
  { name: 'Interview', href: '#', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Hired', href: '#', current: false },
]





export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const headerData = {
    programName: "Food Box Delivery",
    servicePeriodName: "Spring 2024",
    programAreaName: "CIS - Food Pantry"
  }

  return json({ user, headerData });
};

export default function Route() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <ContainerPadded>
        <ServicePeriodHeader
          programName={data.headerData.programName}
          servicePeriodName={data.headerData.servicePeriodName}
          programAreaName={data.headerData.programAreaName}
        />

        <Outlet />
      </ContainerPadded>
    </>
  )
}