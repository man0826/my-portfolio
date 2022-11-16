import admin from "./server";
import { Work, Skill } from "../types/data";

const db = admin.firestore();

export const getData = async <T extends Work | Skill>(
  collectionName: string
) => {
  const arrayData: T[] = [];
  const ref = await db.collection(collectionName).get();

  if (!ref) {
    return [];
  }

  ref.forEach((doc) => {
    const data = doc.data() as T;
    arrayData.push(data);
  });

  return arrayData.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });
};
