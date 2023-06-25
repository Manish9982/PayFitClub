import { View, Image, StyleSheet, useWindowDimensions, FlatList, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useContext } from 'react'
import DataContext from '../../Context/DataContext'
import { clearAllStorage } from '../../Schemes/LocalStore'
import { Divider, Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'

const More = ({ navigation }) => {
    const { NisSignedIn } = useContext(DataContext)
    const [isSignedIn, setIsSignedIn] = NisSignedIn

    const DATA = [
        {
            title: 'My Profile',
            icon: require('../../Assets/Images/profile_interests.png'),
            onPress: () => { navigation.navigate('MyProfile') }
        },
        {
            title: 'Blogs',
            icon: require('../../Assets/Images/blog_ic.png'),
            onPress: () => { navigation.navigate('Blogs') }
        },
        {
            title: 'Surveys',
            icon: require('../../Assets/Images/surveys_ic.png'),
            onPress: () => { navigation.navigate('Surveys') }
        },
        {
            title: 'Surveys History',
            icon: require('../../Assets/Images/surveys_history.png'),
            onPress: () => navigation.navigate('SurveysHistory')
        },
        {
            title: 'Wallet',
            icon: require('../../Assets/Images/wallet_ic.png'),
            onPress: () => { navigation.navigate('Wallet') }
        },
        {
            title: 'Earning History',
            icon: require('../../Assets/Images/rewards_green_icon.png'),
            onPress: () => { navigation.navigate('EarningHistory') }
        },
        {
            title: 'Contact Us',
            icon: require('../../Assets/Images/contact_ic.png'),
            onPress: () => { Linking.openURL('mailto:solugo41@gmail.com') }
        },
        {
            title: 'About Us',
            icon: require('../../Assets/Images/about_us_ic.png'),
            onPress: () => navigation.navigate('AboutUs')
        },
        {
            title: 'Terms Of Use',
            icon: require('../../Assets/Images/terms_ic.png'),
            onPress: () => navigation.navigate('TermsOfUse')
        },
        {
            title: 'Privacy Policy',
            icon: require('../../Assets/Images/privacy_ic.png'),
            onPress: () => navigation.navigate('PrivacyPolicy')
        },
        {
            title: 'How it works!',
            icon: require('../../Assets/Images/how_it_works_ic.png'),
            onPress: () => navigation.navigate('HowItWorks')
        },
        {
            title: 'Change Password',
            icon: require('../../Assets/Images/change_passwpord_ic.png'),
            onPress: () => navigation.navigate('ChangePassword')

        },
        {
            title: 'Logout',
            icon: require('../../Assets/Images/logout_ic.png'),
            onPress: () => { logout() }
        },
    ]


    const renderMenu = ({ item, index }) => {
        return (
            <>
                <TouchableOpacity
                    onPress={item.onPress}
                    style={styles.menuItemContainer}>
                    <Image source={item.icon}
                        style={styles.menuItemIcon}
                    />
                    <Text style={Fonts.medium}>{item.title}</Text>
                </TouchableOpacity>
                <Divider style={styles.dividerStyle} />
            </>
        )
    }

    const logout = async () => {

        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Yes',
                onPress: async () => {
                    await clearAllStorage()
                    await setIsSignedIn(null)
                }
            },
            {
                text: 'No',
            }
        ])
    }


    return (
        <View>
            <Image
                style={[styles.primaryContainer, styles.imageBg]}
                source={require('../../Assets/Images/profile_background.png')} />
            <FlatList
                data={DATA}
                renderItem={renderMenu}
                keyExtractor={(item, index) => `_key${index}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    primaryContainer:
    {
        flex: 1
    },
    imageBg:
    {
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1
    },
    headingText:
    {
        padding: Spaces.med,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    menuItemIcon:
    {
        tintColor: 'silver',
        margin: Spaces.sm,
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    menuItemContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spaces.vsm
    },
    dividerStyle:
    {
        width: '100%',
        borderWidth: 0.4,
        borderColor: 'silver'
    }
})

export default More