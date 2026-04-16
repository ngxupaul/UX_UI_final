import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDraftExam } from '../../context/DraftExamContext';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const SUBJECT_OPTIONS = ['Toán', 'Địa lý 6', 'Tiếng Anh', 'Lịch sử', 'Ngữ văn', 'Hóa học'];
const CLASS_OPTIONS = ['Lớp 6A1', 'Lớp 6A2', 'Lớp 10A1', 'Lớp 10A2', 'Lớp 11A1'];

const getNextOption = (options: string[], value: string) => {
  const currentIndex = Math.max(0, options.indexOf(value));
  return options[(currentIndex + 1) % options.length];
};

export const TaoDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const { draftExam, updateExamInfo } = useDraftExam();
  const initialSubject = useMemo(
    () => (SUBJECT_OPTIONS.includes(draftExam.subject) ? draftExam.subject : SUBJECT_OPTIONS[0]),
    [draftExam.subject]
  );

  const [subject, setSubject] = useState(initialSubject);
  const [classLabel, setClassLabel] = useState(CLASS_OPTIONS[0]);
  const [title, setTitle] = useState(draftExam.title || '');

  const handleSaveDraft = () => {
    updateExamInfo({ title, subject });
    navigation.goBack();
  };

  const handleContinue = () => {
    updateExamInfo({ title, subject });
    navigation.navigate('SoanThaoCauHoi', { examId: draftExam.examId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerSide} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color={Colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tạo đề thi mới</Text>

          <TouchableOpacity style={styles.headerSide} onPress={handleSaveDraft}>
            <Text style={styles.saveText}>Lưu nháp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressLineActive} />
          <View style={styles.progressLineInactive} />

          <View style={styles.progressStepActive}>
            <View style={styles.progressCircleActive}>
              <Text style={styles.progressCircleActiveText}>1</Text>
            </View>
            <Text style={styles.progressLabelActive}>Thông tin</Text>
          </View>

          <View style={styles.progressStepMiddle}>
            <View style={styles.progressCircleInactive}>
              <Text style={styles.progressCircleInactiveText}>2</Text>
            </View>
            <Text style={styles.progressLabelInactive}>Câu hỏi</Text>
          </View>

          <View style={styles.progressStepRight}>
            <View style={styles.progressCircleInactive}>
              <Text style={styles.progressCircleInactiveText}>3</Text>
            </View>
            <Text style={styles.progressLabelInactive}>Cài đặt</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentCard}>
          <View style={styles.copyBlock}>
            <Text style={styles.copyTitle}>Cài đặt đề thi</Text>
            <Text style={styles.copyBody}>
              Hãy cùng thiết lập các chi tiết cốt lõi cho bài kiểm tra mới của bạn. Thông tin này
              giúp phân loại và sắp xếp thư viện của bạn.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>CHỌN MÔN</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.selector}
                onPress={() => setSubject((current) => getNextOption(SUBJECT_OPTIONS, current))}
              >
                <Text style={styles.selectorText}>{subject}</Text>
                <Ionicons name="chevron-down" size={18} color="#6B7A65" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>LỚP</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.selector}
                onPress={() => setClassLabel((current) => getNextOption(CLASS_OPTIONS, current))}
              >
                <Text style={styles.selectorText}>{classLabel}</Text>
                <Ionicons name="chevron-down" size={18} color="#6B7A65" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>TIÊU ĐỀ BÀI KIỂM TRA</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Vd: Thi giữa kì"
                  placeholderTextColor="#6B7280"
                  value={title}
                  onChangeText={setTitle}
                />
                <Ionicons name="pencil" size={18} color="#6B7A65" />
              </View>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>Tiếp tục</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 13,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerSide: {
    minWidth: 72,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  saveText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'right',
  },
  progressWrap: {
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressLineActive: {
    position: 'absolute',
    left: 55,
    right: 200,
    top: 15,
    height: 2,
    backgroundColor: Colors.gray20,
  },
  progressLineInactive: {
    position: 'absolute',
    left: 194,
    right: 47,
    top: 15,
    height: 2,
    backgroundColor: Colors.gray20,
  },
  progressStepActive: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
  },
  progressStepMiddle: {
    position: 'absolute',
    left: '46%',
    top: 0,
    marginLeft: -16,
    alignItems: 'center',
  },
  progressStepRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
  },
  progressCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(33,196,93,0.15)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  progressCircleInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleActiveText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  progressCircleInactiveText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#94A3B8',
  },
  progressLabelActive: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  progressLabelInactive: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '500',
    color: '#94A3B8',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 128,
  },
  contentCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 48,
    shadowColor: 'rgba(22,29,22,0.06)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 4,
  },
  copyBlock: {
    marginBottom: 32,
  },
  copyTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#161D16',
    marginBottom: 8,
  },
  copyBody: {
    fontSize: 14,
    lineHeight: 23,
    color: '#3D4A3D',
  },
  form: {
    gap: 32,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    paddingLeft: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#3D4A3D',
    letterSpacing: 1.2,
  },
  selector: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
  },
  inputWrap: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
  },
  actionRow: {
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  continueButton: {
    width: 236,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  continueText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: Colors.white,
  },
});
