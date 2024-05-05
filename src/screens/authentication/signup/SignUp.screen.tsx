import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet, Pressable, Text } from "react-native";

import {
  removeAccountAsync,
  setUsernameAsync,
  signUpAsync,
} from "../../../services/Authentication.service";
import {
  getDocumentAsync,
  insertDocumentAsync,
} from "../../../services/Firestore.service";
import ErrorModal from "../../../shared/components/errorModal/ErrorModal";
import Input from "../../../shared/components/input/Input";
import { EMAIL_PATTERN } from "../../../shared/helpers/Patterns";
import { CreateAccountProps } from "../../../types/Authentication.types";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [modalError, setModalError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const createAccountAsync = async (data: CreateAccountProps) => {
    try {
      const queryUsernameResponse = await getDocumentAsync({
        collection: "user",
        identifier: data.username,
      });

      if (queryUsernameResponse.exists()) {
        setModalError("Nome de usuário já existente, tente outro nome");
        setModalOpen(true);
      } else {
        const userID = await signUpAsync(data);
        await setUsernameAsync(data.username);

        await insertDocumentAsync({
          collection: "user",
          identifier: data.username,
          content: {
            authenticatorID: userID!,
          },
        });
      }
    } catch (error) {
      removeAccountAsync();
    }
  };

  return (
    <View style={[styles.center, { flex: 1 }]}>
      <ErrorModal
        modalOpen={modalOpen}
        modalError={modalError}
        setModalOpen={setModalOpen}
        setModalError={setModalError}
      />
      <View>
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
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome de usuário"
              onChangeText={onChange}
              value={value}
              maxLength={30}
              secureTextEntry
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
});
