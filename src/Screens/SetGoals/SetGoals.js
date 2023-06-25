import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import { Colors } from '../../Schemes/Colors'

const SetGoals = ({ navigation }) => {

    const onPressWalking = () => {
        navigation.navigate('Walking')
    }

    const onPressRunning = () => {
        navigation.navigate('Running')
    }

    const onPressCycling = () => {
        navigation.navigate('Cycling')
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.bgImage}
                source={require('../../Assets/Images/set_goal_img.png')}
            />
            <TouchableOpacity onPress={onPressWalking}>
                <Image
                    style={styles.buttonImage}
                    source={require('../../Assets/Images/walking_set_goal_ic.png')}
                />
            </TouchableOpacity>
            <Text style={[styles.titleText, Fonts.mediumBold]}>Walking</Text>
            <TouchableOpacity onPress={onPressRunning}>
                <Image
                    style={styles.buttonImage}
                    source={require('../../Assets/Images/running_set_goal_ic.png')}
                />
            </TouchableOpacity>
            <Text style={[styles.titleText, Fonts.mediumBold]}>Running</Text>
            <TouchableOpacity onPress={onPressCycling}>
                <Image
                    style={styles.buttonImage}
                    source={require('../../Assets/Images/cycling_set_goal_ic.png')}
                />
            </TouchableOpacity>
            <Text style={[styles.titleText, Fonts.mediumBold]}>Cycling</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bgImage:
    {
        alignSelf: 'center',
        position: 'absolute',
        width: '170%',
        resizeMode: 'contain',
        marginTop: 320
    },
    container: {
        flex: 1
    },
    titleText:
    {
        textAlign: 'center',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 10,
        shadowRadius: 1,
        elevation: 16,
    },
    buttonImage:
    {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 120,
        marginTop: Spaces.med
    }
})

export default SetGoals

