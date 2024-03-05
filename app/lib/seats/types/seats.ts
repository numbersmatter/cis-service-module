import { ServicePeriodId } from "~/lib/service-periods/types/service-periods-model";

export interface Seat {
  id: string;
  service_period_id: ServicePeriodId;
  application_id: string;
  is_active: boolean;
  status: "pending" | "active" | "inactive";
  created_date: Date;
  updated_date: Date;
  enrolled_date: Date;
}
