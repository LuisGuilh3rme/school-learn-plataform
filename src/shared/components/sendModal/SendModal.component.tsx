import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

import { SendModalProps } from "../../../types/Shared.types";

export default function SendModal(props: SendModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.modalOpen}
      onRequestClose={() => {
        props.setModalOpen(false);
        props.setModalSend("");
      }}
      testID="modal"
      {...props}
    >
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>Email enviado com sucesso</Text>
          <Text style={styles.successText}>{props.modalSend}</Text>
          <Pressable
            onPress={() => {
              props.setModalOpen(false);
              props.setModalSend("");
            }}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#428EFF" : "#0066FF",
              },
            ]}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modal: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: 120,
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
  },
});
