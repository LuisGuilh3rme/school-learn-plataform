import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { ZodError } from "zod";

import {
  removeAccountAsync,
  setUsernameAsync,
  signUpAsync,
} from "../../../services/Authentication.service";
import {
  getDocumentByIdentifierAsync,
  getDocumentsByProperty,
  updateDocumentAsync,
} from "../../../services/Firestore.service";
import ErrorModal from "../../../shared/components/errorModal/ErrorModal.component";
import Input from "../../../shared/components/input/Input.component";
import Loading from "../../../shared/components/loading/Loading.component";
import {
  EMAIL_PATTERN,
  RA_PATTERN,
  USERNAME_PATTERN,
} from "../../../shared/helpers/Patterns";
import { CreateAccountProps } from "../../../types/Authentication.types";
import { NavigationScreen } from "../../../types/Navigator.types";

export default function SignUpScreen({
  navigation,
}: NavigationScreen<"SignUp">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      ra: "",
    },
  });
  const [modalError, setModalError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const openLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const openModal = (message: string) => {
    setIsLoading(false);
    setModalError(message);
    setModalOpen(true);
  };

  const createAccountAsync = async (data: CreateAccountProps) => {
    try {
      openLoading("Criando usuário");

      const username = data.username.trim();

      const queryRA = await getDocumentByIdentifierAsync({
        collection: "users",
        identifier: data.ra,
      });

      if (!queryRA.exists()) {
        openModal("R.A escolar não cadastrado, verifique com sua instituição");
        return;
      }

      if (queryRA.get("authenticatorID")) {
        openModal("Usuário já cadastrado, tente realizar o login");
        return;
      }

      const queryUsernameResponse = await getDocumentsByProperty<string>({
        collection: "users",
        property: "username",
        value: username,
      });

      if (!queryUsernameResponse.empty) {
        openModal("Nome de usuário já existente, tente outro nome");
        return;
      }

      const userID = await signUpAsync(data);

      await setUsernameAsync(username);

      await updateDocumentAsync({
        collection: "users",
        identifier: data.ra,
        content: {
          username,
          authenticatorID: userID!,
        },
      });

      setIsLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        openModal("Informações para criar conta inválidas");
      } else if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            openModal("Email já cadastrado, tente novamente com outro email");
            break;
          default:
            await removeAccountAsync();
            openModal(
              "Ocorreu um erro se conectar com o servidor para criar conta, tente novamente",
            );
        }
      } else {
        openModal("Ocorreu um erro ao criar conta, tente novamente");
      }
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
          CRIAR CONTA
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
              message: "Por favor, insira seu R.A",
            },
            minLength: {
              value: 13,
              message: "R.A deve possuir exatamente 13 digitos",
            },
            maxLength: {
              value: 13,
              message: "R.A deve possuir exatamente 13 digitos",
            },
            pattern: {
              value: RA_PATTERN,
              message: "R.A inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="R.A escolar"
              onChangeText={onChange}
              value={value}
              maxLength={13}
              error={errors.ra}
              errorText={errors.ra?.message}
            />
          )}
          name="ra"
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Por favor, insira seu nome de usuário",
            },
            minLength: {
              value: 6,
              message: "O nome de usuário não pode ter menos que 6 digitos",
            },
            maxLength: {
              value: 30,
              message: "O nome de usuário não pode ultrapassar 30 digitos",
            },
            pattern: {
              value: USERNAME_PATTERN,
              message: "Nome de usuário inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome de usuário"
              onChangeText={onChange}
              value={value}
              maxLength={30}
              error={errors.username}
              errorText={errors.username?.message}
            />
          )}
          name="username"
        />
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
        <Pressable onPress={() => navigation.navigate("Authentication")}>
          <Text style={styles.link}>Já possuo uma conta</Text>
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
        onPress={handleSubmit(createAccountAsync)}
      >
        <Text style={{ color: "white" }}>Criar conta</Text>
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
