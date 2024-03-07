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
    </main>
  )
}
