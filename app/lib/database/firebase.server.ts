import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";

// helper function to firestore data to typescript
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const dataPoint = <T extends FirebaseFirestore.DocumentData>(
  collectionPath: string
) => getFirestore().collection(collectionPath).withConverter(converter<T>());

type FirestorCollectionPath = string;
interface NonprofitDbPaths {
  [key: string]: FirestorCollectionPath;
}

export const fireDb = (path: FirestorCollectionPath) =>
  getFirestore().collection(path);

export const cis_t_Db: NonprofitDbPaths = {
  servicePeriods: "/nonprofits/cist/service_periods",
  seats: "/nonprofits/cist/seats",
  applications: "/nonprofits/cist/applications",
  service_transactions: "/nonprofits/cist/service_transactions",
  foodBoxOrders: "/nonprofits/cist/service_types/food_pantry/food_box_orders",
  packedFoodBoxes: "/nonprofits/cist/inventory/food_pantry/packed_food_boxes",
  programAreas: "/nonprofits/cist/program_areas",
  programs: "/nonprofits/cist/programs",
};
