import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../Schemes/Colors';
import { Spaces } from '../Schemes/Spaces';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Fonts } from '../Schemes/Fonts';

const ButtonLar = ({ title, onPressButtonLar, style, variant = 1, loader = false }) => {
    const W = useWindowDimensions().width
    const H = useWindowDimensions().height

    return (
        <>
            <TouchableOpacity
                style={[{
                    width: '100%',
                    alignItems: 'center',
                }, { style }]}
                onPress={onPressButtonLar}>

                <LinearGradient colors={variant == 1 ? [Colors.primary, Colors.secondary, Colors.tertiary] : [Colors.accent, Colors.accent, Colors.accent]}
                    style={[styles.linearGradient, style]}>
                    {
                        loader
                            ?
                            <ActivityIndicator color={Colors.light} />
                            :
                            <Text style={[styles.buttonText, Fonts.small]}>
                                {title}
                            </Text>}
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 8,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default ButtonLar