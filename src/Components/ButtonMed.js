import { StyleSheet, Touchable, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../Schemes/Colors';
import { Spaces } from '../Schemes/Spaces';
import { Text } from 'react-native-paper';
import { Fonts } from '../Schemes/Fonts';

const ButtonMed = ({ title, onPress }) => {
    const W = useWindowDimensions().width
    const H = useWindowDimensions().height
   
    return (
        <TouchableOpacity
            style={styles.linearGradient}
            onPress={onPress}>
            <LinearGradient colors={[Colors.primary, Colors.secondary, Colors.tertiary]}
                style={styles.linearGradient}>
                <Text style={[styles.buttonText, Fonts.small]}>
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 8,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default ButtonMed