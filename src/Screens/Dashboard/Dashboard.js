import { useWindowDimensions, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import Profile from './Profile';
import More from './More';
import { Colors } from '../../Schemes/Colors';
import { Button, Text } from 'react-native-paper';
import Logo from '../../Components/Logo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const Tab = createBottomTabNavigator();

const Dashboard = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const screenOptions = {
        tabBarActiveTintColor: Colors.primary,
        headerTintColor: Colors.primary,
        headerStyle: { height: Platform.OS == 'android' ? H * 0.085 : H * 0.12 },
        headerTitle: () => { return (<Logo style={styles.logo} />) },
        tabBarLabelStyle: { fontSize: 12 },
        headerTitleAlign: 'center'
    }


    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerRightContainerStyle: styles.headerIcon,
                    headerRight: () => (
                        <Button
                            labelStyle={styles.labelStyle}
                            textColor={Colors.primary}
                            icon={'bell'}
                            style={styles.iconStyle}
                            onPress={() => navigation.navigate('Notifications')}
                        />),
                }}
            />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="More" component={More} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="more-horiz" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    logo: {
        tintColor: Colors.primary,
        height: H * 0.06,
        alignSelf: 'center'
    },
    iconStyle: {

    },
    labelStyle:
    {
        fontSize: H * 0.04
    },
    headerIcon:
    {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: H * 0.01
    }
})

export default Dashboard