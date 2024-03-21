import { cis_t_Db, dataPoint } from "../firestore.server";
import { DriveThruForm, DriveThruFormDbModel } from "./types";

const drive_thru_collection = dataPoint<DriveThruFormDbModel>(
  cis_t_Db.families
);

const read = async (drive_thru_id: string) => {
  const doc = await drive_thru_collection.doc(drive_thru_id).get();

  const docId = doc.id;
  const data = doc.data();
  if (!data) {
    return null;
  }

  return {
    ...data,
    id: docId,
  } as DriveThruForm;
};

const create = async (driveThruForm: DriveThruFormDbModel) => {
  const colRef = drive_thru_collection;
  const docRef = await colRef.add(driveThruForm);
  return docRef.id;
};

const getAll = async () => {
  const snapshot = await drive_thru_collection.get();
  const data = snapshot.docs.map((doc) => {
    const docId = doc.id;
    const data = doc.data();
    return {
      ...data,
      id: docId,
    } as DriveThruForm;
  });

  return data;
};

export const driveThruDb = {
  read,
  create,
  getAll,
};
