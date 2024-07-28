import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ref, set, onValue } from 'firebase/database';
import { rtdb } from '../../FirebaseConfig'; 

const colors = {
  primary: '#402E7A',
  secondary: '#4C3BCF',
  tertiary: '#4B70F5',
  quaternary: '#3DC2EC',
};

const Turn = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('0');

  useEffect(() => {
    const statusRef = ref(rtdb, 'keyState/status');

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      if (status !== null) {
        setStatus(status);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = async () => {
    const newStatus = status === '1' ? '0' : '1';
    try {
      await set(ref(rtdb, 'keyState/status'), newStatus);
      setStatus(newStatus);
      Alert.alert("Key State", `Key turned ${newStatus === '1' ? 'on' : 'off'}`);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={colors.quaternary} />
      </TouchableOpacity>
      <Text style={styles.text}>Enciende tu key</Text>
      <TouchableOpacity onPress={handleToggle}>
        <Icon name="power-off" size={200} color={status === '1' ? colors.secondary : colors.quaternary} />
      </TouchableOpacity>
      <Text style={styles.status}>Current Status: {status === '1' ? 'On' : 'Off'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: colors.tertiary, // Fondo del botón de retroceso
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: colors.quaternary, // Color del texto
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textShadowColor: colors.secondary, // Sombra del texto para más contraste
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  status: {
    marginTop: 20,
    color: colors.quaternary,
    fontSize: 18,
  },
});

export default Turn;
