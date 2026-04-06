import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color={Colors.gray50} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray50}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray30,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: Colors.textPrimary },
});
