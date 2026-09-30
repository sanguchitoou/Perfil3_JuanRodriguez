import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

//Componente reutilizable INPUTTT
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
  multiline = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          !editable && styles.disabledInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 7,
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 0,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 15,
  },

  multilineInput: {
    height: 90,
    paddingTop: 14,
  },

  disabledInput: {
    backgroundColor: "#F1F5F9",
    color: "#64748B",
  },
});
