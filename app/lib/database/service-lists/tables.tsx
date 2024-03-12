import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@remix-run/react";
import { ItemLine } from "~/lib/value-estimation/types/item-estimations";

interface ServiceListIndexCols {
  id: string;
  name: string;
  description: string;
}

// export interface ItemLine {
//   item_name: string;
//   type: ItemTypes;
//   quantity: number;
//   value: number;
//   item_id: string;
// }

export const serviceListItemsCols: ColumnDef<ItemLine>[] = [
  {
    accessorKey: "item_name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "item_id",
    accessorKey: "item_id",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link to={`${row.original.item_id}`}>{row.original.item_id}</Link>
      )
    }
  }

]


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


