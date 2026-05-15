import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Colors } from '../../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

const SUBJECTS = [
  { label: 'Toán', selected: true },
  { label: 'Tiếng Anh', selected: false },
  { label: 'Lịch sử', selected: false },
  { label: 'Địa lý', selected: false },
  { label: 'Ngữ văn', selected: false },
  { label: 'Hóa học', selected: false },
  { label: 'Vật lý', selected: false },
];

const DIFFICULTIES = [
  {
    label: 'Dễ',
    selected: true,
    borderColor: Colors.primary,
    backgroundColor: '#E3FFDE',
    textColor: '#139C2A',
  },
  {
    label: 'Trung bình',
    selected: false,
    borderColor: '#F7C89B',
    backgroundColor: Colors.white,
    textColor: '#FB9F4A',
  },
  {
    label: 'Khó',
    selected: false,
    borderColor: '#FFBEBE',
    backgroundColor: Colors.white,
    textColor: '#F18183',
  },
];

const QUESTION_TYPES = [
  { label: 'Trắc nghiệm', desc: 'Chọn 1 đáp án đúng duy nhất', selected: true, icon: 'radio-button-on' },
  { label: 'Nhiều lựa chọn', desc: 'Có thể có nhiều hơn 1 đáp án đúng', selected: false, icon: 'checkbox' },
  { label: 'Tự luận', desc: 'Câu hỏi mở yêu cầu viết câu trả lời', selected: false, icon: 'create-outline' },
];

export const AIGeneratorScreen: React.FC<Props> = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [difficulties, setDifficulties] = useState(DIFFICULTIES);
  const [qTypes, setQTypes] = useState(QUESTION_TYPES);

  const toggleSubject = (idx: number) => {
    setSubjects(subjects.map((s, i) => ({ ...s, selected: i === idx })));
  };
  const toggleDifficulty = (idx: number) => {
    setDifficulties(difficulties.map((d, i) => ({ ...d, selected: i === idx })));
  };
  const toggleQType = (idx: number) => {
    setQTypes(qTypes.map((t, i) => ({ ...t, selected: i === idx })));
  };

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: false,
      type: '*/*',
    });

    if (result.canceled || !result.assets.length) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo đề thi với AI</Text>
        <TouchableOpacity style={styles.historyBtn}>
          <Ionicons name="time-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputWrap}>
          <View style={styles.inputLabel}>
            <Ionicons name="sparkles" size={16} color={Colors.primary} />
            <Text style={styles.inputLabelText}>Nhập yêu cầu của bạn</Text>
          </View>
          <View style={styles.textArea}>
            <TextInput
              style={styles.textInput}
              placeholder="Ví dụ: Tạo 10 câu trắc nghiệm Toán lớp 10 chuyên đề Vector, mức độ vận dụng cao, có lời giải chi tiết ..."
              placeholderTextColor="#575C65"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.toolbar}>
              <TouchableOpacity
                style={[styles.toolBtn, styles.fileToolBtn]}
                onPress={handlePickDocument}
              >
                <Ionicons name="document-outline" size={22} color="#4E74C9" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolBtn, styles.imageToolBtn]}>
                <Ionicons name="image" size={19} color="#C45DBC" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolBtn, styles.micToolBtn]}>
                <Ionicons name="mic" size={19} color="#C96B1E" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.pillSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
            {subjects.map((s, i) => (
              <TouchableOpacity
                key={s.label}
                style={[styles.subjectPill, s.selected && styles.subjectPillActive]}
                onPress={() => toggleSubject(i)}
              >
                <Text style={[styles.subjectPillText, s.selected && styles.subjectPillTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.configSection}>
          <Text style={styles.configSectionTitle}>CẤU HÌNH ĐỀ THI</Text>

          <Text style={styles.fieldLabel}>Độ khó</Text>
          <View style={styles.difficultyRow}>
            {difficulties.map((d, i) => (
              <TouchableOpacity
                key={d.label}
                style={[
                  styles.difficultyPill,
                  {
                    borderColor: d.borderColor,
                    backgroundColor: d.selected ? d.backgroundColor : Colors.white,
                  },
                ]}
                onPress={() => toggleDifficulty(i)}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    {
                      color: d.textColor,
                      fontWeight: d.selected ? '700' : '500',
                    },
                  ]}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Dạng câu hỏi</Text>
          {qTypes.map((t, i) => (
            <TouchableOpacity
              key={t.label}
              style={[styles.typeCard, t.selected && styles.typeCardActive]}
              onPress={() => toggleQType(i)}
            >
              <View style={styles.typeIcon}>
                <Ionicons
                  name={t.icon as any}
                  size={28}
                  color="#111111"
                />
              </View>
              <View style={styles.typeInfo}>
                <Text style={styles.typeTitle}>{t.label}</Text>
                <Text style={styles.typeDesc}>{t.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.countRow}>
            <Text style={styles.countLabel}>Số lượng câu hỏi</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuestionCount(Math.max(1, questionCount - 1))}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{questionCount}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuestionCount(questionCount + 1)}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={() => navigation.navigate('AILoading')}
          activeOpacity={0.9}
        >
          <Ionicons name="sparkles" size={18} color={Colors.white} />
          <Text style={styles.generateBtnText}>Tạo đề ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: Colors.screenBg,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  backBtn: { padding: 4 },
  historyBtn: { padding: 4 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.6 },
  scrollContent: { paddingBottom: 104 },
  inputWrap: { paddingHorizontal: 20, paddingTop: 17 },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  inputLabelText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  textArea: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#008B17',
    overflow: 'hidden',
    minHeight: 141,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 46,
    minHeight: 139,
    lineHeight: 25,
  },
  toolbar: {
    position: 'absolute',
    right: 11,
    bottom: 6,
    flexDirection: 'row',
    gap: 12,
  },
  toolBtn: {
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageToolBtn: { backgroundColor: '#FFD0F9' },
  fileToolBtn: { backgroundColor: '#BAD9FF' },
  micToolBtn: { backgroundColor: '#FFBA96' },
  pillSection: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 20,
  },
  subjectPill: {
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    minWidth: 143,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(19,156,42,0.45)',
  },
  subjectPillActive: {
    backgroundColor: '#E2FFE4',
    borderColor: '#087E33',
    borderWidth: 1,
  },
  subjectPillText: { fontSize: 14, fontWeight: '500', color: '#087E33' },
  subjectPillTextActive: { fontWeight: '700', color: '#087E33' },
  configSection: {
    paddingHorizontal: 20,
    paddingTop: 27,
  },
  configSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.7,
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 13,
    marginTop: 5,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 17,
  },
  difficultyPill: {
    flex: 1,
    height: 41,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  difficultyText: { fontSize: 14 },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    height: 75,
    paddingHorizontal: 23,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(149,149,149,0.3)',
  },
  typeCardActive: {
    borderColor: 'rgba(149,149,149,0.3)',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 26,
  },
  typeInfo: { flex: 1 },
  typeTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 5 },
  typeDesc: { fontSize: 13, color: '#000000' },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    marginTop: 17,
    marginBottom: 25,
  },
  countLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  counterValue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, minWidth: 24, textAlign: 'center' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: '#F8FAFB',
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 15,
    shadowColor: 'rgba(33,196,93,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  generateBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});
