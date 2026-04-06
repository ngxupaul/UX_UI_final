import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme';

interface Props {
  name?: string;
  uri?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<Props> = ({ name, uri, size = 48, style }) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  const bgColors = [Colors.primary, Colors.info, Colors.warning, Colors.error];
  const colorIndex = name ? name.charCodeAt(0) % bgColors.length : 0;

  if (uri) {
    return (
      <Image
        source={[{ uri }]}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: Colors.gray20,
        }}
      />
    );
  }

  return (
    <View
      style={[
        styles.initials,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColors[colorIndex],
        },
        style,
      ]}
    >
      <Text style={[styles.initialsText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  initials: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
