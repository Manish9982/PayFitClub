import { Alert, Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import TextInputMed from '../../Components/TextInputMed'
import { Apis } from '../../Schemes/Constants'
import { throwUserID } from '../../Schemes/Utils'
import { PostApiData } from '../../Schemes/PostApiData'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import DataContext from '../../Context/DataContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Steps = ({ navigation, route }) => {

    const { NgoalId } = useContext(DataContext)

    const [goalId, setGoalId] = NgoalId
    const [steps, setSteps] = useState('')

    const onPressNextFirst = async () => {
        if (Number.parseInt(steps, 10) >= 3000) {
            var formdata = new FormData()
            formdata.append("token", Apis.TOKEN);
            formdata.append("caseid", Apis.goal_point_case_id);
            formdata.append("activity", "Walking");
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
        formdata.append("caseid", Apis.insert_Walkning_case_id);
        formdata.append("userids", await throwUserID());
        formdata.append("time_key", route?.params?.frequency);
        formdata.append("walkingtime", route?.params?.duration);
        formdata.append("walkingsteps", steps?.trim());
        const result = await PostApiData(formdata)
        if (result?.status) {
            Alert.alert('Success', result?.message)
            setGoalId(result?.goal_id)
            navigation.navigate('StepCounterWalking', { footSteps: `${steps?.trim()}` })
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
                <Text style={[styles.fonts, styles.marginForFonts]}>Here you have to fill the 'number of steps' which are valid for time duration you have mentioned in the previous step.</Text>
                <Text style={styles.fonts}>For eg. If you selected the 'Day', and time duration as '1' in the previous step and you want to set the goal of 3000 steps of walking in '1' day so here you input 3000.</Text>
                <TextInputMed
                    label={'Set Steps'}
                    iconName={'shoe-print'}
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

const styles = StyleSheet.create({
    bgImage:
    {
        top: -400,
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
        marginTop: 250
    },
    container:
    {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    button:
    {
        marginTop: 50
    }
})

export default Steps

