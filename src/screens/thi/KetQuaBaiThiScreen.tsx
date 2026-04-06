import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { Button, Card } from '../../components';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'KetQuaBaiThi'>;
}

export const KetQuaBaiThiScreen: React.FC<Props> = ({ navigation }) => {
  const score = 8;
  const total = 10;
  const correct = 8;
  const percentage = Math.round((correct / total) * 100);

  const getGradeColor = () => {
    if (percentage >= 80) return Colors.success;
    if (percentage >= 60) return Colors.warning;
    return Colors.error;
  };

  const gradeColor = getGradeColor();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kết quả bài thi</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Score circle */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: gradeColor }]}>
            <Text style={[styles.scoreValue, { color: gradeColor }]}>{score}</Text>
            <Text style={styles.scoreTotal}>/{total}</Text>
          </View>
          <Text style={[styles.scoreLabel, { color: gradeColor }]}>
            {percentage >= 80 ? 'Xuất sắc!' : percentage >= 60 ? 'Khá tốt!' : 'Cần cố gắng thêm'}
          </Text>
          <Text style={styles.scoreSubtext}>
            {correct}/{total} câu đúng · Đạt {percentage}%
          </Text>
        </View>

        {/* Breakdown */}
        <Card style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Chi tiết kết quả</Text>
          {[
            { label: 'Câu đúng', value: correct, color: Colors.success, icon: 'checkmark-circle' },
            { label: 'Câu sai', value: total - correct, color: Colors.error, icon: 'close-circle' },
            { label: 'Điểm', value: `${score}/${total}`, color: Colors.info, icon: 'star' },
            { label: 'Xếp loại', value: percentage >= 80 ? 'Giỏi' : percentage >= 60 ? 'Khá' : 'Trung bình', color: Colors.warning, icon: 'ribbon' },
          ].map((item, i) => (
            <View key={i} style={[styles.breakdownRow, i > 0 ? styles.breakdownBorder : undefined]}>
              <View style={[styles.breakdownIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={[styles.breakdownValue, { color: item.color }]}>{item.value}</Text>
            </View>
          ))}
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Xem đáp án"
            onPress={() => {}}
            variant="outline"
            fullWidth
            style={{ marginBottom: 12 }}
          />
          <Button
            title="Làm lại"
            onPress={() => navigation.navigate('HocSinhLamBai', { examId: '1' })}
            variant="secondary"
            fullWidth
            style={{ marginBottom: 12 }}
          />
          <Button
            title="Quay về Trang chủ"
            onPress={() => navigation.popToTop()}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray20,
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  scoreSection: { alignItems: 'center', paddingVertical: 40 },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  scoreValue: { fontSize: 48, fontWeight: '800' },
  scoreTotal: { fontSize: 24, fontWeight: '600', color: Colors.textSecondary, marginTop: 8 },
  scoreLabel: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  scoreSubtext: { fontSize: 14, color: Colors.textSecondary },
  breakdownCard: { marginHorizontal: 20, marginBottom: 24 },
  breakdownTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  breakdownBorder: { borderTopWidth: 1, borderTopColor: Colors.gray20 },
  breakdownIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  breakdownLabel: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  breakdownValue: { fontSize: 15, fontWeight: '700' },
  actions: { padding: 20, marginTop: 8 },
});