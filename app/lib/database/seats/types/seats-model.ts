import { Timestamp } from "firebase-admin/firestore";
import { ServicePeriodId } from "~/lib/database/service-periods/types/service-periods-model";

export type SeatId = string;

export interface Seat {
  id: SeatId;
  service_period_id: ServicePeriodId;
  application_id: string;
  is_active: boolean;
  status: "pending" | "active" | "inactive";
  created_date: Date;
  updated_date: Date;
  enrolled_date: Date;
  unenrolled_date?: Date;
}

export interface SeatDbModel {
  service_period_id: ServicePeriodId;
  application_id: string;
  is_active: boolean;
  status: "pending" | "active" | "inactive";
  created_date: Timestamp;
  updated_date: Timestamp;
  enrolled_date: Timestamp;
  unenrolled_date?: Timestamp;
}

export interface SeatAdd {
  service_period_id: ServicePeriodId;
  application_id: string;
  is_active: boolean;
  status: "pending" | "active" | "inactive";
}
