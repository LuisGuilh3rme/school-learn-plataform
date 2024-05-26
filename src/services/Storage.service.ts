import {
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../../firebase";
import { storageSchema } from "../schemas/Storage.schemas";
import { DownloadProps, UploadProps } from "../types/Storage.types";

const uploadImage = (data: UploadProps): UploadTask => {
  const request = storageSchema.safeParse({
    name: data.data.name,
  });

  if (request.success) {
    const filePath = data.path + request.data.name;

    const pathRef = ref(storage, filePath);

    return uploadBytesResumable(pathRef, data.data.content);
  }

  throw request.error;
};

const downloadImageAsync = async (data: DownloadProps): Promise<string> => {
  const request = storageSchema.safeParse({
    name: data.name,
  });

  if (request.success) {
    const filePath = data.path + request.data.name;

    const pathRef = ref(storage, filePath);

    return await getDownloadURL(pathRef);
  }

  throw request.error;
};

export { uploadImage, downloadImageAsync };
