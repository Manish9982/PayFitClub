import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Spaces } from '../Schemes/Spaces'
import { Colors } from '../Schemes/Colors'
import { Text } from 'react-native-paper'

const SurveysCards = ({ category, points, status, iconImg, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.card}>
            <View style={[styles.container1, { backgroundColor: status == 0 ? Colors.primary : 'gray', }]}>
                <View>
                    <Image
                        source={{ uri: iconImg }}
                        style={styles.placeholder}
                        defaultSource={require('../Assets/Images/logo.png')}
                    />
                </View>
            </View>
            <View style={[styles.container2, { backgroundColor: status == 0 ? Colors.primaryTransparent : '#ffffff', }]}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    minimumFontScale={0.7}
                    style={styles.fonts}>{category}</Text>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.fonts}>Points: {points}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder:
    {
        height: 40,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    container1: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: Spaces.sm
    },
    fonts:
    {
        textAlign: 'center',
    },
    container2:
    {
        width: '100%',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: Colors.primary,
        borderWidth: 0.5,
        padding: Spaces.sm,
    },
    activityIndicator:
    {
        backgroundColor: "#ffffff",
        padding: Spaces.med,
        borderRadius: 20
    }
})

export default SurveysCards
