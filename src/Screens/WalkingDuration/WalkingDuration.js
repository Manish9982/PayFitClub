import { Alert, Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import TextInputMed from '../../Components/TextInputMed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const WalkingDuration = ({ navigation, route }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [days, setDays] = useState('')

    const onPressNext = () => {
        if (days == '') {
            Alert.alert('Info', 'Please select goal duration')
        }
        else {
            navigation.navigate('Steps', {
                frequency: route?.params?.duration,
                duration: days
            })
        }

    }

    const onChangeDays = (t) => {
        setDays(t)
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Image
                    source={require('../../Assets/Images/bg_walk.png')}
                    style={styles.bgImage}
                />
                <Text style={[styles.fonts, styles.marginForFonts]}>Here you have to fill the time duration of this activity type.</Text>
                <Text style={styles.fonts}>For eg. If you selected the 'Day' above and you want to set the goal for 1 day to set the goal for day so here you type '1'.</Text>
                <TextInputMed
                    value={days}
                    onChangeText={onChangeDays}
                    label={`Select ${route?.params?.duration}s For Walking`}
                    iconName={'clock-check-outline'}
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
        // height:H,
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
        height: H,
        width: W,
        backgroundColor: '#ffffff'
    },
    button:
    {
        marginTop: H * 0.1
    }
})

export default WalkingDuration

