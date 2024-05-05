type DocumentProps = {
  collection: string;
  identifier: string;
};

type UserDocumentProps = {
  authenticatorID: string;
};

type InsertDocumentProps = {
  collection: string;
  identifier: string;
  content: UserDocumentProps | null;
};

export { DocumentProps, InsertDocumentProps };
