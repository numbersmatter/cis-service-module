import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";

export type ServiceTransactionCols = {
  delivered_to: string;
  created_date: string;
  items: string;
};

export const serviceTransactionColumns: ColumnDef<ServiceTransactionCols>[] =
  [];
