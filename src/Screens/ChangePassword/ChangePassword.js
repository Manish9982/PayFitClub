import { StyleSheet, View, Image, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import TextInputMed from '../../Components/TextInputMed'
import ButtonLar from '../../Components/ButtonLar'
import { Spaces } from '../../Schemes/Spaces'
import Logo from '../../Components/Logo'
import { Apis, LocalStore } from '../../Schemes/Constants'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'
import { PostApiData } from '../../Schemes/PostApiData'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ChangePassword = ({ navigation }) => {

    const [loader, setLoader] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const styles = StyleSheet.create({
        button:
        {
            margin: Spaces.sm
        },
        logo:
        {
            margin: Spaces.med,

        },
        bgImage:
        {
            flex: 1
        }
    })

    const onChangeOldPassword = (t) => {
        setOldPassword(t)
    }
    const onChangeNewPassword = (t) => {
        setNewPassword(t)
    }
    const onChangeConfirmPassword = (t) => {
        setConfirmPassword(t)
    }


    const changePassword = async () => {
        setLoader(true)
        if ((confirmPassword === newPassword) && (confirmPassword?.length !== 0)) {
            const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
            var formdata = new FormData()
            formdata.append("token", Apis.TOKEN);
            formdata.append("caseid", Apis.change_password_case_id);
            formdata.append("user_id", userId);
            formdata.append("old_password", oldPassword);
            formdata.append("new_password", newPassword);
            formdata.append("confirm_password", confirmPassword);
            const result = await PostApiData(formdata)
            if (result?.status) {
                Alert.alert('Success!', result?.message)
                navigation.goBack()
            }
            else {
                Alert.alert('Error!', result?.message)
            }
            console.log(result)
        }
        else {
            Alert.alert('Error', 'Passwords do not match')
        }
        setLoader(false)
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.bgImage}>
            <ImageBackground
                style={styles.bgImage}
                source={require('../../Assets/Images/background_img.png')}>
                <Logo style={styles.logo} />
                <TextInputMed
                    textColor='#ffffff'
                    value={oldPassword}
                    onChangeText={onChangeOldPassword}
                    label={'Old Password'}
                    customIconSource={require('../../Assets/Images/password_ic.png')}
                />
                <TextInputMed
                    textColor='#ffffff'
                    value={newPassword}
                    onChangeText={onChangeNewPassword}
                    label={'New Password'}
                    customIconSource={require('../../Assets/Images/password_ic.png')}
                />
                <TextInputMed
                    textColor='#ffffff'
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                    label={'Confirm Password'}
                    customIconSource={require('../../Assets/Images/password_ic.png')}
                />
                <ButtonLar
                    loader={loader}
                    onPressButtonLar={changePassword}
                    style={styles.button}
                    title={'Submit'} />
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}

export default ChangePassword

