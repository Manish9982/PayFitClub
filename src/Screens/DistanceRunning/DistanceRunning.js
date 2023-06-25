import { Alert, Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import TextInputMed from '../../Components/TextInputMed'
import { Apis } from '../../Schemes/Constants'
import { throwUserID } from '../../Schemes/Utils'
import { PostApiData } from '../../Schemes/PostApiData'
import DataContext from '../../Context/DataContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const DistanceRunning = ({ navigation, route }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const { NgoalId } = useContext(DataContext)

    const [goalId, setGoalId] = NgoalId
    const [steps, setSteps] = useState('')

    const onPressNextFirst = async () => {
        if (true) {
            var formdata = new FormData()
            formdata.append("token", Apis.TOKEN);
            formdata.append("caseid", Apis.goal_point_case_id);
            formdata.append("activity", "Running");
            formdata.append("goal_set", steps?.trim());
            const result = await PostApiData(formdata)
            if (result?.status) {
                Alert.alert('Info', `Total points for this goal would be ${Number.parseInt(result?.response, 10)}. Let's get healthy and earn some money!!`, [
                    {
                        text: 'Yes',
                        onPress: () => onPressNextSecond()
                    },
                    {
                        text: 'No'
                    }
                ])
            }
        }
        else {
            Alert.alert('Info', `Please set valid goal steps. Steps can't be less than 3000 for valid goal`)
        }
    }

    const onPressNextSecond = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.insert_Running_case_id);
        formdata.append("userids", await throwUserID());
        formdata.append("time_key", route?.params?.frequency);
        formdata.append("runningtime", route?.params?.duration);
        formdata.append("runningsteps", steps?.trim());
        const result = await PostApiData(formdata)
        if (result?.status) {
            Alert.alert('Success', result?.message)
            setGoalId(result?.goal_id)
            navigation.navigate('StepCounterRunning', { footSteps: `${steps?.trim()}` })
        }
    }

    const onChangeSteps = (t) => {
        setSteps(t)
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Image
                    source={require('../../Assets/Images/bg_walk.png')}
                    style={styles.bgImage}
                />
                <Text style={[styles.fonts, styles.marginForFonts]}>Here you have to fill the 'Distance in Kilometer' which are valid for time duration you have mentioned in the previous step.</Text>
                <Text style={styles.fonts}>For eg. If you selected the 'Day', and time duration as '1' in the previous step and you want to set the goal of 10 kms of running in '1' day so here you input 10.</Text>
                <TextInputMed
                    keyboardType='numeric'
                    label={'Set Distance (Kms)'}
                    iconName={require('../../Assets/Images/run_ic.png')}
                    value={steps}
                    onChangeText={onChangeSteps}
                />
                <ButtonLar
                    onPressButtonLar={onPressNextFirst}
                    title={`Let's Go`}
                    style={styles.button} />
            </View>
        </KeyboardAwareScrollView>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    bgImage:
    {
        top: -H * 0.45,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',

    },
    fonts:
    {
        margin: Spaces.lar,
    },
    marginForFonts:
    {
        marginTop: H * 0.3
    },
    container:
    {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    button:
    {
        marginTop: H * 0.04
    }
})

export default DistanceRunning

