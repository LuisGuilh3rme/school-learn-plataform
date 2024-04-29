import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

export default function AuthenticationScreen() {
  return (
    <View style={[styles.center, { flex: 1 }]}>
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
            width: 150,
            fontWeight: "500",
          }}
        >
          OLA, PRONTO PARA ESTUDAR HOJE?
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          faça login em sua conta
        </Text>
      </View>
      <View
        style={{
          width: 250,
          gap: 10,
        }}
      >
        <View style={styles.border}>
          <TextInput placeholder="Usuário/Email" />
        </View>
        <View style={styles.border}>
          <TextInput placeholder="Senha" />
        </View>
      </View>
      <View style={styles.center}>
        <Text style={styles.link}>Esqueceu a senha? redefina aqui</Text>
        <Text style={styles.link}>Criar conta</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.border,
          {
            width: 100,
            padding: 10,
            alignItems: "center",
            backgroundColor: pressed ? "#428EFF" : "#0066FF",
            borderWidth: 0,
            margin: 10,
          },
        ]}
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
  link: {
    color: "#0066FF",
    textDecorationLine: "underline",
    fontSize: 12,
  },
});
