import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme';

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  style?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export const InputField: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  style,
  multiline = false,
  numberOfLines = 1,
  editable = true,
}) => {
  const inputBaseStyle = error
    ? styles.inputError
    : !editable
    ? styles.inputDisabled
    : styles.input;

  const multilineStyle = multiline
    ? { height: numberOfLines * 24 + 32, textAlignVertical: 'top' as const }
    : undefined;

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.gray50}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        style={multilineStyle ? [inputBaseStyle, multilineStyle] : inputBaseStyle}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginBottom: 8 },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray30,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  inputError: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  inputDisabled: {
    backgroundColor: Colors.gray10,
    borderWidth: 1,
    borderColor: Colors.gray30,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.gray50,
  },
  errorText: { fontSize: 12, color: Colors.error, marginTop: 4 },
});
