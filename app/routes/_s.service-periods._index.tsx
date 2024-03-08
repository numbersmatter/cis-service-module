import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { protectedRoute } from "~/lib/auth/auth.server";
import { servicePeriodsDb } from "~/lib/service-periods/service-periods-crud.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const servicePeriods = await servicePeriodsDb.getAll();


  return json({ servicePeriods });
};




export default function Route() {
  const { servicePeriods } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>ServicePeriods</h1>
      <ul>
        {servicePeriods.map((sp) => (
          <li key={sp.id}>
            <Link to={sp.id}>
              {sp.name}, {sp.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
