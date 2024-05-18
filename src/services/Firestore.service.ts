import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocsFromServer,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";
import {
  DocumentProps,
  GetDocumentsByPropertyProps,
  UpdateDocumentProps,
} from "../types/Firestore.types";

const getDocumentByIdentifierAsync = async (
  data: DocumentProps,
): Promise<DocumentSnapshot<DocumentData, DocumentData>> => {
  const request = data;

  const docRef = doc(db, request.collection, request.identifier);
  const response = await getDoc(docRef);

  return response;
};

const getDocumentsByProperty = async <T>(
  data: GetDocumentsByPropertyProps<T>,
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const request = data;

  const queryRef = query(
    collection(db, request.collection),
    where(request.property, "==", request.value),
  );
  const response = await getDocsFromServer(queryRef);

  return response;
};

const updateDocumentAsync = async (data: UpdateDocumentProps) => {
  const request = data;

  const docRef = doc(db, request.collection, request.identifier);
  await updateDoc(docRef, request.content);
};

export {
  getDocumentByIdentifierAsync,
  getDocumentsByProperty,
  updateDocumentAsync,
};
