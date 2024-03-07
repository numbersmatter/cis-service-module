import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod"
import { Label } from "~/components/shadcn/ui/label";
import { protectedRoute } from "~/lib/auth/auth.server";
import { RemixForm } from "~/lib/remix-forms/form"


const schema = z.object({
  seatId: z.string().default("newSeatID"),
  serviceType: z.enum(["FoodBoxOrder", "Other"]).default("FoodBoxOrder"),
  value: z.number().default(0),
  status: z.enum(["pending", "received", "cancelled"]).default("pending"),
})



export const action = async ({ request }: ActionFunctionArgs) => {
  let { user } = await protectedRoute(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)
  return json({ message: "success", data });
};



export default function AddServiceRoute() {

  return (
    <main>
      <Form method="POST" className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Seat Id</Label>
          <input readOnly id="seatId" name="seatId" value="New ID" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Service Type</Label>
          <select id="servicetype" name="serviceType" className="col-span-3">
            <option value="FoodBoxOrder">Food Box Order</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Value</Label>
          <input id='value' name='value' defaultValue={0} type="number" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            Status
          </Label>
          <select id='status' name='status' className="col-span-3">
            <option value="pending">Pending</option>
            <option value="received">Received</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <button type="submit">Save changes</button>
        </div>
      </Form>

    </main>
  )

}