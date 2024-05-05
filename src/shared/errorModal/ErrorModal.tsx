import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

import { ErrorModalProps } from "../../types/Shared.types";

export default function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.modalOpen}
      onRequestClose={() => {
        props.setModalOpen(false);
        props.setModalError("");
      }}
      testID="modal"
      {...props}
    >
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={{ fontSize: 20 }}>Ocorreu um erro</Text>
          <Text style={{ color: "red" }} testID="modalText">
            {props.modalError}
          </Text>
          <Pressable
            onPress={() => {
              props.setModalOpen(false);
              props.setModalError("");
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
