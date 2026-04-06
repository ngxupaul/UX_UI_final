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

const SUBJECTS = ['Toán', 'Vật lý', 'Hóa học', 'Ngữ văn', 'Sinh học', 'Lịch sử', 'Địa lý', 'Tiếng Anh'];
const GRADES = ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];

export const TaoDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('60');

  const handleCreate = () => {
    if (!title || !subject || !grade) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    navigation.navigate('SoanThaoCauHoi', { examId: 'new' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo đề thi</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Methods */}
        <View style={styles.methodsRow}>
          <TouchableOpacity style={[styles.methodCard, styles.methodActive]}>
            <Ionicons name="create-outline" size={28} color={Colors.primary} />
            <Text style={[styles.methodLabel, { color: Colors.primary }]}>Tạo thủ công</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.methodCard}
            onPress={() => navigation.navigate('AIGenerator')}
          >
            <Ionicons name="sparkles-outline" size={28} color={Colors.gray50} />
            <Text style={styles.methodLabel}>Dùng AI</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Tên đề thi"
            placeholder="VD: Toán học - Học kì I"
            value={title}
            onChangeText={setTitle}
          />

          {/* Subject */}
          <Text style={styles.fieldLabel}>Môn học</Text>
          <View style={styles.chipRow}>
            {SUBJECTS.map((s) => (
              <Chip
                key={s}
                label={s}
                active={subject === s}
                color={Colors.primary}
                onPress={() => setSubject(s)}
                style={{ marginBottom: 8 }}
              />
            ))}
          </View>

          {/* Grade */}
          <Text style={styles.fieldLabel}>Khối lớp</Text>
          <View style={styles.chipRow}>
            {GRADES.map((g) => (
              <Chip
                key={g}
                label={g}
                active={grade === g}
                color={Colors.primary}
                onPress={() => setGrade(g)}
                style={{ marginBottom: 8 }}
              />
            ))}
          </View>

          <InputField
            label="Thời gian làm bài (phút)"
            placeholder="60"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />

          <Button
            title="Tiếp tục tạo câu hỏi"
            onPress={handleCreate}
            fullWidth
          />
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
  title: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  methodsRow: { flexDirection: 'row', padding: 20, gap: 12 },
  methodCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gray20,
  },
  methodActive: { borderColor: Colors.primary },
  methodLabel: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginTop: 8 },
  form: { paddingHorizontal: 20 },
  fieldLabel: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginBottom: 8, marginTop: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
});
