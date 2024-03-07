import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SectionHeaderWithAddAction } from "~/components/common/section-headers";
import { DataTable } from "~/components/display/data-table";
import { ServicePeriodTabs } from "~/components/pages/service-periods/headers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { ServiceTransaction } from "~/lib/service-transactions/types/service-trans-model";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const baseUrl = `/service-periods/${params.periodID}`;

  return json({ baseUrl, service_transactions: [] as ServiceTransaction[], });
};

export default function Route() {
  const { baseUrl, service_transactions } = useLoaderData<typeof loader>();

  return (
    <main>
      <ServicePeriodTabs baseUrl={baseUrl} defaultTab="services" />
      <div className="mt-6" />
      <SectionHeaderWithAddAction title="Service Transactions" addButton={<ActionButton title="Add Service" />} />
      <div className="mt-6" />
      <DataTable columns={[]} data={service_transactions} />
    </main>
  )
};

export function ActionButton({ title, }: { title: string, }) {
  return (
    <Link to="add"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
    >
      {title}
    </Link>
  )
}