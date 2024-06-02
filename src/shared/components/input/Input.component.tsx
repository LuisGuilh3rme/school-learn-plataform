import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

import { InputProps } from "../../../types/Shared.types";

export default function Input(props: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, props.error && styles.errorInput]}
        {...props}
        testID="input"
        placeholderTextColor="gray"
      />
      {props.errorText && (
        <Text style={styles.errorText} testID="errorText">
          {props.errorText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    fontSize: 16,
    color: "black",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
