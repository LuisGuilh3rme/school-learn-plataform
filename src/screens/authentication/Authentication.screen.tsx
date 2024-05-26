import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ZodError } from "zod";

import { auth } from "../../../firebase";
import { useAppDispatch } from "../../../hooks";
import { signInAsync } from "../../services/Authentication.service";
import { downloadImageAsync } from "../../services/Storage.service";
import ErrorModal from "../../shared/components/errorModal/ErrorModal.component";
import Input from "../../shared/components/input/Input.component";
import Loading from "../../shared/components/loading/Loading.component";
import { EMAIL_PATTERN } from "../../shared/helpers/Patterns";
import { setAvatar } from "../../shared/reducers/Avatar.reducer";
import { SignProps } from "../../types/Authentication.types";
import { NavigationScreen } from "../../types/Navigator.types";

const userIconsPath = "userIcons/";

export default function AuthenticationScreen({
  navigation,
}: NavigationScreen<"Authentication">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [modalError, setModalError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const dispatch = useAppDispatch();

  const openLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const openModal = (message: string) => {
    setIsLoading(false);
    setModalError(message);
    setModalOpen(true);
  };

  const userLoginAsync = async (data: SignProps) => {
    try {
      openLoading("Realizando login");

      const username = await signInAsync(data);

      if (username) {
        downloadStorageAvatarAsync();
        navigation.navigate("Home");
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        openModal("Informações para login inválidas");
      } else if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            openModal("Credenciais inválidas");
            break;
          case "auth/too-many-requests":
            openModal(
              "Limite de tentativas excedido, tente novamente mais tarde",
            );
            break;
          default:
            openModal("Não foi possível se autenticar");
        }
      } else {
        openModal("Não foi possível conectar com o serviço de autenticação");
      }
    }
  };

  const downloadStorageAvatarAsync = async () => {
    try {
      const fileName = auth.currentUser?.displayName + "_avatar";

      const avatar = await downloadImageAsync({
        name: fileName,
        path: userIconsPath,
      });

      if (avatar) {
        dispatch(setAvatar(avatar));
      }
    } catch (error) {
      dispatch(setAvatar(""));
    }
  };

  return (
    <View style={[styles.center, { flex: 1 }]}>
      {isLoading && <Loading loadingContent={loadingMessage} />}
      <ErrorModal
        modalOpen={modalOpen}
        modalError={modalError}
        setModalOpen={setModalOpen}
        setModalError={setModalError}
      />
      <View
        style={[
          styles.center,
          {
            marginBottom: 10,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          ENTRE EM SUA CONTA
        </Text>
      </View>
      <View
        style={{
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
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Por favor, insira sua senha" },
            minLength: {
              value: 6,
              message: "A senha não pode ter menos que 6 digitos",
            },
            maxLength: {
              value: 20,
              message: "A senha não pode ultrapassar 20 digitos",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              maxLength={20}
              secureTextEntry
              error={errors.password}
              errorText={errors.password?.message}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.center}>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Criar conta</Text>
        </Pressable>
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
        onPress={handleSubmit(userLoginAsync)}
      >
        <Text style={{ color: "white" }}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
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
});
