import { Alert, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import ButtonLar from '../../Components/ButtonLar'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import { Colors } from '../../Schemes/Colors'
import { Apis } from '../../Schemes/Constants'
import { PostApiData } from '../../Schemes/PostApiData'
import TextInputWithMultipleOptions from '../../Components/TextInputWithMultipleOptions'
import { throwUserID } from '../../Schemes/Utils'
import CustomLoader from '../../Components/CustomLoader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const presentDate = new Date()

const Wallet = () => {

    const [walletOptionsVisible, setWalletOptionsVisible] = useState(false)
    const [amount, setAmount] = useState('')
    const [walletDataFromApi, setWalletDataFromApi] = useState('')
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getWalletDetails()
    }, [])

    const getWalletDetails = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.wallet_api_case_id);
        formdata.append("userids", await throwUserID());
        const result = await PostApiData(formdata)
        if (result?.status) {
            setWalletDataFromApi(result)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const onPressWalletOption = (t) => {
        setAmount(t)
        setWalletOptionsVisible(false)
    }

    const onPressWalletAmount = () => {
        if (Number.parseFloat(walletDataFromApi?.response?.dollars, 10) >= 25) {
            setWalletOptionsVisible(true)
        }
        else {
            Alert.alert('Info', 'You can redeem amount from wallet only after $25')
        }
    }

    const onPressRedeem = async () => {
        if (amount == '') {
            Alert.alert('Info', 'Please select an amount first')
        }
        else {
            var formdata = new FormData()
            formdata.append("token", Apis.TOKEN);
            formdata.append("caseid", Apis.wallet_api_case_id);
            formdata.append("userids", await throwUserID());
            formdata.append("redeem_dollar", amount);
            const result = await PostApiData(formdata)
            if (result?.status) {
                Alert.alert(result?.message)
            }
            else {
                Alert.alert(result?.message)
            }
        }

    }

    const walletData = [
        {
            name: '$25'
        },
        {
            name: '$50'
        },
        {
            name: '$75'
        },
        {
            name: '$100'
        },
    ]

    return (
        loader
            ?
            <CustomLoader />
            :
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Image
                        source={require('../../Assets/Images/wallet_ic.png')}
                        style={styles.walletImage}
                    />
                    <Text style={[styles.font, Fonts.largeBold]}>Total Balance</Text>
                    <Text style={[styles.font, Fonts.largeBold]}>$ {walletDataFromApi?.response?.dollars}</Text>
                    <Text style={styles.font2}>Thu, 11 May 2023</Text>
                    <TextInputWithMultipleOptions
                        value={amount}
                        options={walletData}
                        onPressOption={onPressWalletOption}
                        onPressInputCustomView={onPressWalletAmount}
                        visible={walletOptionsVisible}
                        label={'Select Amount'}
                        customIconSource={require('../../Assets/Images/wallet_ic.png')}
                    />
                    <ButtonLar
                        style={styles.buttonStyle}
                        title={'Redeem'}
                        onPressButtonLar={onPressRedeem}
                    />

                </View>
            </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        alignItems: 'center'
    },
    walletImage:
    {
        height: 60,
        resizeMode: 'contain',
        margin: Spaces.lar
    },
    font:
    {
        margin: Spaces.lar
    },
    font2:
    {
        color: Colors.primary,
        margin: Spaces.lar
    },
    buttonStyle:
    {
        margin: Spaces.lar
    }
})

export default Wallet

