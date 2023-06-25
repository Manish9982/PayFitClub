import { Alert, FlatList, Image, ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import EarningHistoryCard from '../../Components/EarningHistoryCard'
import { Colors } from '../../Schemes/Colors'
import { Apis } from '../../Schemes/Constants'
import { throwUserID } from '../../Schemes/Utils'
import { PostApiData } from '../../Schemes/PostApiData'
import CustomLoader from '../../Components/CustomLoader'

const EarningHistory = () => {

    useEffect(() => {
        earningHistoryData()
    }, [])

    const [earningData, setEarningData] = useState(null)
    const [loader, setLoader] = useState(true)

    const earningHistoryData = async () => {
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.rewards_case_id);
        formdata.append("userids", await throwUserID());
        const result = await PostApiData(formdata)
        if (result?.status) {
            setEarningData(result)
        }
        else {
            Alert.alert('Info', result?.message)
        }
        setLoader(false)
    }


    const DATA = [
        {
            title: 'Profiling Category',
            category: '(Walking)',
            points: '122',
            date: 'May 2, 2023'
        },
        {
            title: 'Profiling Category',
            category: '(Walking)',
            points: '122',
            date: 'May 2, 2023'
        },
        {
            title: 'Profiling Category',
            category: '(Walking)',
            points: '122',
            date: 'May 2, 2023'
        },
        {
            title: 'Profiling Category',
            category: '(Walking)',
            points: '122',
            date: 'May 2, 2023'
        },
        {
            title: 'Profiling Category',
            category: '(Walking)',
            points: '122',
            date: 'May 2, 2023'
        },

    ]


    const renderEarningHistory = ({ item, index }) => {
        return (
            <EarningHistoryCard
                title={item?.title}
                category={item?.reward_description}
                points={item?.points}
                date={item?.date}
            />
        )
    }

    return (
        loader
            ?
            <CustomLoader />
            :
            <View style={styles.primaryContainer}>
                <ImageBackground
                    style={styles.containerImage}
                    imageStyle={styles.imageStyle}
                    source={require('../../Assets/Images/rewards_bg.png')}>
                    <Text style={Fonts.mediumBold}>Earned Points</Text>
                    <Image
                        source={require('../../Assets/Images/reward_point_icon.png')}
                        style={styles.rewardImage}
                    />
                    <Text style={Fonts.largeBold}>{earningData?.message?.total_points}</Text>
                </ImageBackground>
                <View style={styles.listView}>
                    <FlatList
                        columnWrapperStyle={styles.columnWrapperStyle}
                        showsVerticalScrollIndicator
                        alwaysBounceVertical
                        numColumns={2}
                        data={earningData?.message?.reward_list}
                        renderItem={renderEarningHistory}
                        keyExtractor={(item, index) => `_key${index}`}
                    />
                </View>

            </View>
    )
}

const styles = StyleSheet.create({
    containerImage:
    {
        height: 220,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginVertical: Spaces.med,
        borderRadius: 8,
        alignSelf: 'center',
    },
    imageStyle:
    {
        resizeMode: 'contain',
        borderRadius: 8
    },
    rewardImage:
    {
        height: 40,
        resizeMode: 'contain'
    },
    columnWrapperStyle:
    {
        justifyContent: 'space-between',
        margin: Spaces.med
    },
    primaryContainer: {
        flex: 1
    },
    listView:
    {
        height: 500,
        backgroundColor: Colors.light,
        elevation: 8
    }

})

export default EarningHistory

