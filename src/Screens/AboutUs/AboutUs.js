import { ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { Apis } from '../../Schemes/Constants'
import { PostApiData } from '../../Schemes/PostApiData'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fonts } from '../../Schemes/Fonts'
import { Spaces } from '../../Schemes/Spaces'
import CustomLoader from '../../Components/CustomLoader'

const AboutUs = () => {

    useEffect(() => {
        getAboutUs()
    }, [])

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [aboutUsData, setAboutUsData] = useState(null)
    const [loader, setLoader] = useState(true)

    const styles = makeStyles(H, W)

    const getAboutUs = async () => {
        var formdata = new FormData()
        formdata.append('token', Apis.TOKEN)
        formdata.append('caseid', Apis.about_us_case_id)
        const result = await PostApiData(formdata)
        if (result?.status) {
            setAboutUsData(result)
        }
        setLoader(false)
    }

    return (
        loader
            ?
            <CustomLoader />
            :
            <ImageBackground
                source={require('../../Assets/Images/app_bg.png')}
                style={styles.container}>
                <KeyboardAwareScrollView>
                    <Text style={[styles.heading, Fonts.mediumBold]}>{aboutUsData?.response?.page_title?.toUpperCase()}</Text>
                    <Text style={styles.body}>{aboutUsData?.response?.page_content}</Text>
                </KeyboardAwareScrollView>
            </ImageBackground>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1
    },
    heading:
    {
        textAlign: 'center',
        textDecorationLine: 'underline',
        padding: Spaces.med
    },
    body:
    {
        padding: Spaces.med
    }
})

export default AboutUs

