import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import DashboardButton from '../../Components/DashboardButton'

const Surveys = ({ navigation }) => {

    const onPressPayFitSurveys = () => {
        navigation.navigate('PayFitSurveys')
    }
    const onPressGmo = () => {
        navigation.navigate('GMO')
    }

    return (
        <View>
            <DashboardButton
                onPress={onPressPayFitSurveys}
                title={'PayFit Surveys'}
                imageSourceBg={require('../../Assets/Images/status_bg.png')}
                imageSource={require('../../Assets/Images/surveys_history.png')}
            />
            <DashboardButton
                onPress={onPressGmo}
                title={'GMO'}
                imageSourceBg={require('../../Assets/Images/status_bg.png')}
                imageSource={require('../../Assets/Images/surveys_history.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Surveys

