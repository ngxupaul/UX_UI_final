import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, InputField, Card } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const PROMPTS = [
  'Tạo 10 câu hỏi Toán lớp 10 về phương trình bậc 2',
  'Tạo 5 câu hỏi Vật lý lớp 11 về chuyển động',
  'Tạo câu hỏi trắc nghiệm Hóa học hữu cơ',
  'Tạo bài kiểm tra 15 câu Ngữ văn lớp 12',
];

export const AIGeneratorScreen: React.FC<Props> = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResults([]);
    // Simulate AI generation
    setTimeout(() => {
      setLoading(false);
      setResults([
        'Câu 1: Giải phương trình x² - 5x + 6 = 0. Đáp án: x = 2 hoặc x = 3',
        'Câu 2: Tìm tổng các nghiệm của phương trình x² - 3x + 2 = 0. Đáp án: 3',
        'Câu 3: Phương trình x² + 1 = 0 có nghiệm là? Đáp án: Không có nghiệm thực',
        'Câu 4: Cho phương trình 2x² - 4x - 6 = 0. Tìm tích các nghiệm. Đáp án: -3',
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>AI Generator</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Prompt input */}
        <View style={styles.promptSection}>
          <View style={styles.aiIconRow}>
            <View style={styles.aiIconWrap}>
              <Ionicons name="sparkles" size={20} color={Colors.white} />
            </View>
            <Text style={styles.aiLabel}>Nhập yêu cầu của bạn</Text>
          </View>

          <InputField
            placeholder="Ví dụ: Tạo 10 câu hỏi Toán lớp 10..."
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={5}
            style={{ backgroundColor: Colors.white }}
          />

          {/* Quick prompts */}
          <Text style={styles.quickLabel}>Nhanh chóng:</Text>
          <View style={styles.quickPrompts}>
            {PROMPTS.map((p, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickChip}
                onPress={() => setPrompt(p)}
              >
                <Text style={styles.quickChipText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title={loading ? 'Đang tạo...' : 'Tạo câu hỏi'}
            onPress={handleGenerate}
            fullWidth
            disabled={loading}
            icon={loading ? undefined : <Ionicons name="sparkles-outline" size={18} color={Colors.white} />}
          />
        </View>

        {/* Results */}
        {results.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Kết quả ({results.length} câu)</Text>
            {results.map((r, i) => (
              <Card key={i} style={styles.resultCard}>
                <Text style={styles.resultText}>{r}</Text>
              </Card>
            ))}
            <Button
              title="Lưu vào Kho đề"
              onPress={() => navigation.navigate('TaoDeThi')}
              variant="secondary"
              fullWidth
            />
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
  title: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  promptSection: { padding: 20 },
  aiIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  aiIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  aiLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  quickLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: 8 },
  quickPrompts: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  quickChip: {
    backgroundColor: Colors.gray10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.gray30,
  },
  quickChipText: { fontSize: 12, color: Colors.textSecondary },
  resultsSection: { padding: 20 },
  resultsTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  resultCard: { marginBottom: 10 },
  resultText: { fontSize: 14, color: Colors.textPrimary, lineHeight: 22 },
});
