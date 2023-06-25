import { StyleSheet, Image } from 'react-native'
import React from 'react'

const Logo = ({ style }) => {

    return (
        <Image source={require('../Assets/Images/pay_fit_logo.png')}
            style={[styles.logo, style]}
        />
    )
}

const styles = StyleSheet.create({
    logo:
    {
        height: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
    }
})

export default Logo