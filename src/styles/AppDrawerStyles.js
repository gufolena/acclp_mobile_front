import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#eaf4fc', // azul suave
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cce0f5',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#cce0f5',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003f88', // azul escuro
  },
  profileEmail: {
    fontSize: 14,
    color: '#5a7ca8', // azul médio
  },
});
