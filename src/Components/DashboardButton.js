import { View, Touchable, TouchableOpacity, StyleSheet, useWindowDimensions, Image, ImageBackground } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Colors } from '../Schemes/Colors'
import { Spaces } from '../Schemes/Spaces'

const DashboardButton = ({ imageSource, title, onPress, imageSourceBg }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <ImageBackground source={imageSourceBg}
            style={styles.buttonContainer}
            imageStyle={styles.backgroundStyle}
        >
            <TouchableOpacity
                style={styles.mainContainer}
                onPress={onPress} >
                <Image
                    style={styles.titleImage}
                    source={imageSource} />

                <Text style={styles.textButton}>{title}</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    mainContainer:
    {
        padding: Spaces.lar,
    },
    buttonContainer:
    {
        margin: 10,
        borderRadius: 8,
        alignSelf: 'center',
        width: W * 0.75,
    },
    textButton:
    {
        color: '#ffffff',
        textAlign: 'center',
        margin: Spaces.vsm
    },
    titleImage:
    {
        alignSelf: 'center',
        height: 30,
        resizeMode: 'contain',
        tintColor: '#ffffff'
    },
    backgroundStyle:
    {
        borderRadius: 8,
        flex: 1
    }
})


export default DashboardButton