import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Text } from 'react-native-paper'
import { SegmentedButtons } from 'react-native-paper';
import StatusCard from '../../Components/StatusCard';
import { PostApiData } from '../../Schemes/PostApiData';
import { Apis, LocalStore } from '../../Schemes/Constants';
import { getValueFromLocalStorage } from '../../Schemes/LocalStore';
import CustomLoader from '../../Components/CustomLoader';
import DataContext from '../../Context/DataContext';

const Status = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    useEffect(() => {
        getStatusOfTasks()
    }, [])

    const { NgoalId } = useContext(DataContext)

    const [goalId, setGoalId] = NgoalId
    const [value, setValue] = useState('Ongoing')
    const [statusData, setStatusData] = useState(null)
    const [loader, setLoader] = useState(true)

    const styles = StyleSheet.create({
        container:
        {
            flex: 1,
            alignItems: 'center',
        },
        cardList:
        {
            height: H * 0.85
        },
        notFoundText:
        {
            textAlign: 'center',
            marginTop: H * 0.4
        }
    })

    const getStatusOfTasks = async () => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.actvity_ongoing_status_case_id);
        formdata.append("userids", userId);
        const result = await PostApiData(formdata)
        if (result?.status) {
            setStatusData(result?.response?.ongoing)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const onPressOngoing = () => {
        setLoader(true)
        getStatusOfTasks()
    }

    const onPressComplete = async () => {
        setLoader(true)
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.activity_complete_case_id);
        formdata.append("userids", userId);
        const result = await PostApiData(formdata)
        if (result?.status) {
            setStatusData(result?.response?.completed)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const onPressIncomplete = async () => {
        setLoader(true)
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.actvity_incomplete_case_id);
        formdata.append("userids", userId);
        const result = await PostApiData(formdata)
        if (result?.status) {
            setStatusData(result?.response?.incomplete)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const onResume = (t, trgt, goalId) => {
        setGoalId(goalId)
        if (t == 'walking') {
            navigation.navigate('StepCounterWalking', { footSteps: trgt })
        }
        else if (t == 'running') {
            navigation.navigate('StepCounterRunning', { footSteps: trgt })
        }
        else if (t == 'cycling') {
            navigation.navigate('StepCounterCycling', { footSteps: trgt })
        }
    }

    const renderStatus = ({ item, index }) => {
        return (
            <StatusCard
                onPress={() => onResume(item?.activity, item?.target_set, item?.goalid)}
                title={item?.activity?.toUpperCase()}
                status={item?.goal_status}
                lastActive={item?.stopdate}
                duration={item?.target_time}
                goalDistance={item?.target_set}
                spentTime={item?.achieved_time}
                calorieBurned={item?.calories}
                distanceTravelled={item?.achieved_target}
                pointsEarned={item?.points}
            />
        )
    }

    return (
        loader
            ?
            <CustomLoader />
            :
            <View>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                        {
                            value: 'Ongoing',
                            label: <Text style={{ color: value == 'Ongoing' ? '#ffffff' : '#000000' }}>Ongoing</Text>,
                            onPress: () => onPressOngoing()
                        },
                        {
                            value: 'Complete',
                            label: <Text style={{ color: value == 'Complete' ? '#ffffff' : '#000000' }}>Complete</Text>,
                            onPress: () => onPressComplete()
                        },
                        {
                            value: 'Incomplete',
                            label: <Text style={{ color: value == 'Incomplete' ? '#ffffff' : '#000000' }}>Incomplete</Text>,
                            onPress: () => onPressIncomplete()
                        },
                    ]}
                />
                <View style={styles.cardList}>
                    {
                        statusData?.length == 0
                        &&
                        <Text style={styles.notFoundText}>No Activities Found...</Text>
                    }
                    <FlatList
                        data={statusData}
                        renderItem={renderStatus}
                        keyExtractor={(item, index) => `_key${index}`}
                    />
                </View>

            </View>
    )
}

export default Status

