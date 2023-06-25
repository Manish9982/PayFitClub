import { Alert, FlatList, Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import SurveysCards from '../../Components/SurveysCards'
import { Apis, LocalStore } from '../../Schemes/Constants'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'
import { PostApiData } from '../../Schemes/PostApiData'
import CustomLoader from '../../Components/CustomLoader'
import { useIsFocused } from '@react-navigation/native'

const MyProfile = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getCategories()
        }
    }, [isFocused])

    const [dataForSurveyCategories, setDataForSurveyCategories] = useState(null)
    const [loader, setLoader] = useState(true)


    const styles = StyleSheet.create({
        headingFont:
        {
            margin: Spaces.med
        },
        columnWrapperStyle:
        {
            justifyContent: 'space-between',
            padding: Spaces.med,
        },
        listView:
        {
            height: 650,
        }
    })

    const getCategories = async () => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData();
        formdata.append("token", Apis.TOKEN);
        formdata.append("userids", userId);
        const result = await PostApiData(formdata, 2)
        if (result?.status == 'true') {
            setDataForSurveyCategories(result)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const onPressSurveyCard = (item) => {
        navigation.navigate('SurveyQuestions', {
            'category': item.category,
            'categoryId': item.id
        })
    }

    const renderSurveys = ({ item, index }) => {
        return (
            <SurveysCards
                onPress={() => onPressSurveyCard(item)}
                category={item?.category}
                points={item?.points}
                status={item?.category_status}
                iconImg={item?.image}
            />
        )
    }
    return (
        loader
            ?
            <CustomLoader />
            :
            <View style={{
                width: '100%'
            }}>
                <Text style={styles.headingFont}>Categories with star icon (*) are mandatory to complete for taking the survey.</Text>
                <View style={styles.listView}>
                    <FlatList
                        columnWrapperStyle={styles.columnWrapperStyle}
                        numColumns={2}
                        data={dataForSurveyCategories?.response}
                        renderItem={renderSurveys}
                        keyExtractor={(item, index) => `_key${index}`}
                    />
                </View>
            </View>
    )
}

export default MyProfile

