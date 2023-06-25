import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import { PostApiData } from '../../Schemes/PostApiData'
import { Apis } from '../../Schemes/Constants'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import { Colors } from '../../Schemes/Colors'
import CustomLoader from '../../Components/CustomLoader'

const HowItWorks = ({ navigation }) => {

    useEffect(() => {
        getHowItWorks()
    }, [])

    const [howItWorks, setHowItWorks] = useState(null)
    const [loader, setLoader] = useState(false)

   
    const getHowItWorks = async () => {
        var formdata = new FormData()
        formdata.append('token', Apis.TOKEN)
        formdata.append('caseid', Apis.how_it_works_case_id)
        setLoader(true)
        const result = await PostApiData(formdata)
        if (result?.status) {
            setHowItWorks(result)
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
            <ImageBackground
                style={styles.container}
                source={require('../../Assets/Images/profile_background.png')}>
                <ScrollView>
                    <Text style={[styles.font2, Fonts.mediumBold]}>{howItWorks?.response?.page_title}</Text>
                    <Text style={styles.font}>{howItWorks?.response?.page_content}</Text>
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
    },
    container:
    {
        flex: 1
    }
})


export default HowItWorks

