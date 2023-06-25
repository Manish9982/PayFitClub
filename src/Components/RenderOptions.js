import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Colors } from '../Schemes/Colors'
import { Spaces } from '../Schemes/Spaces'
import { Text, TextInput } from 'react-native-paper'
import TextInputMed from './TextInputMed'

const RenderOptions = ({ title, onPress, answerArray, qType, prevAnswers }) => {

    const W = useWindowDimensions().width



    const throwIconName = (n) => {
        if (n == '5') {
            return 'calendar'
        }
        else if (n == '6') {
            return 'map-marker'
        }
        else if (n == '7') {
            return 'map-marker'
        }
        else if (n == '3') {
            return 'map-marker'
        }
        else {
            return 'account'
        }
    }

    return (
        (qType == 1 || qType == 2) ?
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, { backgroundColor: answerArray?.includes(title?.trim()) ? Colors.primary : '#ffffff' }]}>
                <Text style={[styles.fonts, { color: answerArray?.includes(title?.trim()) ? '#ffffff' : '#000000' }]}>{title?.trim()}</Text>
            </TouchableOpacity>
            :
            <TextInputMed
                iconName={throwIconName(qType)}
                label={null} />
    )
}

const styles = StyleSheet.create({
    button:
    {
        //backgroundColor: ((answerArray?.includes(title?.trim())) || (prevAnswers?.includes(title?.trim()))) ? Colors.primary : '#ffffff',
        width: '85%',
        borderRadius: 8,
        padding: Spaces.med,
        margin: Spaces.med,
        marginVertical: Spaces.vsm,
        alignSelf: 'center',
        borderColor: Colors.primary,
        borderWidth: 0.5
    },
    fonts:
    {

    }
})

export default RenderOptions
