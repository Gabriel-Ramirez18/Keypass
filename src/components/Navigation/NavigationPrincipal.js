import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Screen/Home/home';
import AddPassword from '../Screen/password/AddPassword';
import EditPassword from '../Screen/password/EditPassword';
import Turn from '../Screen/TurnOnScreen/Turn';
import Loginp1 from '../Screen/Login/Loginp1';
import Registro from '../Screen/User/Registro';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PasswordStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#402E7A' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="AddPassword" component={AddPassword} />
    <Stack.Screen name="EditPassword" component={EditPassword} />
    <Stack.Screen name="Turn" component={Turn} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#402E7A',
      tabBarInactiveTintColor: '#4C3BCF',
      tabBarStyle: { backgroundColor: '#fff' },
      tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Contraseñas"
      component={PasswordStack}
      options={{
        tabBarLabel: 'Contraseñas',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="key" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const NavigationPrincipal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          
          <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Loginp1">
              {(props) => <Loginp1 {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Registro" component={Registro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationPrincipal;
