import { ServiceTransactionId } from "~/lib/service-transactions/types/service-trans-model";

export type DeliveryMethods =
  | "DoorDash"
  | "Drive-thru"
  | "Pick-up"
  | "Staff-delivery";

type ItemTypes = "packed-box" | "pre-packed-box" | "individual-items" | "other";
type ValueEstimationType = "exact" | "approximate" | "other";
type ValueEstimationProcess = "Walmart" | "batch-estimate" | "other";

interface ItemLine {
  item_name: string;
  type: ItemTypes;
  quantity: number;
  value: number;
  item_id: string;
}

export interface FoodBoxOrderDbModel {
  delivery_method: DeliveryMethods;
  items: ItemLine[];
  notes: string;
  value: number;
  photo_url: string;
  value_estimation_type: ValueEstimationType;
  value_estimation_process: ValueEstimationProcess;
}

export interface FoodBoxOrder extends FoodBoxOrderDbModel {
  id: ServiceTransactionId;
}
