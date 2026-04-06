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

const MOCK_QUESTIONS = [
  { id: '1', content: 'Giải phương trình x² - 5x + 6 = 0', type: 'multiple_choice', points: 2 },
  { id: '2', content: 'Tìm tổng các nghiệm của phương trình x² - 3x + 2 = 0', type: 'multiple_choice', points: 2 },
  { id: '3', content: 'Chứng minh rằng tổng các góc trong tam giác bằng 180°', type: 'essay', points: 5 },
];

export const SoanThaoCauHoiScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Soạn thảo câu hỏi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AIGenerator')}>
            <Ionicons name="sparkles" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Questions */}
        <View style={styles.list}>
          {MOCK_QUESTIONS.map((q, i) => (
            <Card key={q.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.questionNum}>
                  <Text style={styles.questionNumText}>{i + 1}</Text>
                </View>
                <View style={styles.questionInfo}>
                  <Text style={styles.questionContent}>{q.content}</Text>
                  <View style={styles.questionMeta}>
                    <Text style={styles.questionType}>
                      {q.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận'}
                    </Text>
                    <Text style={styles.questionPoints}>{q.points} điểm</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChinhSuaCauHoi', { examId: '1', questionId: q.id })
                  }
                >
                  <Ionicons name="create-outline" size={20} color={Colors.info} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        {/* Add question buttons */}
        <View style={styles.addSection}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('ThemCauHoi', { examId: '1' })}
          >
            <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.addBtnText}>Thêm câu hỏi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AIGenerator')}
          >
            <Ionicons name="sparkles-outline" size={20} color={Colors.warning} />
            <Text style={[styles.addBtnText, { color: Colors.warning }]}>Tạo bằng AI</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Button
          title="Hoàn thành"
          onPress={() => navigation.navigate('ThietLapDeThi', { examId: '1' })}
          fullWidth
        />
      </View>
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
  list: { padding: 20 },
  card: { marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  questionNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  questionNumText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  questionInfo: { flex: 1 },
  questionContent: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginBottom: 4 },
  questionMeta: { flexDirection: 'row', gap: 12 },
  questionType: { fontSize: 12, color: Colors.textSecondary },
  questionPoints: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  addSection: { paddingHorizontal: 20, gap: 12 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    gap: 8,
  },
  addBtnText: { fontSize: 15, fontWeight: '600', color: Colors.primary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray20,
  },
});
