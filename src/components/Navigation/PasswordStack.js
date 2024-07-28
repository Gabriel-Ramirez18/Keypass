import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home/home';
import AddPassword from '../Screen/password/AddPassword';
import EditPassword from '../Screen/password/EditPassword';
import Turn from '../Screen/TurnOnScreen/Turn';

const Stack = createStackNavigator();

const PasswordStack = ({ setIsAuthenticated }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#402E7A' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Home"
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => setIsAuthenticated(false)} style={{ marginRight: 15 }}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Cerrar sesión</Text>
          </TouchableOpacity>
        ),
      }}
    >
      {(props) => <Home {...props} setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
    <Stack.Screen name="AddPassword" component={AddPassword} />
    <Stack.Screen name="EditPassword" component={EditPassword} />
    <Stack.Screen name="Turn" component={Turn} />
  </Stack.Navigator>
);

export default PasswordStack;
