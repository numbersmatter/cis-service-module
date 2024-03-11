import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { HeaderTabs } from "~/components/common/header-tabs";



const tabs = [
  { name: 'Items', to: '', end: true },
  { name: 'Add Seats', to: 'seats', end: false },
  { name: 'Apply List', to: 'apply', end: false },
]



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const serviceListId = params.listID ?? "listId";
  const baseUrl = `/service-lists/${serviceListId}`
  return json({ baseUrl });
};


export default function Route() {
  const { baseUrl } = useLoaderData<typeof loader>();
  return (
    <div>
      <HeaderTabs tabs={tabs} defaultTab="" baseUrl={baseUrl} />
    </div>
  );
}