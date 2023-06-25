import { Alert, Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import TextInputWithMultipleOptions from '../../Components/TextInputWithMultipleOptions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Running = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [selectDurationModal, setSelectDurationModal] = useState(false)
    const [durationOption, setDurationOption] = useState('')

    const onPressNext = () => {
        if (durationOption == '') {
            Alert.alert('Info', 'Please select goal duration type by Day/Week/Month')
        }
        else {
            navigation.navigate('RunningDuration', { 'duration': durationOption })
        }
    }

    const onPressDurationInput = () => {
        setSelectDurationModal(true)
    }

    const onPressDurationItem = (t) => {
        setDurationOption(t)
        setSelectDurationModal(false)
    }


    const DATA = [
        {
            name: 'Day'
        },
        {
            name: 'Week'
        },
        {
            name: 'Month'
        }
    ]

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <Image
                    source={require('../../Assets/Images/bg_walk.png')}
                    style={styles.bgImage}
                />
                <Text style={[styles.fonts, styles.marginForFonts]}>Here you have to select duration type of this activity which can be Day/Week/Month.</Text>
                <Text style={styles.fonts}>For eg. If you want to set the goal for day so here you have to select 'Day' from the menu.</Text>
                <TextInputWithMultipleOptions
                    label={'Select (Day/Week/Month)'}
                    visible={selectDurationModal}
                    iconName={'calendar'}
                    value={durationOption}
                    options={DATA}
                    onPressInputCustomView={onPressDurationInput}
                    onPressOption={onPressDurationItem}
                />
                <ButtonLar
                    onPressButtonLar={onPressNext}
                    title={'Next'}
                    style={styles.button} />
            </View>
        </KeyboardAwareScrollView>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    bgImage:
    {
        top: - H * 0.55,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: W,
        position: 'absolute',
        flex: 1,
        alignSelf: 'center',

    },
    fonts:
    {
        margin: Spaces.lar,
    },
    marginForFonts:
    {
        marginTop: H * 0.25
    },
    container:
    {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    button:
    {
        marginTop: H * 0.1
    }
})

export default Running

