import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme';

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
  style?: ViewStyle;
}

export const Chip: React.FC<Props> = ({
  label,
  active = false,
  onPress,
  color = Colors.primary,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        active ? { backgroundColor: color } : { backgroundColor: Colors.gray10, borderWidth: 1, borderColor: Colors.gray30 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: active ? Colors.white : Colors.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  text: { fontSize: 13, fontWeight: '500' },
});
