import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';

const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Éxito', 'Has cerrado sesión');
      navigation.replace('Loginp1'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#402E7A',
    borderRadius: 50, 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default LogoutButton;
