import { ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const SurveysHistory = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <ImageBackground 
        source={require('../../Assets/Images/app_bg.png')}
        style={styles.container}>

        </ImageBackground>
    )
}

const makeStyles = (H, W) => StyleSheet.create({

    container:
    {
        flex: 1
    }
})

export default SurveysHistory

