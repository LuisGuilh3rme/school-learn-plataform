import { FieldError } from "react-hook-form";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputProps = {
  error?: FieldError;
  errorText?: string;
} & TextInputProps;

export default function Input(props: InputProps) {
  return (
    <View>
      <TextInput
        style={[styles.input, props.error && { borderColor: "red" }]}
        {...props}
        testID="input"
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
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 2,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginTop: 1,
  },
});
