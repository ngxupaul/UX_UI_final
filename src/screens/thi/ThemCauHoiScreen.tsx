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

const QUESTION_TYPES = [
  { key: 'multiple_choice', label: 'Trắc nghiệm' },
  { key: 'essay', label: 'Tự luận' },
  { key: 'true_false', label: 'Đúng/Sai' },
];

export const ThemCauHoiScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('multiple_choice');
  const [points, setPoints] = useState('2');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState<number | null>(0);

  const updateOption = (i: number, val: string) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleSave = () => {
    if (!content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung câu hỏi');
      return;
    }
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
          <Text style={styles.headerTitle}>Thêm câu hỏi</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveBtn}>Lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Question type */}
        <Text style={styles.fieldLabel}>Loại câu hỏi</Text>
        <View style={styles.chipRow}>
          {QUESTION_TYPES.map((t) => (
            <Chip
              key={t.key}
              label={t.label}
              active={type === t.key}
              color={Colors.primary}
              onPress={() => setType(t.key)}
              style={{ marginRight: 8 }}
            />
          ))}
        </View>

        {/* Content */}
        <InputField
          label="Nội dung câu hỏi"
          placeholder="Nhập nội dung câu hỏi..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />

        {/* Points */}
        <InputField
          label="Điểm số"
          placeholder="2"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
        />

        {/* Options for multiple choice */}
        {type === 'multiple_choice' && (
          <View style={styles.optionsSection}>
            <Text style={styles.fieldLabel}>Các lựa chọn</Text>
            <Text style={styles.hint}>Chọn đáp án đúng</Text>
            {options.map((opt, i) => {
              const isCorrect = correct === i;
              return (
              <TouchableOpacity
                key={i}
                style={isCorrect ? styles.optionRowCorrect : styles.optionRow}
                onPress={() => setCorrect(i)}
              >
                <View style={isCorrect ? styles.optionLetterActive : styles.optionLetter}>
                  <Text style={isCorrect ? styles.optionLetterTextActive : styles.optionLetterTextDefault}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <InputField
                  placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                  value={opt}
                  onChangeText={(val) => updateOption(i, val)}
                  style={{ flex: 1, marginBottom: 0 }}
                />
                {correct === i && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                )}
              </TouchableOpacity>
              );
            })}
          </View>
        )}

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
  fieldLabel: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginBottom: 8, paddingHorizontal: 20, marginTop: 16 },
  hint: { fontSize: 12, color: Colors.textSecondary, paddingHorizontal: 20, marginBottom: 12 },
  chipRow: { flexDirection: 'row', paddingHorizontal: 20, flexWrap: 'wrap', gap: 8 },
  optionsSection: { paddingHorizontal: 0 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, gap: 8 },
  optionRowCorrect: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8, backgroundColor: Colors.primaryLight, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 4 },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterTextDefault: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  optionLetterTextActive: { fontSize: 14, fontWeight: '700', color: Colors.white },
});
