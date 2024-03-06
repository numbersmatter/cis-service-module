import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProgramAreaDetails from "~/components/pages/program-areas/program-area-details";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getProgramArea } from "~/lib/program-area/business-logic/domain";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const areaID = params.areaID;
  const programArea = await getProgramArea(areaID);
  return json({ programArea });
};

export default function ProgramAreaDetailsRoute() {
  const data = useLoaderData<typeof loader>();

  const programArea = {
    ...data.programArea,
    created_date: new Date(data.programArea.created_date),
  }


  return (
    <main>
      <ProgramAreaDetails programArea={programArea} />
      <ServicePeriodHeader />
    </main>
  )
}

export function ServicePeriodHeader() {
  return (
    <div className="mt-3 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Service Periods
      </h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Service Period
        </button>
      </div>
    </div>
  )
}