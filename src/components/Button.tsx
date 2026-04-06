import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  style,
}) => {
  const getBgStyle = () => {
    if (disabled) return { backgroundColor: Colors.gray30 };
    switch (variant) {
      case 'primary': return { backgroundColor: Colors.primary };
      case 'secondary': return { backgroundColor: Colors.primaryLight };
      case 'outline': return { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary };
      case 'ghost': return { backgroundColor: 'transparent' };
      default: return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    if (disabled) return { color: Colors.gray70 };
    switch (variant) {
      case 'primary': return { color: Colors.white };
      case 'secondary': return { color: Colors.primary };
      case 'outline': return { color: Colors.primary };
      case 'ghost': return { color: Colors.primary };
      default: return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm': return { height: 36, paddingHorizontal: 16 };
      case 'md': return { height: 48, paddingHorizontal: 24 };
      case 'lg': return { height: 56, paddingHorizontal: 32 };
      default: return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        getBgStyle(),
        getSizeStyle(),
        fullWidth ? { width: '100%' } : undefined,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.text, { marginLeft: icon ? 8 : 0 }, getTextStyle()]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
