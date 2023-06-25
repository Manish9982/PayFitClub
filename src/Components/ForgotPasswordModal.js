import { Modal, StyleSheet, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import TextInputMed from './TextInputMed'
import { Spaces } from '../Schemes/Spaces'
import { Colors } from '../Schemes/Colors'

const ForgotPasswordModal = ({ value, onCancel, onSend, onChangeText, visible }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.popup}>
                    <Text style={styles.centerText}>Forgot Password ?</Text>
                    <Text style={styles.fonts}>Enter Email Id Registered With PayFitClub</Text>
                    <TextInputMed
                        label={'Registered Email Id'}
                        iconName={'email'}
                        value={value}
                        onChangeText={onChangeText}
                    />
                    <View style={styles.horizontalContainer}>
                        <TouchableOpacity
                            style={[styles.buttons, { backgroundColor: Colors.primary }]}
                            onPress={onSend}>
                            <Text style={styles.whiteFont}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, { backgroundColor: Colors.light }]}
                            onPress={onCancel}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const makeStyles = (H, W) => StyleSheet.create({

    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    popup:
    {
        backgroundColor: 'white',
        padding: Spaces.med,
        borderRadius: 8,
    },
    horizontalContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: Spaces.xxl
    },
    buttons:
    {
        width: W * 0.25,
        alignItems: 'center',
        padding: Spaces.vsm,
        borderRadius: 8,
    },
    whiteFont:
    {
        color: Colors.white
    },
    centerText:
    {
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    fonts:
    {
        padding: Spaces.vsm
    }

})

export default ForgotPasswordModal
