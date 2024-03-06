import { Timestamp } from "firebase-admin/firestore";

export interface ProgramArea {
  id: string;
  name: string;
  description: string;
  created_date: Date;
}

export interface ProgramAreaDbModel {
  name: string;
  description: string;
  created_date: Timestamp;
}
