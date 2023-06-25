import { Alert, Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Text, Button } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import { Fonts } from '../../Schemes/Fonts'
import { Colors } from '../../Schemes/Colors'
import {
    accelerometer, // direct access to the observables
} from "react-native-sensors";
import { map, filter, debounceTime, catchError } from "rxjs/operators";
import { Apis } from '../../Schemes/Constants'
import { formatTimer, throwUserID } from '../../Schemes/Utils'
import DataContext from '../../Context/DataContext'
import { PostApiData } from '../../Schemes/PostApiData'
import notifee, { AndroidColor } from '@notifee/react-native';

const StepCounterWalking = ({ navigation, route }) => {



    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const { NgoalId } = useContext(DataContext)

    const [goalId, setGoalId] = NgoalId

    const [stepCount, setStepCount] = useState(0);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    let subscription = null;

    useEffect(() => {
        getStepsDataForWalking()
    }, [])

    useEffect(() => {

        let timerInterval = null;

        if (timerActive) {
            timerInterval = setInterval(() => {
                setTimerSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(timerInterval);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [timerActive]);

    const calculateCaloriesBurned = () => {
        // Calculate calories burned based on the number of steps
        const caloriesPerStep = 0.04; // Example value, adjust as needed
        return caloriesPerStep;
    };

    const returnSpeed = () => {
        if (isNaN((stepCount * 0.7) / timerSeconds)) {
            return '0'
        }
        else {
            return (((stepCount * 0.7) / timerSeconds) * 3.6).toFixed(2)
        }
    }

    const getStepsDataForWalking = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.start_goal_case_id);
        formdata.append("userid", await throwUserID());
        formdata.append("goalid", goalId);
        formdata.append("activity", "Walking");
        const result = await PostApiData(formdata)
    }

    const startWalking = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.start_goal_case_id);
        formdata.append("userid", await throwUserID());
        formdata.append("goalid", goalId);
        formdata.append("activity", "Walking");
        const result = await PostApiData(formdata)
    }

    const onPressNext = useCallback(async () => {
        setTimerActive(true)
        notifee.registerForegroundService((notification) => {
            return new Promise(() => {
                // Long running task...
            });
        }); 

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        try {
            subscription = accelerometer
                .pipe(
                    //map(({ x, y, z }) => Math.sqrt(x ** 2 + y ** 2 + z ** 2)),
                    filter(({ x, y, z }) => {
                        return Math.sqrt(x ** 2 + y ** 2 + z ** 2) > 12.5 || Math.sqrt(x ** 2) > 11.2 || Math.sqrt(y ** 2) > 11.2 || Math.sqrt(z ** 2) > 11.2; // Adjust the threshold as needed
                    }), // Adjust the threshold as needed
                    debounceTime(475),
                    catchError(error => {
                        navigation.goBack()
                        Alert.alert('Error', error)
                    })
                )
                .subscribe((mag) => {
                    setStepCount((prevCount) => prevCount + 1);
                    setCaloriesBurned((prevCalories) => prevCalories + calculateCaloriesBurned(mag));
                    startWalking()
                    notifee.displayNotification({
                        title: 'Step Counter',
                        body: 'Your steps are being watched',
                        android: {
                            channelId,
                            asForegroundService: true,
                            color: AndroidColor.GREEN,
                            colorized: true,
                        },
                    });
                });
        }
        catch (error) {
            Alert.alert('Error', error)
        }
    }, [])


    const onPressStop = useCallback(() => {
        if (subscription) {
            subscription.unsubscribe()
            subscription = null;
            setTimerActive(false)
        }
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../Assets/Images/bg_walk.png')}
                style={styles.bgImage}
            />
            <View style={styles.infoRing}>
                <Text style={[styles.fonts, Fonts.largeBold]}>Steps: {stepCount}/{route?.params?.footSteps}</Text>
            </View>
            <Text style={styles.subheading2}>Earned Points: 10</Text>
            <View style={styles.horizontalContainer}>
                <View style={styles.subContainer}>
                    <Image source={require('../../Assets/Images/avg_pace_ic.png')}
                        style={styles.imageIcon}
                    />
                    <Text style={styles.subheading}>
                        {formatTimer(timerSeconds)}
                    </Text>
                    <Text style={styles.subheading3}>TIME</Text>
                </View>
                <View style={styles.subContainer}>
                    <Image source={require('../../Assets/Images/activity_walking_ic.png')}
                        style={styles.imageIcon}
                    />
                    <Text style={styles.subheading}>
                        {returnSpeed()} Km/hour
                    </Text>
                    <Text style={styles.subheading3}>AVG PACE</Text>
                </View>
                <View style={styles.subContainer}>
                    <Image source={require('../../Assets/Images/burn_calorie_ic.png')}
                        style={styles.imageIcon}
                    />
                    <Text style={styles.subheading}>
                        {caloriesBurned.toFixed(2)} Kcal
                    </Text>
                    <Text style={styles.subheading3}>KCAL BURNED</Text>
                </View>
            </View>
            {
                timerActive
                    ?
                    <ButtonLar
                        onPressButtonLar={onPressStop}
                        title={`Stop`}
                        style={styles.button1}
                    />
                    :
                    <ButtonLar
                        onPressButtonLar={onPressNext}
                        title={`Start Walking`}
                        style={styles.button1}
                    />
            }
        </ScrollView>
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
        zIndex: 2,
        textAlign: 'center'
    },
    marginForFonts:
    {
        marginTop: H * 0.35
    },
    container:
    {
        height: H,
        width: W,
        backgroundColor: '#ffffff'
    },
    button1:
    {
        marginTop: H * 0.01
    },
    infoRing:
    {
        backgroundColor: 'transparent',
        height: H * 0.25,
        width: H * 0.25,
        borderRadius: H * 0.25 / 2,
        alignSelf: 'center',
        borderWidth: 11,
        borderColor: Colors.info,
        marginVertical: H * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        marginBottom: 0
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    horizontalContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: Spaces.large_custom
    },
    imageIcon:
    {
        height: H * 0.04,
        width: H * 0.04,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    subheading:
    {
        textAlign: 'center',
    },
    subheading2:
    {
        textAlign: 'center',
        margin: Spaces.med
    },
    subContainer:
    {
        width: W / 3,
    },
    subheading3:
    {
        color: Colors.primary,
        textAlign: 'center',
    }

})

export default StepCounterWalking