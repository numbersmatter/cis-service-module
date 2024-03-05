import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
  getFirestore,
} from "firebase-admin/firestore";
import {
  ServiceTransaction,
  ServiceTransactionDbModel,
} from "./types/service-trans-model";
import { cis_t_Db } from "../database/firebase.server";

// function toFirestore

function serviceTransactionToDbModel(
  serviceTransaction: ServiceTransaction
): ServiceTransactionDbModel {
  const data = {
    ...serviceTransaction,
    service_created_data: Timestamp.fromDate(
      serviceTransaction.service_created_data
    ),
    service_updated_date: Timestamp.fromDate(
      serviceTransaction.service_updated_date
    ),
  };

  if (serviceTransaction.service_completed_date) {
    return {
      ...data,
      service_completed_date: Timestamp.fromDate(
        serviceTransaction.service_completed_date
      ),
    };
  }

  const { service_completed_date, ...rest } = data;

  return {
    ...rest,
  };
}

// firestore data converter
const serviceTransactionConverter: FirestoreDataConverter<ServiceTransaction> =
  {
    toFirestore(serviceTransaction: ServiceTransaction): DocumentData {
      return serviceTransactionToDbModel(serviceTransaction);
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): ServiceTransaction {
      const data = snapshot.data() as ServiceTransactionDbModel;

      const { service_completed_date, ...rest } = data;

      const convertedData = {
        ...rest,
        id: snapshot.id,
        service_created_data: data.service_created_data.toDate(),
        service_updated_date: data.service_updated_date.toDate(),
      };

      if (service_completed_date) {
        return {
          ...convertedData,
          service_completed_date: service_completed_date.toDate(),
        };
      }

      return {
        ...convertedData,
      };
    },
  };

const service_transactions_collection = () =>
  getFirestore()
    .collection(cis_t_Db.service_transactions)
    .withConverter(serviceTransactionConverter);

const create = async (serviceTransaction: ServiceTransaction) => {
  const colRef = service_transactions_collection();
  const docRef = await colRef.add({ ...serviceTransaction });
  return docRef.id;
};

const read = async (id: string) => {
  const doc = await service_transactions_collection().doc(id).get();
  return doc.data();
};

const update = async (
  id: string,
  serviceTransaction: Partial<ServiceTransactionDbModel>
) => {
  const writeResult = await service_transactions_collection()
    .doc(id)
    .update(serviceTransaction);
  return writeResult;
};

const remove = async (id: string) => {
  await service_transactions_collection().doc(id).delete();
};

export const serviceTransactionsDb = {
  create,
  read,
  update,
  remove,
};
