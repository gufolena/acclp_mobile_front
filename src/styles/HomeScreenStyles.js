// src/styles/HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6fc',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003f88',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#343a40',
    marginBottom: 30,
    textAlign: 'center',
  },
  dashboardContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003f88',
    marginBottom: 15,
    textAlign: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#e6f0fa',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5a7ca8',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#343a40',
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
    marginTop: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: '#343a40',
    marginBottom: 5,
  },
  // Estilos para o loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f6fc',
  },
});

export default styles;