type UploadProps = {
  data: {
    content: Blob;
    name: string;
  };
  path: string;
};

type DownloadProps = {
  name: string;
  path: string;
};

export { UploadProps, DownloadProps };
