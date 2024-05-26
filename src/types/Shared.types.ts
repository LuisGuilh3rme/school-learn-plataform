import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps, ModalProps, StyleProp, ViewStyle } from "react-native";

import { AppStackProps } from "./Navigator.types";

type ThemedViewProps = {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
} & NavigationProps;

type NavigationProps = {
  navigation: NativeStackNavigationProp<AppStackProps, keyof AppStackProps>;
};

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

export {
  ThemedViewProps,
  NavigationProps,
  InputProps,
  LoadingProps,
  ErrorModalProps,
};
