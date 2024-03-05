import { Timestamp } from "firebase-admin/firestore";

export type ServicePeriodId = string;
type ServicePeriodCapacity = number; // number of active seats
type ProgramId = string;

export interface ServicePeriod {
  id: ServicePeriodId;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  capacity: ServicePeriodCapacity;
  program_id: ProgramId;
}

export interface ServicePeriodDbModel {
  name: string;
  description: string;
  start_date: Timestamp;
  end_date: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
  capacity: ServicePeriodCapacity;
  program_id: ProgramId;
}
