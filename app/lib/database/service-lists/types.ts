import { ItemLine } from "~/lib/value-estimation/types/item-estimations";
import { SeatId } from "../seats/types/seats-model";
import {
  ServicePeriod,
  ServicePeriodId,
} from "../service-periods/types/service-periods-model";
import { ServiceTransactionType } from "../service-transactions/types/service-trans-model";

export interface ServiceList {
  id: number;
  name: string;
  description: string;
  service_period_id: ServicePeriodId;
  seatsArray: SeatId[];
  serviceType: ServiceTransactionType;
  serviceItems: ItemLine[];
  created_date: Date;
  applied_date: Date;
}
