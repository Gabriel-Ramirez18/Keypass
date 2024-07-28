import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig'; 
import { useFocusEffect } from '@react-navigation/native';

// Colores de la paleta
const colors = {
  primary: '#402E7A', // Fondo principal
  secondary: '#4C3BCF', // Color secundario
  tertiary: '#4B70F5', // Color terciario
  quaternary: '#3DC2EC', // Color de acento
  deleteButton: '#FF0000', // Color para el botón de eliminar
  buttonText: '#FFF', // Color del texto del botón
};

const Home = ({ navigation, setIsAuthenticated }) => {
  const [keys, setKeys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'contraseñas'));
      const passwords = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setKeys(passwords);
    } catch (error) {
      console.error("Error fetching passwords: ", error);
      Alert.alert('Error', 'No se pudo cargar las contraseñas. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPasswords();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'contraseñas', id));
      setKeys(prevKeys => prevKeys.filter(key => key.id !== id));
      Alert.alert('Éxito', 'Contraseña eliminada correctamente');
    } catch (error) {
      console.error("Error deleting password: ", error);
      Alert.alert('Error', 'No se pudo eliminar la contraseña. Inténtalo de nuevo.');
    }
  };

  const handleLongPress = (id) => {
    navigation.navigate('Turn');
  };

  const renderItem = ({ item }) => (
    <View style={styles.keyContainer}>
      <TouchableOpacity
        style={styles.keyButton}
        onPress={() => navigation.navigate('EditPassword', { id: item.id })}
        onLongPress={() => handleLongPress(item.id)}
      >
        <Text style={styles.keyText}>{item.nombreContraseña}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tertiary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu key</Text>
      {keys.length > 0 ? (
        <FlatList
          data={keys}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noKeysText}>No hay contraseñas registradas</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPassword')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // Fondo principal
  },
  title: {
    fontSize: 30,
    color: colors.quaternary, // Color del título
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  keyContainer: {
    width: '100%',
    marginBottom: 15,
  },
  keyButton: {
    padding: 15,
    backgroundColor: colors.tertiary, // Color de fondo del botón
    borderRadius: 10,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 18,
    color: colors.buttonText, // Color del texto del botón
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.deleteButton, // Color del botón de eliminar
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.buttonText, // Color del texto del botón de eliminar
    fontSize: 16,
  },
  noKeysText: {
    fontSize: 18,
    color: colors.quaternary, // Color del texto cuando no hay contraseñas
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondary, // Color del botón de añadir
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: colors.buttonText, // Color del texto del botón de añadir
  },
});

export default Home;
