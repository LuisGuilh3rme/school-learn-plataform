import { FieldError } from "react-hook-form";
import { TextInputProps, ModalProps } from "react-native";

type InputProps = {
  error?: FieldError;
  errorText?: string;
} & TextInputProps;

type LoadingProps = {
  loadingContent: string;
};

type ErrorModalProps = {
  modalError: string;
  modalOpen: boolean;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & ModalProps;

export { InputProps, LoadingProps, ErrorModalProps };
