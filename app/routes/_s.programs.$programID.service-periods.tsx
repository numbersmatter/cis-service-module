import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ContainerPadded } from "~/components/common/containers";
import { HeaderTabs, SectionHeader, TabOption } from "~/components/common/header-tabs";
import { DataTable } from "~/components/display/data-table";
import { protectedRoute } from "~/lib/auth/auth.server";
import { programsDb } from "~/lib/programs/programs-crud.server";
import { servicePeriodsDb } from "~/lib/service-periods/service-periods-crud.server";
import { servicePeriodsOfProgramColumns } from "~/lib/service-periods/tables";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);

  const programID = params.programID ?? "programID";

  const program = await programsDb.read(programID);
  if (!program) {
    throw new Response("Program not found", { status: 404 });
  }

  const servicePeriods = await servicePeriodsDb.byProgramId(programID);

  const tabs: TabOption[] = [
    { name: 'Overview', to: '', end: true },
    { name: 'Service Periods', to: 'service-periods', end: false },
  ]

  const baseUrl = `/programs/${programID}`;

  return json({ tabs, baseUrl, program, servicePeriods });
};




export default function ProgramIDRouteServicePeriods() {
  const { tabs, baseUrl, servicePeriods } = useLoaderData<typeof loader>();

  const servicePeriodTableData = servicePeriods.map((sp) => {
    return {
      name: sp.name,
      description: sp.description,
      id: sp.id,
    }
  })

  return (
    <>

      <HeaderTabs tabs={tabs} baseUrl={baseUrl} defaultTab="service-periods" />
      <div className="mt-6" />
      <DataTable columns={servicePeriodsOfProgramColumns} data={servicePeriodTableData} />

    </>
  )


}