import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DropdownNavMenu } from "~/components/common/dropdown-nav-menu";
import { SectionHeaderWithAddAction } from "~/components/common/section-headers";
import { ServicePeriodTabs } from "~/components/pages/service-periods/headers";
import { protectedRoute } from "~/lib/auth/auth.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const baseUrl = `/service-periods/${params.periodID}`;

  return json({ baseUrl });
};

export default function Route() {
  const { baseUrl } = useLoaderData<typeof loader>();

  const menuItems = [
    { label: 'New Family and Seat', textValue: 'family' },
    { label: 'New Seat', textValue: 'seat' },
  ]

  const onMenuSelect = (value: string) => {
    console.log('menu select', value);
  }

  return (
    <main>
      <SectionHeaderWithAddAction
        title="Seats"
        addButton={<DropdownNavMenu
          menuItems={menuItems}
          onSelect={onMenuSelect}
          menuTitle="Add"
          menuLabel="Select Type"
        />}
      />
    </main>
  )
};

function ActionButton({ title, }: { title: string, }) {
  return (
    <button
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
    >
      {title}
    </button>
  )
}