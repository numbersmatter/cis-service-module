import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return null;
};


export default function Route() {

  return <Outlet />;
}
