import React from 'react';
import { StatusBar } from 'react-native';
import NavigationPrincipal from './src/components/NavigationPrincipal'; 

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationPrincipal />
    </>
  );
};

export default App;
