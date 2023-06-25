import { Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { Spaces } from '../Schemes/Spaces'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { convertTimeStampToDate } from '../Schemes/Utils'

const TextInputCustomView = ({ label, onPressInputCustomView, iconName, value, isDate = false, customIconSource, textColor, editable = true }) => {

    const returnDate = (t) => {
        return (
            convertTimeStampToDate(t)
        )
    }
    return (
        <>
            <Text style={[styles.fonts2, { color: textColor }]}>{label}</Text>
            <TouchableOpacity
                disabled={!editable}
                onPress={onPressInputCustomView}
                style={styles.container}>
                {
                    customIconSource
                    &&
                    <Image source={customIconSource}
                        style={styles.iconStyle}
                    />
                }
                {
                    iconName
                    &&
                    <Text style={{}}><MaterialCommunityIcons name={iconName} size={21} /></Text>}
                <Text style={styles.fonts}>{((isDate ? returnDate(value) : value) || label)}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 3,
        height: 50,
        marginTop: 6,
        paddingHorizontal: Spaces.xl,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey'
    },
    fonts:
    {
        marginLeft: Spaces.xl
    },
    iconStyle:
    {
        height: 23,
        width: 23,
        tintColor: 'gray',
        resizeMode: 'contain'
    },
    fonts2:
    {
        margin: Spaces.sm,
        marginBottom: 0,
    }
})

export default TextInputCustomView