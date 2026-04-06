import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
}

export const AppHeader: React.FC<Props> = ({
  title,
  showBack = false,
  onBack,
  rightIcon,
  onRightPress,
  leftIcon,
  onLeftPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
        {leftIcon && !showBack && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconBtn}>
            <Ionicons name={leftIcon} size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center */}
      <View style={styles.center}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {/* Right */}
      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
            <Ionicons name={rightIcon} size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  center: { flex: 3, alignItems: 'center' },
  right: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  title: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  iconBtn: { padding: 8 },
});
