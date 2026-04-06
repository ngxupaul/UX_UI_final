/**
 * Typed Icon wrapper for React Native 0.81 compatibility.
 * Ensures all icon color props use typed string values to avoid
 * native cast errors (java.lang.String cannot be cast to java.lang.Boolean).
 */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Use keyof to get valid icon names from Ionicons
type IconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000000', style }) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};