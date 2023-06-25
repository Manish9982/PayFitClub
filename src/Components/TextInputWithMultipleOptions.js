import { FlatList, Image, Modal, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Spaces } from '../Schemes/Spaces'
import { Dialog, Divider, Portal, RadioButton, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { convertTimeStampToDate } from '../Schemes/Utils'
import { Colors } from '../Schemes/Colors'

const TextInputWithMultipleOptions = ({ label, onPressInputCustomView, iconName, value, isDate = false, customIconSource, options, visible, onPressOption, hasKey = true, editable = true }) => {

    const theme =
    {
        colors: {
            onSurfaceVariant: '#ffffff'
        }
    }


    const returnDate = (t) => {
        return (
            convertTimeStampToDate(t)
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => onPressOption(hasKey ? item?.name : item)}
                    style={[styles.horizontalContainer, styles.options]}>
                    <RadioButton
                        theme={theme}
                        color={'#ffffff'}
                        value={hasKey ? item?.name : item}
                        status={value === (hasKey ? item?.name : item) ? 'checked' : 'unchecked'}
                        onPress={() => onPressOption(hasKey ? item?.name : item)}
                    />
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={4}
                        style={styles.fonts2}
                    >{hasKey ? item?.name : item}</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <>
            <Text style={styles.fonts3}>{label}</Text>
            <TouchableOpacity
                disabled={!editable}
                onPress={onPressInputCustomView}
                style={styles.container}>
                <Portal>
                    <Dialog
                        style={styles.dialog}
                        visible={visible}>
                        <Dialog.Content>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={options}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => `_key${index}`}
                            />
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                {
                    customIconSource
                    &&
                    <Image source={customIconSource}
                        style={styles.iconStyle}
                    />}
                {
                    iconName
                    &&
                    <Text style={{}}><MaterialCommunityIcons name={iconName} size={21} /></Text>}
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={styles.fonts}>{((isDate ? returnDate(value) : value) || label)}</Text>
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
        borderColor: 'grey',
    },
    fonts:
    {
        marginLeft: Spaces.xl,
        width: '90%'
    },
    fonts2:
    {
        width: '85%',
        color: '#ffffff',
    },
    iconStyle:
    {
        height: 23,
        width: 23,
        tintColor: 'gray',
        resizeMode: 'contain'
    },
    horizontalContainer:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    options:
    {
        width: '90%',
        margin: Spaces.sm,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: Spaces.vsm
    },
    divider:
    {
        height: 1,
    },
    dialog:
    {
        backgroundColor: '#ffffff',
    },
    fonts3:
    {
        margin: Spaces.sm,
        marginBottom: 0
    }
})

export default TextInputWithMultipleOptions

