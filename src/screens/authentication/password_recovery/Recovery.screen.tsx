import { FirebaseError } from "firebase/app";
import {
  fetchSignInMethodsForEmail,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Input from "../../../shared/components/input/Input.component";
import Loading from "../../../shared/components/loading/Loading.component";
import SendModal from "../../../shared/components/sendModal/SendModal.component";
import { EMAIL_PATTERN } from "../../../shared/helpers/Patterns";
import { NavigationScreen } from "../../../types/Navigator.types";

export default function RecoveryScreen({
  navigation,
}: NavigationScreen<"Recovery">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [modalSend, setModalSend] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const openModal = (message: string) => {
    setIsLoading(false);
    setModalSend(message);
    setModalOpen(true);
  };

  const openLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const onSubmit = async (data: { email: string }) => {
    openLoading("Enviando Email");
    const auth = getAuth();
    sendPasswordResetEmail(auth, data.email)
      .then((res) => {
        console.log(res);
        console.log("Email enviado");
        openModal(
          "Um email de recuperação de senha foi enviado para: " +
            data.email +
            ". \n Olhe sua caixa de entrada ou Spam",
        );
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        console.log(error);
        // ..
      });
  };
  return (
    <View style={[styles.center, { flex: 1 }]}>
      {isLoading && <Loading loadingContent={loadingMessage} />}
      <SendModal
        modalOpen={modalOpen}
        modalSend={modalSend}
        setModalOpen={setModalOpen}
        setModalSend={setModalSend}
      />

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          RECUPERAR SENHA
        </Text>

        <View
          style={{
            marginTop: 10,
            width: 250,
            gap: 10,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Por favor, insira seu email",
              },
              maxLength: {
                value: 254,
                message: "Email não pode ultrapassar 254 digitos",
              },
              pattern: {
                value: EMAIL_PATTERN,
                message: "Email inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                error={errors.email}
                errorText={errors.email?.message}
              />
            )}
            name="email"
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.border,
            styles.button,
            {
              backgroundColor: pressed ? "#428EFF" : "#0066FF",
              marginTop: 10,
            },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 5,
  },
  button: {
    width: 100,
    padding: 10,
    alignItems: "center",
    borderWidth: 0,
  },
  link: {
    color: "#0066FF",
    textDecorationLine: "underline",
    fontSize: 12,
  },
  container: {
    alignItems: "center",
  },
  a: {
    backgroundColor: "#0066FF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
