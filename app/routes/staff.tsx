import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError, json } from "@remix-run/react";
import { StaffShell } from "~/components/shell/staff-shell";
import { authenticator } from "~/lib/auth/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>()
  return (
    <StaffShell>
      <div>
        <h1>Staff Route</h1>
      </div>
    </StaffShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div />
  }
  return <div />
}