// service-periods CRUD operations
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
  getFirestore,
} from "firebase-admin/firestore";
import { cis_t_Db, dataPoint } from "../database/firebase.server";
import {
  ServicePeriod,
  ServicePeriodDbModel,
} from "./types/service-periods-model";

// Function to convert ServicePeriod to ServicePeriodDbModel
function servicePeriodToDbModel(
  servicePeriod: ServicePeriod
): ServicePeriodDbModel {
  return {
    ...servicePeriod,
    start_date: Timestamp.fromDate(servicePeriod.start_date),
    end_date: Timestamp.fromDate(servicePeriod.end_date),
    created_at: Timestamp.fromDate(servicePeriod.created_at),
    updated_at: Timestamp.fromDate(servicePeriod.updated_at),
  };
}

// Firestore data converter
const servicePeriodConverter: FirestoreDataConverter<ServicePeriod> = {
  toFirestore(servicePeriod: ServicePeriod): DocumentData {
    return servicePeriodToDbModel(servicePeriod);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ServicePeriod {
    const data = snapshot.data() as ServicePeriodDbModel;
    return {
      ...data,
      id: snapshot.id,
      start_date: data.start_date.toDate(),
      end_date: data.end_date.toDate(),
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
    };
  },
};

const service_periods_collection = () =>
  getFirestore()
    .collection(cis_t_Db.servicePeriod)
    .withConverter(servicePeriodConverter);

const create = async (service_period: ServicePeriod) => {
  const collRef = service_periods_collection();
  const docRef = await collRef.add({ ...service_period });
  return docRef.id;
};

const read = async (id: string) => {
  const doc = await service_periods_collection().doc(id).get();
  return doc.data();
};

const update = async (
  id: string,
  service_period: Partial<ServicePeriodDbModel>
) => {
  const writeResult = await service_periods_collection()
    .doc(id)
    .update(service_period);

  return writeResult;
};

const remove = async (id: string) => {
  await service_periods_collection().doc(id).delete();
};

export const servicePeriodsDb = {
  create,
  read,
  update,
  remove,
};
