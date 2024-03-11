import { Outlet } from "@remix-run/react";
import { ContainerPadded } from "~/components/common/containers";
import { SectionHeader } from "~/components/common/header-tabs";



export default function Route() {
  return (
    <ContainerPadded>
      <SectionHeader title="Service Lists" text2="" text3="" />
      <Outlet />
    </ContainerPadded>
  );
}