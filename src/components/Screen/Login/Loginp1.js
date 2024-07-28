import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';

const colors = {
  primary: '#402E7A',
  secondary: '#4C3BCF',
  accent: '#4B70F5',
  buttonText: '#FFF',
  inputBackground: '#FFF',
  registerText: '#3DC2EC',
};

const Loginp1 = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      setIsAuthenticated(true); // Actualiza el estado de autenticación
      navigation.replace('AppTabs'); // Navega al Tab.Navigator
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: colors.buttonText,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputBackground,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: colors.registerText,
    fontSize: 16,
  },
});

export default Loginp1;
