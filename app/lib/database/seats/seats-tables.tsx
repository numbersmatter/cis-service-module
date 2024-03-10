import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@remix-run/react";
import { IndeterminateCheckbox } from "~/components/common/indeterminate-checkbox";
import { useMemo } from "react";
import { Checkbox } from "~/components/shadcn/ui/checkbox";

interface ServicePeriodSeatsCols {
  id: string;
  family_name: string;
  enrolled_date: Date;
  number_of_members: number;

}


export const seatsOfServicePeriod: ColumnDef<ServicePeriodSeatsCols>[] =
  [
    {
      // id: "select",
      // header: ({ table }) => {
      //   return (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler(),

      //       }}
      //     />
      //   )
      // },
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "family_name",
      header: "Name",
    },
    {
      accessorKey: "enrolled_date",
      header: "Enrollment Date",
    },
    {
      id: "id",
      accessorKey: "id",
      header: "Link",
      cell: ({ row }) => {
        return (
          <Link to={`${row.original.id}`}>Link</Link>
        )
      }
    }
  ]
