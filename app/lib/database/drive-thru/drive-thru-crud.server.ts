import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { cis_t_Db } from "../firestore.server";
import {
  DriveThruDbAddModel,
  DriveThruForm,
  DriveThruFormDbModel,
} from "./types";

const driveThru_collection = getFirestore().collection(
  "/nonprofits/cist/drive_thru"
);

const read = async (id: string) => {
  const doc = await driveThru_collection.doc(id).get();
  return doc.data();
};

const create = async (data: DriveThruDbAddModel) => {
  const writeData = {
    ...data,
    created_date: FieldValue.serverTimestamp(),
    updated_date: FieldValue.serverTimestamp(),
  };
  const doc = await driveThru_collection.add(writeData);
  return doc.id;
};

const getAll = async () => {
  const query = await driveThru_collection.get();
  const data: DriveThruForm[] = [];
  query.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
      created_date: doc.data().created_date.toDate(),
      updated_date: doc.data().updated_date.toDate(),
    } as DriveThruForm);
  });
  return data;
};

export const driveFormDb = {
  read,
  create,
  getAll,
};
