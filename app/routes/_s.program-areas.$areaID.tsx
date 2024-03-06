import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getProgramArea } from "~/lib/program-area/business-logic/index-page";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const areaID = params.areaID;
  const programArea = await getProgramArea(areaID);
  return json({});
};

export default function ProgramAreaDetails() {
  return (
    <div>
      <h1>Program Area Details</h1>
    </div>
  )
}