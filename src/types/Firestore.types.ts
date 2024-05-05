type DocumentProps = {
  collection: string;
  identifier: string;
};

type UserDocumentProps = {
  username: string;
  authenticatorID: string;
};

type UpdateDocumentProps = {
  content: UserDocumentProps;
} & DocumentProps;

type GetDocumentsByPropertyProps<T> = {
  collection: string;
  property: string;
  value: T;
};

export { DocumentProps, UpdateDocumentProps, GetDocumentsByPropertyProps };
