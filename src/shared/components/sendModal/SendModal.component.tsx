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
          <Text style={{ fontSize: 20 }}>Email enviado com sucesso</Text>
          <Text style={{ color: "red" }} testID="modalText">
            {props.modalSend}
          </Text>
          <Pressable
            onPress={() => {
              props.setModalOpen(false);
              props.setModalSend("");
            }}
            style={({ pressed }) => [
              styles.border,
              styles.button,
              {
                backgroundColor: pressed ? "#428EFF" : "#0066FF",
              },
            ]}
          >
            <Text style={{ color: "white" }}>Ok</Text>
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
    marginTop: 22,
  },
  modal: {
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    elevation: 5,
    gap: 20,
    fontSize: 40,
    flexWrap: "wrap",
    width: 300,
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
