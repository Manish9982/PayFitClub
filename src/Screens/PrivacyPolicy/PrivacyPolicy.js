import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import { PostApiData } from '../../Schemes/PostApiData'
import { Apis } from '../../Schemes/Constants'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import { Colors } from '../../Schemes/Colors'
import CustomLoader from '../../Components/CustomLoader'

const PrivacyPolicy = () => {

    useEffect(() => {
        getPrivacyPolicy()
    }, [])

    const [privacyPolicy, setPrivacyPolicy] = useState(null)
    const [loader, setLoader] = useState(false)

    const getPrivacyPolicy = async () => {
        var formdata = new FormData()
        formdata.append('token', Apis.TOKEN)
        formdata.append('caseid', Apis.privacy_policy_case_id)
        setLoader(true)
        const result = await PostApiData(formdata)
        if (result?.status) {
            setPrivacyPolicy(result)
        }
        else {
            Alert.alert('Error', result?.message)
            navigation.goBack()
        }
        setLoader(false)
    }
    return (
        loader
            ?
            <CustomLoader />
            :
            <ImageBackground source={require('../../Assets/Images/profile_background.png')}>
                <ScrollView>
                    <Text style={[styles.font2, Fonts.mediumBold]}>{privacyPolicy?.response?.page_title}</Text>
                    <Text style={styles.font}>{privacyPolicy?.response?.page_content}</Text>
                </ScrollView>
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    font:
    {
        margin: Spaces.med
    },
    font2:
    {
        margin: Spaces.med,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
})


export default PrivacyPolicy

