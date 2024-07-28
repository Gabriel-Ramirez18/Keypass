import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const colors = {
  primary: '#402E7A',
  secondary: '#4C3BCF',
  button: '#4B70F5',
  buttonText: '#FFF',
  inputBackground: '#FFF',
};

const AddPassword1 = ({ navigation }) => {
  const [nombreContraseña, setNombreContraseña] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPassword = async () => {
    if (!nombreContraseña || !contraseña) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'contraseñas'), { nombreContraseña, contraseña });
      Alert.alert('Éxito', 'Contraseña guardada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding password: ", error);
      Alert.alert('Error', 'No se pudo guardar la contraseña. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Contraseña</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre de la Contraseña" 
        value={nombreContraseña} 
        onChangeText={setNombreContraseña} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        value={contraseña} 
        onChangeText={setContraseña} 
        secureTextEntry 
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleAddPassword} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar Contraseña'}</Text>
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
    backgroundColor: colors.button,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
  },
});

export default AddPassword1;
