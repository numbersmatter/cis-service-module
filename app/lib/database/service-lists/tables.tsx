import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@remix-run/react";

interface ServiceListIndexCols {
  id: string;
  name: string;
  description: string;

}


export const serviceListIndexCols: ColumnDef<ServiceListIndexCols>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link to={`${row.original.id}`}>Go to List</Link>
      )
    }
  }
]


