// src/components/CustomMessageModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Para os ícones de sucesso/erro

const colors = {
  backgroundOverlay: 'rgba(0, 0, 0, 0.6)',
  modalBackground: '#ffffff',
  primaryDark: '#003f88',
  danger: '#dc3545',
  success: '#28a745', // Cor para sucesso
  textPrimary: '#343a40',
  buttonText: '#ffffff', // Texto do botão OK
  borderColor: '#e0e0e0',
};

export default function CustomMessageModal({
  isVisible,
  title,
  message,
  type = 'info', // 'success', 'error', 'info'
  onClose,
}) {
  let iconName;
  let iconColor;
  let headerColor;

  switch (type) {
    case 'success':
      iconName = 'check-circle-outline';
      iconColor = colors.success;
      headerColor = colors.success;
      break;
    case 'error':
      iconName = 'error-outline';
      iconColor = colors.danger;
      headerColor = colors.danger;
      break;
    default:
      iconName = 'info-outline';
      iconColor = colors.primaryDark;
      headerColor = colors.primaryDark;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={[styles.header, { borderBottomColor: headerColor }]}>
            <MaterialIcons name={iconName} size={35} color={iconColor} style={styles.icon} />
            <Text style={[styles.title, { color: headerColor }]}>{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={[styles.okButton, { backgroundColor: headerColor }]}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.modalBackground,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o ícone e o título
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2, // Uma linha de separação abaixo do título
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  okButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100, // Largura mínima para o botão
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  okButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});