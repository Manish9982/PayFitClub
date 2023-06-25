import { View, Text, ImageBackground, Image, useWindowDimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import DashboardButton from '../../Components/DashboardButton'
import { MotiView } from 'moti'
import { Fonts } from '../../Schemes/Fonts'
import { Spaces } from '../../Schemes/Spaces'
import { Apis, LocalStore } from '../../Schemes/Constants'
import { PostApiData } from '../../Schemes/PostApiData'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'

const Home = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [fname, setFname] = useState('')

    useEffect(() => {
        getActivityPointsList()
    }, [])

    // this api provides the unit for all the activities
    const getActivityPointsList = async () => {
        const temp = await getValueFromLocalStorage(LocalStore.NAME)
        setFname(temp)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.activity_points_list_case_id);
        const result = await PostApiData(formdata)
        console.log('activity points list', result)
    }

    const onPressSetGoals = () => {
        navigation.navigate('SetGoals')
    }

    const onPressStatus = () => {
        navigation.navigate('Status')
    }

    const onPressSurveys = () => {
        navigation.navigate('Surveys')
    }

    return (
        <ScrollView style={styles.primaryContainer}>
            <Image
                source={require('../../Assets/Images/dashboard_img.png')}
                style={styles.dashboardBg}
            />
            <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={300}>
                <Text style={[styles.greetings, Fonts.mediumBold]}>Hi, {fname}</Text>
            </MotiView>
            <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={500}>
                <DashboardButton
                    onPress={onPressStatus}
                    title='Status'
                    imageSourceBg={require('../../Assets/Images/status_bg.png')}
                    imageSource={require('../../Assets/Images/dash_status_ic.png')}
                />
            </MotiView>

            <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={700}>
                <DashboardButton
                    onPress={onPressSetGoals}
                    title='Set Goals'
                    imageSourceBg={require('../../Assets/Images/status_bg.png')}
                    imageSource={require('../../Assets/Images/dash_set_goal_ic.png')}
                />
            </MotiView>

            <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} delay={900}>
                <DashboardButton
                    onPress={onPressSurveys}
                    title='Surveys'
                    imageSourceBg={require('../../Assets/Images/status_bg.png')}
                    imageSource={require('../../Assets/Images/surveys_history.png')}
                />
            </MotiView>
        </ScrollView>

    )
}

const makeStyles = (H, W) => StyleSheet.create({
    dashboardBg:
    {
        flex: 1,
        width: W,
        resizeMode: 'contain',
        marginTop: H * 0.2,
        position: 'absolute'
    },
    primaryContainer:
    {
        flex: 1,
        overflow:'scroll'
    },
    greetings:
    {
        textAlign: 'center',
        padding: Spaces.vsm
    }
})

export default Home