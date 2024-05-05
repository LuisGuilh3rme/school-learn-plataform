import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ZodError } from "zod";

import { signInAsync } from "../../services/Authentication.service";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import Input from "../../shared/input/Input";
import { SignProps } from "../../types/Authentication.types";
import { AuthenticationProps } from "../../types/Navigator.types";

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function AuthenticationScreen({
  navigation,
}: AuthenticationProps) {
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

  const userLoginAsync = async (data: SignProps) => {
    try {
      const username = await signInAsync(data);

      if (username) {
        // redirecionar para proxima pagina
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setModalError("Informações para login inválidas");
      }
      if (error instanceof FirebaseError) {
        if (error.code.includes("auth/invalid-credential")) {
          setModalError("Credenciais inválidas");
        }
        if (error.code.includes("auth/too-many-requests")) {
          setModalError(
            "Limite de tentativas excedido, tente novamente mais tarde",
          );
        } else {
          setModalError("Não foi possível se autenticar");
        }
      } else {
        setModalError(
          "Não foi possível conectar com o serviço de autenticação",
        );
      }
      setModalOpen(true);
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
        <Text style={styles.link}>Esqueceu a senha? redefina aqui</Text>
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
