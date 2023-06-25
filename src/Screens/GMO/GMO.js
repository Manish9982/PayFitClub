import { ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const GMO = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../Assets/Images/app_bg.png')}>

        </ImageBackground>
    )
}

export default GMO

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1
    }
})