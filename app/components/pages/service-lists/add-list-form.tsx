import { Label } from "@radix-ui/react-label";
import { Form } from "@remix-run/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/shadcn/ui/select";



export default function AddServiceListForm({
  children
}: { children?: React.ReactNode }) {


  return (
    <Form method="POST" className="grid gap-4 py-4">
      {children}
      <FormInputText label="Name" id="name" />
      <FormInputText label="Description" id="description" defaultValue="" />
      <ServicePeriodSelect />

      <input type="hidden" readOnly
        name="service_period_id" value="b2HJ2z4NC6xVpSAlTjxN"
      />

      <div className="grid grid-cols-4 items-center gap-4">
        <button type="submit">Save changes</button>
      </div>
    </Form>

  )
}

function ServicePeriodSelect() {
  return <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
    <Label className="text-left md:text-right">Service Period</Label>
    <Select value="b2HJ2z4NC6xVpSAlTjxN"  >
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Spring 2024 Food Box Delivery" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="b2HJ2z4NC6xVpSAlTjxN">
          Spring 2024 Food Box Delivery
        </SelectItem>
      </SelectContent>
    </Select>
  </div>;
}


function FormInputText({
  label, id, defaultValue
}: {
  label: string, id: string, defaultValue?: string
}) {
  return <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
    <Label className="text-left md:text-right">{label}</Label>
    <input id={id} name={id} defaultValue={defaultValue} className="col-span-3" />
  </div>;
}
