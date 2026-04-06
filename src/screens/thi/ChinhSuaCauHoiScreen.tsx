import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, InputField, Chip } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const ChinhSuaCauHoiScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState('Giải phương trình x² - 5x + 6 = 0');
  const [points, setPoints] = useState('2');

  const handleSave = () => {
    Alert.alert('Thành công', 'Câu hỏi đã được cập nhật');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chỉnh sửa câu hỏi</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveBtn}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <InputField
            label="Nội dung câu hỏi"
            placeholder="Nhập nội dung..."
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
          <InputField
            label="Điểm số"
            placeholder="2"
            value={points}
            onChangeText={setPoints}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa câu hỏi này?', [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => navigation.goBack() },
              ]);
            }}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.error} />
            <Text style={styles.deleteBtnText}>Xóa câu hỏi</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  saveBtn: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
  content: { padding: 20 },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 12,
    gap: 8,
  },
  deleteBtnText: { fontSize: 15, color: Colors.error, fontWeight: '600' },
});
