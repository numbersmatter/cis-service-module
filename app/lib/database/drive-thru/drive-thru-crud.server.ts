import { getFirestore } from "firebase-admin/firestore";
import { cis_t_Db } from "../firestore.server";
import { DriveThruForm, DriveThruFormDbModel } from "./types";

const driveThru_collection = getFirestore().collection(
  "/nonprofits/cist/drive_thru"
);

const read = async (id: string) => {
  const doc = await driveThru_collection.doc(id).get();
  return doc.data();
};

const create = async (data: DriveThruFormDbModel) => {
  const doc = await driveThru_collection.add(data);
  return doc.id;
};

export const driveFormDb = {
  read,
  create,
};
