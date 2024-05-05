import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { DocumentProps, InsertDocumentProps } from "../types/Firestore.types";

const getDocumentAsync = async (
  data: DocumentProps,
): Promise<DocumentSnapshot<DocumentData, DocumentData>> => {
  const request = data;

  const docRef = doc(db, request.collection, request.identifier);
  const response = await getDoc(docRef);

  return response;
};

const insertDocumentAsync = async (data: InsertDocumentProps) => {
  const request = data;

  const docRef = doc(db, request.collection, request.identifier);
  await setDoc(docRef, request.content, { merge: false });
};

export { getDocumentAsync, insertDocumentAsync };
