import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router/Router';
import DataState from './src/Context/DataState';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import Dimensions from './src/Schemes/Dimensions';
import { Colors } from './src/Schemes/Colors';
import { displayNotification, initializeNotifications } from './src/Schemes/Notifications';
import Geolocation from 'react-native-geolocation-service'
import Blogs from './src/Screens/Blogs/Blogs';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
  fontWeight: 'normal',
  fontSize: 16,
  color: '#000000'
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: Colors.primary,
  },
  fonts: configureFonts({ config: fontConfig }),
};

const App = () => {

  useEffect(() => {
    initializeNotifications()
  }, [])


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <DataState>
          <Router />
        </DataState>
      </NavigationContainer>
    </PaperProvider>
    // <Blogs/>
  );
}
export default App;
