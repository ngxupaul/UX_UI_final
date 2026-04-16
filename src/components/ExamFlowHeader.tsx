import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';

type ExamFlowHeaderProps = {
  title: string;
  currentStep?: 1 | 2 | 3;
  onBack?: () => void;
  onSaveDraft?: () => void;
  saveLabel?: string;
};

const STEP_LABELS = ['Thông tin', 'Câu hỏi', 'Cài đặt'] as const;

export const ExamFlowHeader: React.FC<ExamFlowHeaderProps> = ({
  title,
  currentStep,
  onBack,
  onSaveDraft,
  saveLabel = 'Lưu nháp',
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backTouch} onPress={onBack}>
          <Ionicons name="chevron-back" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity style={styles.saveTouch} onPress={onSaveDraft}>
          <Text style={styles.saveText}>{saveLabel}</Text>
        </TouchableOpacity>
      </View>

      {currentStep ? (
        <View style={styles.stepperWrap}>
          <View style={styles.stepper}>
            {STEP_LABELS.map((label, index) => {
              const step = (index + 1) as 1 | 2 | 3;
              const isDone = step < currentStep;
              const isActive = step === currentStep;
              const isLast = index === STEP_LABELS.length - 1;

              return (
                <React.Fragment key={label}>
                  <View style={styles.stepItem}>
                    <View
                      style={[
                        styles.stepCircle,
                        isDone && styles.stepCircleDone,
                        isActive && styles.stepCircleActive,
                      ]}
                    >
                      {isDone ? (
                        <Ionicons name="checkmark" size={12} color={Colors.white} />
                      ) : (
                        <Text
                          style={[
                            styles.stepNumber,
                            (isDone || isActive) && styles.stepNumberSelected,
                          ]}
                        >
                          {step}
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        (isDone || isActive) && styles.stepLabelSelected,
                        isActive && styles.stepLabelActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </View>

                  {!isLast ? (
                    <View style={styles.dividerSlot}>
                      <View
                        style={[
                          styles.divider,
                          step < currentStep ? styles.dividerDone : styles.dividerPending,
                        ]}
                      />
                    </View>
                  ) : null}
                </React.Fragment>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    shadowColor: 'rgba(0,0,0,0.04)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 13,
  },
  backTouch: {
    width: 32,
    height: 32,
    marginLeft: -8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  saveTouch: {
    minWidth: 82,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  saveText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.primary,
  },
  stepperWrap: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  stepper: {
    width: 320,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepItem: {
    alignItems: 'center',
    width: 47,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray10,
    borderWidth: 1,
    borderColor: Colors.gray20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: 'rgba(33,196,93,0.15)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  stepNumberSelected: {
    color: Colors.white,
  },
  stepLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: Colors.textMuted,
  },
  stepLabelSelected: {
    color: Colors.primary,
  },
  stepLabelActive: {
    fontWeight: '700',
  },
  dividerSlot: {
    width: 99.14,
    alignItems: 'center',
    paddingTop: 16.5,
  },
  divider: {
    width: '100%',
    height: 2,
    borderRadius: 999,
  },
  dividerDone: {
    backgroundColor: Colors.primary,
    opacity: 0.8,
  },
  dividerPending: {
    backgroundColor: Colors.gray20,
  },
});
