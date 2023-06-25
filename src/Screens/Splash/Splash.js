import { Image, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'
import { LocalStore } from '../../Schemes/Constants'
import DataContext from '../../Context/DataContext'

const Splash = ({ navigation }) => {

    const { NisSignedIn } = useContext(DataContext)
    const [isSignedIn, setIsSignedIn] = NisSignedIn

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        const temp = await getValueFromLocalStorage(LocalStore.LOGIN_STATUS)
        //console.log(temp)
        if (temp == '1') {
            setTimeout(() => {
                setIsSignedIn('loggedIn')
            }, 2000);

        }
        else {
            setTimeout(() => {
                navigation.replace('SliderIntro')
            }, 2000);
        }
    }


    return (
        <Image
            style={styles.primaryContainer}
            source={require('../../Assets/Images/payfit_splash_bg.png')} />
    )
}

const styles = StyleSheet.create({
    primaryContainer:
    {
        flex: 1,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
})

export default Splash
