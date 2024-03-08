import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";

export type ServiceTransactionCols = {
  delivered_to: string;
  status: string;
  id: string;
};

export const serviceTransactionColumns: ColumnDef<ServiceTransactionCols>[] = [
  {
    accessorKey: "delivered_to",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      return <Link to={`/service-transactions/${row.original.id}`}>Link</Link>;
    },
  },
];

