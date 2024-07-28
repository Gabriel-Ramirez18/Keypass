import React from 'react';
import { StatusBar } from 'react-native';
import NavigationPrincipal from './src/components/NavigationPrincipal'; // Asegúrate de que esta ruta sea correcta

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationPrincipal />
    </>
  );
};

export default App;
