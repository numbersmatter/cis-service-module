import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
  getFirestore,
} from "firebase-admin/firestore";

import {
  ServiceList,
  ServiceListAdd,
  ServiceListDbModel,
  ServiceListId,
} from "./types";
import { cis_t_Db } from "../firebase.server";

// function toFirestore
const serviceListToDbModel = (serviceList: ServiceList): ServiceListDbModel => {
  const data = {
    ...serviceList,
    created_date: Timestamp.fromDate(serviceList.created_date),
    applied_date: Timestamp.fromDate(serviceList.applied_date),
  };

  return data;
};

// Firestore data converter
const serviceListConverter: FirestoreDataConverter<ServiceList> = {
  toFirestore(serviceList: ServiceList): DocumentData {
    return serviceListToDbModel(serviceList);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ServiceList {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id,
      created_date: data.created_date.toDate(),
      applied_date: data.applied_date.toDate(),
    } as ServiceList;
  },
};

const serviceLists_collection = () =>
  getFirestore()
    .collection(cis_t_Db.service_list)
    .withConverter(serviceListConverter);

const create = async (serviceList: ServiceListAdd) => {
  const data = {
    ...serviceList,
    id: "",
    created_date: new Date(),
    applied_date: new Date(),
  };
  const colRef = serviceLists_collection();
  const docRef = await colRef.add(data);
  return docRef.id;
};

const update = async (
  id: ServiceListId,
  serviceList: Partial<ServiceListDbModel>
) => {
  const data = {
    ...serviceList,
    id,
    updated_date: FieldValue.serverTimestamp(),
  };
  const docRef = serviceLists_collection().doc(id);
  await docRef.update(data);
};

const read = async (id: ServiceListId) => {
  const doc = await serviceLists_collection().doc(id).get();
  return doc.data();
};

const remove = async (id: ServiceListId) => {
  await serviceLists_collection().doc(id).delete();
};

const getAll = async () => {
  const snapshot = await serviceLists_collection().get();
  return snapshot.docs.map((doc) => doc.data());
};

export const serviceListsDb = {
  create,
  read,
  update,
  remove,
  getAll,
};
