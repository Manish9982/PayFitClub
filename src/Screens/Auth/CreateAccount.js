import { StyleSheet, ImageBackground, useWindowDimensions, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useState, useRef } from 'react'
import { Spaces } from '../../Schemes/Spaces'
import { Dialog, Portal, RadioButton, Text } from 'react-native-paper'
import TextInputMed from '../../Components/TextInputMed'
import ButtonLar from '../../Components/ButtonLar'
import Logo from '../../Components/Logo'
import { Colors } from '../../Schemes/Colors'
import TextInputCustomView from '../../Components/TextInputCustomView'
import DatePicker from 'react-native-date-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CreateAccount = ({ navigation }) => {

    const W = useWindowDimensions().width
    const H = useWindowDimensions().height

    const styles = makeStyles(H, W)

    const [gender, setGender] = useState(null);
    const [visible, setVisible] = useState(false);
    const [dateFlag, setDateFlag] = useState(new Date());
    const [openCalendar, setOpenCalender] = useState(false);

    const recaptcha = useRef();


    const send = () => {
        //console.log('send!');
        recaptcha.current.open();
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <ImageBackground
            source={require('../../Assets/Images/app_bg.png')}
            style={styles.background}>

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Select Gender:</Dialog.Title>
                        <Dialog.Content>
                            <TouchableOpacity
                                onPress={() => {
                                    setGender('Male')
                                    setVisible(false)
                                }}
                                style={styles.horizontalContainer}>
                                <RadioButton
                                    value='Male'
                                    color={'#ffffff'}
                                    status={gender === 'Male' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setGender('Male')
                                        setVisible(false)
                                    }}
                                />
                                <Text
                                >Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setGender('Female')
                                    setVisible(false)
                                }}
                                style={styles.horizontalContainer}>
                                <RadioButton
                                    value='Female'
                                    color={'#ffffff'}
                                    status={gender === 'Female' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setGender('Female')
                                        setVisible(false)
                                    }}
                                />
                                <Text
                                >Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setGender('Others')
                                    setVisible(false)
                                }}
                                style={styles.horizontalContainer}>
                                <RadioButton
                                    value='Others'
                                    color={'#ffffff'}
                                    status={gender === 'Others' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setGender('Others')
                                        setVisible(false)
                                    }}
                                />
                                <Text
                                >Others</Text>
                            </TouchableOpacity>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                <Logo style={styles.logo} />
                <TextInputMed label={'Username'}
                    iconName={'account'}
                    textColor='#ffffff'
                />
                <TextInputMed
                    label={'Email'}
                    autoCapitalize='none'
                    iconName={'email'}
                    textColor='#ffffff'
                />
                <TextInputMed
                    maxLength={15}
                    keyboardType='numeric'
                    label={'Phone'}
                    iconName={'phone'}
                    textColor='#ffffff'
                />

                <TextInputCustomView
                    textColor='#ffffff'
                    onPressInputCustomView={() => {
                        setOpenCalender(true)
                    }}
                    label={'DOB'}
                    value={dateFlag}
                    isDate={true}
                    iconName={'calendar'}
                />
                <DatePicker
                    mode='date'
                    modal
                    open={openCalendar}
                    date={dateFlag}
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                        setOpenCalender(false)
                        setDateFlag(date)
                    }}
                    onCancel={() => {
                        setOpenCalender(false)
                    }}
                />
                <TextInputCustomView
                    textColor='#ffffff'
                    onPressInputCustomView={showDialog}
                    label={'Select Gender'}
                    value={gender}
                    iconName={'human-male-female'}
                />
                <TextInputMed
                    textColor='#ffffff'
                    label={'Zip Code'}
                    iconName={'map-marker'}
                />
                <ButtonLar
                    onPressButtonLar={() => console.log('pressed')}
                    style={styles.proceedButton}
                    title={'Proceed'} />
            </KeyboardAwareScrollView>

        </ImageBackground>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    proceedButton:
    {
        margin: Spaces.med,
    },
    background:
    {
        flex: 1,

    },
    container:
    {
        paddingBottom: H * 0.2
    }

})
// const makeStyles = (H, W) => StyleSheet.create({
//     background: {
//         resizeMode: 'stretch',
//         flexGrow: 1
//     },
//     logo:
//     {
//         margin: Spaces.lar
//     },
//     proceedButton:
//     {
//         margin: Spaces.med
//     },
//     horizontalContainer:
//     {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     whiteText:
//     {
//         color: '#ffffff',
//         padding: Spaces.lar
//     },
//     primaryContainer:
//     {
//         // flex: 1
//     },
//     inputListContainer:
//     {

//     }
// })

export default CreateAccount