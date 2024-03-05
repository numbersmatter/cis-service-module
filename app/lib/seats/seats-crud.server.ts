import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
  getFirestore,
} from "firebase-admin/firestore";
import { Seat, SeatDbModel } from "./types/seats-model";
import { cis_t_Db } from "../database/firebase.server";

// function toFirestore

function seatToDbModel(seat: Seat): SeatDbModel {
  const data = {
    ...seat,
    created_date: Timestamp.fromDate(seat.created_date),
    updated_date: Timestamp.fromDate(seat.updated_date),
    enrolled_date: Timestamp.fromDate(seat.enrolled_date),
  };

  if (seat.unenrolled_date) {
    return {
      ...data,
      unenrolled_date: Timestamp.fromDate(seat.unenrolled_date),
    };
  }

  const { unenrolled_date, ...rest } = data;

  return {
    ...rest,
  };
}

// Firestore data converter
const seatConverter: FirestoreDataConverter<Seat> = {
  toFirestore(seats: Seat): DocumentData {
    return seatToDbModel(seats);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Seat {
    const data = snapshot.data() as SeatDbModel;
    return {
      ...data,
      id: snapshot.id,
      created_date: data.created_date.toDate(),
      updated_date: data.updated_date.toDate(),
      enrolled_date: data.enrolled_date.toDate(),
      unenrolled_date: data.unenrolled_date?.toDate(),
    };
  },
};

const seats_collection = () =>
  getFirestore().collection(cis_t_Db.seats).withConverter(seatConverter);

const create = async (seat: Seat) => {
  const colRef = seats_collection();
  const docRef = await colRef.add({ ...seat });
  return docRef.id;
};

const read = async (id: string) => {
  const doc = await seats_collection().doc(id).get();
  return doc.data();
};

const update = async (id: string, seat: Partial<SeatDbModel>) => {
  const writeResult = await seats_collection().doc(id).update(seat);
  return writeResult;
};

const remove = async (id: string) => {
  await seats_collection().doc(id).delete();
};

export const seatsDb = {
  create,
  read,
  update,
  remove,
};
