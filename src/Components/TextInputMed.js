import { View, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import { Colors } from '../Schemes/Colors'
import { Fonts } from '../Schemes/Fonts'
import Feather from 'react-native-vector-icons/dist/Feather'
import { Spaces } from '../Schemes/Spaces'

const TextInputMed = ({ onChangeText, placeholder = '', label, secureTextEntry, iconName, onPressIcon, iconColor, maxLength, value, autoCapitalize = 'none', iconNameRight = null, customIconSource, textColor = '#000000', editable = true, affix, keyboardType = 'default' }) => {

    return (
        <View>
            <Text style={[styles.fonts2, { color: textColor }]}>{label}</Text>
            <TextInput
                keyboardType={keyboardType}
                editable={editable}
                mode='outlined'
                placeholder={label}
                cursorColor={Colors.primary}
                underlineColor='transparent'
                activeUnderlineColor='transparent'
                //label={label}
                value={value}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                activeOutlineColor={Colors.primary}
                style={[styles.inputText, Fonts.medium]}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                left={
                    customIconSource ?
                        <TextInput.Icon
                            style={styles.iconstyle}
                            icon={customIconSource}
                            onPress={onPressIcon}
                            size={24}
                        />
                        :

                        <TextInput.Icon
                            style={styles.iconstyle}
                            icon={iconName}
                            onPress={onPressIcon}
                            size={24}
                        />

                }
                right={
                    iconNameRight
                        ?
                        <TextInput.Icon
                            style={styles.iconstyle}
                            icon={iconNameRight}
                            onPress={onPressIcon}
                            iconColor={iconColor}
                            size={24}
                        />
                        :

                        null

                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputText:
    {
        backgroundColor: '#ffffff',
        width: '90%',
        alignSelf: 'center',
    },
    iconstyle:
    {

    },
    fonts2:
    {
        margin: Spaces.sm,
        marginBottom: 0,
    }

})

export default TextInputMed