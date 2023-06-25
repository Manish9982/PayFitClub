import { ImageBackground, StyleSheet, TouchableOpacity, View, useWindowDimensions, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import TextInputMed from '../../Components/TextInputMed'
import Logo from '../../Components/Logo'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import { Divider, Text } from 'react-native-paper'
import { Colors } from '../../Schemes/Colors'
import { Apis, LocalStore } from '../../Schemes/Constants'
import { PostApiData } from '../../Schemes/PostApiData'
import DataContext from '../../Context/DataContext'
import { saveValueToLocalStorage } from '../../Schemes/LocalStore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ForgotPasswordModal from '../../Components/ForgotPasswordModal'
import { validateEmail } from '../../Schemes/Utils'

const Login = ({ navigation }) => {

    const W = useWindowDimensions().width
    const H = useWindowDimensions().height

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [forgottenEmail, setForgottenEmail] = useState('')
    const [forgottenEmailModal, setForgottenEmailModal] = useState(false)

    const { NisSignedIn } = useContext(DataContext)
    const [isSignedIn, setIsSignedIn] = NisSignedIn


    const styles = StyleSheet.create({
        background: {
            height: H,
            resizeMode: 'contain'
        },
        logo:
        {
            margin: Spaces.large_custom
        },
        loginButton:
        {
            margin: Spaces.med
        },
        forgotPasswordText:
        {
            alignSelf: 'flex-end',
            padding: Spaces.sm,
            color: 'white'
        },
        dividerStyle: {
            borderColor: 'white',
            borderWidth: 0.5,
            width: W * 0.4,
        },
        horizontalContainer:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        whiteText:
        {
            color: 'white'
        },
        createAccountButton:
        {
            marginTop: Spaces.xxl
        }
    })

    const forgotPassword = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.forgot_password_case_id);
        formdata.append("email", email);
        const result = await PostApiData(formdata)
        if (result?.status) {
            Alert.alert('Success!', result?.message)
            setForgottenEmailModal(false)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        console.log(result)
    }

    const onPressForgotPassword = () => {
        setForgottenEmailModal(true)
    }

    const onPressSend = () => {
        if (validateEmail(forgottenEmail)) {
            forgotPassword()
        }
        else {
            Alert.alert('Invalid Email', 'Please check your email and make sure it is correct.')
        }
    }

    const onPressCancel = () => {
        setForgottenEmailModal(false)
    }

    const onChangeTextEmail = (t) => {
        setEmail(t)
    }
    const onChangeTextPassword = (t) => {
        setPassword(t)
    }

    const onChangeForgottenEmail = (t) => {
        setForgottenEmail(t)
    }

    const loginPressed = async () => {
        if (email == '' || password == '') {
            Alert.alert('Error', 'All fields are mandatory.')
        }
        else {
            setLoader(true)
            var formdata = new FormData();
            formdata.append("token", Apis.TOKEN);
            formdata.append("caseid", Apis.login_case_id);
            formdata.append("email", email);
            formdata.append("password", password);

            const result = await PostApiData(formdata)
            if (result?.status) {
                await saveValueToLocalStorage(LocalStore.USER_ID, result?.response?.id)
                await saveValueToLocalStorage(LocalStore.LOGIN_STATUS, '1')
                await saveValueToLocalStorage(LocalStore.NAME, result?.response?.fname)
                await setIsSignedIn('loggedIn')
            }
            else {
                Alert.alert(result?.message)
            }
            setLoader(false)
        }
    }

    const onPressEyeIcon = () => {
        setPasswordVisible(prev => !prev)
    }

    const onPressCreateAccount = () => {
        navigation.navigate('CreateAccount')
    }

    return (
        <KeyboardAwareScrollView>
            <ImageBackground
                source={require('../../Assets/Images/app_bg.png')}
                style={styles.background}>
                <Logo style={styles.logo} />
                <ForgotPasswordModal
                    visible={forgottenEmailModal}
                    onSend={onPressSend}
                    onCancel={onPressCancel}
                    value={forgottenEmail}
                    onChangeText={onChangeForgottenEmail}
                />
                <TextInputMed
                    textColor='#ffffff'
                    autoCapitalize={'none'}
                    value={email}
                    onChangeText={onChangeTextEmail}
                    label='Email'
                    iconName={'email'} />
                <TextInputMed
                    textColor='#ffffff'
                    autoCapitalize={'none'}
                    value={password}
                    label='Password'
                    onChangeText={onChangeTextPassword}
                    onPressIcon={onPressEyeIcon}
                    iconName={'key'}
                    iconNameRight={'eye'}
                    secureTextEntry={!passwordVisible}
                    iconColor={!passwordVisible ? null : Colors.primary}
                />
                <ButtonLar
                    loader={loader}
                    onPressButtonLar={loginPressed}
                    style={styles.loginButton}
                    title={'Login'} />

                <TouchableOpacity onPress={onPressForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.horizontalContainer}>
                    <Divider style={styles.dividerStyle} />
                    <Text style={styles.whiteText}>OR</Text>
                    <Divider style={styles.dividerStyle} />
                </View>
                <ButtonLar
                    onPressButtonLar={onPressCreateAccount}
                    variant={2}
                    title={'Create Account'}
                    style={styles.createAccountButton}
                />
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}

export default Login
