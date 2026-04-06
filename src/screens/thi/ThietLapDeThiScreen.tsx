import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, InputField, Card } from '../../components';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
}

export const ThietLapDeThiScreen: React.FC<Props> = ({ navigation }) => {
  const [examTitle, setExamTitle] = useState('Toán học - HKI');
  const [duration, setDuration] = useState('60');
  const [passScore, setPassScore] = useState('5');
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [showResult, setShowResult] = useState(true);

  const handleSave = () => {
    Alert.alert('Thành công', 'Đề thi đã được lưu!', [
      { text: 'OK', onPress: () => navigation.navigate('KhoDeDetail', { tab: 'open' }) },
    ]);
  };

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter((v) => !v);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thiết lập thông tin đề thi</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Card style={styles.card}>
            <InputField
              label="Tên đề thi"
              placeholder="Tên đề thi"
              value={examTitle}
              onChangeText={setExamTitle}
            />
            <InputField
              label="Thời gian làm bài (phút)"
              placeholder="60"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
            <InputField
              label="Điểm đạt"
              placeholder="5"
              value={passScore}
              onChangeText={setPassScore}
              keyboardType="numeric"
            />
          </Card>

          <Text style={styles.sectionTitle}>Cài đặt nâng cao</Text>
          <Card style={styles.card}>
            {[
              { label: 'Xáo trộn câu hỏi', value: shuffleQuestions, setter: setShuffleQuestions },
              { label: 'Hiển thị kết quả ngay', value: showResult, setter: setShowResult },
            ].map((setting, i) => (
              <View key={i} style={[styles.settingRow, i > 0 ? styles.settingBorder : undefined]}>
                <Text style={styles.settingLabel}>{setting.label}</Text>
                <TouchableOpacity
                  onPress={toggle(setting.setter)}
                  style={setting.value ? styles.toggleOn : styles.toggleOff}
                >
                  <View style={setting.value ? styles.toggleThumbOn : styles.toggleThumbOff} />
                </TouchableOpacity>
              </View>
            ))}
          </Card>

          <Button
            title="Lưu đề thi"
            onPress={handleSave}
            fullWidth
            style={{ marginTop: 24 }}
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
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  content: { padding: 20 },
  card: { marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginTop: 20, marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  settingBorder: { borderTopWidth: 1, borderTopColor: Colors.gray20 },
  settingLabel: { fontSize: 15, color: Colors.textPrimary },
  toggleOff: { width: 44, height: 26, borderRadius: 13, backgroundColor: Colors.gray30, padding: 2, justifyContent: 'center' },
  toggleOn: { width: 44, height: 26, borderRadius: 13, backgroundColor: Colors.primary, padding: 2, justifyContent: 'center' },
  toggleThumbOff: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white },
  toggleThumbOn: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white, alignSelf: 'flex-end', marginRight: 2 },
});