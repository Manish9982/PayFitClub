import { Image, StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Fonts } from '../Schemes/Fonts'
import { Spaces } from '../Schemes/Spaces'
import { Colors } from '../Schemes/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'

const StatusCard = (props) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width


    const returnStatus = (t) => {
        if (t == 'not started') {
            return 'Start'
        }
        else if (t == 'started') {
            return 'Resume'
        }
    }

    const returnIcon = (status) => {
        return <AntDesign name='caretright' size={14} />
    }

    return (
        <View style={styles.card}>

            <Text>
                <Text style={[Fonts.largeBold, styles.centerText]}>{props.title} </Text>
            </Text>
            {props.status
                &&
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.button}>
                    <Text style={styles.fonts2}>{returnStatus(props.status)}{returnIcon(props.status)}</Text>
                </TouchableOpacity>
            }

            <Text style={styles.fonts1}>
                <Text style={Fonts.mediumBold}>Last Active: </Text>
                <Text>{props.lastActive}</Text>
            </Text>
            <Text style={styles.fonts1}>
                <Text style={Fonts.mediumBold}>Goal Duration: </Text>
                <Text>{props.duration}</Text>
            </Text>
            <Text style={styles.fonts1}>
                <Text style={Fonts.mediumBold}>Goal Distance: </Text>
                <Text>{props.goalDistance} {props.title == 'WALKING' ? 'Steps' : 'Kms'}</Text>
            </Text>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.icon}
                    source={require('../Assets/Images/activity_status_time_ic.png')}
                />
                <Text>
                    <Text style={Fonts.mediumBold}>Spent Time: </Text>
                    <Text>{props.spentTime}</Text>
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.icon}
                    source={require('../Assets/Images/activity_status_kcal_ic.png')}
                />
                <Text>
                    <Text style={Fonts.mediumBold}>Calories Burned: </Text>
                    <Text>{isNaN(Number.parseInt(props.calorieBurned, 10).toFixed()) ? '--' : Number.parseInt(props.calorieBurned, 10).toFixed()} Kcal</Text>
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.icon}
                    source={require('../Assets/Images/activity_status_pace_ic.png')}
                />
                <Text>
                    <Text style={Fonts.mediumBold}>Distance Travelled: </Text>
                    <Text>{props.distanceTravelled}</Text>
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.icon}
                    source={require('../Assets/Images/activity_status_points_ic.png')}
                />
                <Text>
                    <Text style={Fonts.mediumBold}>Points Earned: </Text>
                    <Text>{props.pointsEarned}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: Colors.primary,
        width: '90%',
        alignSelf: 'center',
        padding: Spaces.sm,
        margin: Spaces.sm,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
    },
    fonts1:
    {
        margin: Spaces.vsm
    },
    icon:
    {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        margin: Spaces.vsm
    },
    infoContainer:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button:
    {
        width: 100,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: Spaces.vsm,
        padding: Spaces.sm,
        borderRadius: 8,
    },
    fonts2:
    {
        color: 'white',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    centerText:
    {
        textAlign: 'center'
    }
})

export default StatusCard