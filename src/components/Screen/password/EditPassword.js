import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig'; 
import { useFocusEffect } from '@react-navigation/native';

const colors = {
  primary: '#402E7A',
  secondary: '#4C3BCF',
  button: '#4B70F5',
  buttonText: '#FFF',
  inputBackground: '#FFF',
};

const EditPassword = ({ navigation, route }) => {
  const { id } = route.params;
  const [nombreContraseña, setNombreContraseña] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchPassword = async () => {
        try {
          const passwordDoc = doc(db, 'contraseñas', id);
          const passwordSnapshot = await getDoc(passwordDoc);
          if (passwordSnapshot.exists()) {
            const passwordData = passwordSnapshot.data();
            setNombreContraseña(passwordData.nombreContraseña);
            setContraseña(passwordData.contraseña);
          } else {
            Alert.alert('Error', 'No se encontró la contraseña');
            navigation.goBack();
          }
        } catch (error) {
          console.error("Error fetching password: ", error);
          Alert.alert('Error', 'No se pudo cargar la contraseña. Inténtalo de nuevo.');
        } finally {
          setFetching(false);
        }
      };

      fetchPassword();
    }, [id, navigation])
  );

  const handleEditPassword = async () => {
    if (!nombreContraseña || !contraseña) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    setLoading(true);
    try {
      const passwordDoc = doc(db, 'contraseñas', id);
      await updateDoc(passwordDoc, { nombreContraseña, contraseña });
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error("Error updating password: ", error);
      Alert.alert('Error', 'No se pudo actualizar la contraseña. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.button} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Contraseña</Text>
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
        onPress={handleEditPassword}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color={colors.buttonText} /> : <Text style={styles.buttonText}>Guardar</Text>}
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

export default EditPassword;
