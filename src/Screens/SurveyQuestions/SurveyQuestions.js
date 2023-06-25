import { View, StyleSheet, useWindowDimensions, FlatList, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostApiData } from '../../Schemes/PostApiData'
import { Apis, LocalStore } from '../../Schemes/Constants'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'
import { breakString } from '../../Schemes/Utils'
import RenderOptions from '../../Components/RenderOptions'
import { Text } from 'react-native-paper'
import { Spaces } from '../../Schemes/Spaces'
import { Fonts } from '../../Schemes/Fonts'
import ButtonMed from '../../Components/ButtonMed'
import CustomLoader from '../../Components/CustomLoader'

const SurveyQuestions = ({ navigation, route }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    useEffect(() => {
        getQuestions()
    }, [])

    const [dataForSurveyQuestions, setDataForSurveyQuestions] = useState(null)
    const [counter, setCounter] = useState(0)
    const [answers, setAnswers] = useState([])
    const [loader, setLoader] = useState(true)

    const onPressOption = (item) => {
        if (dataForSurveyQuestions?.response[counter]?.qtype == '2') {
            if (answers?.includes(item)) {
                setAnswers(prev => prev?.filter(element => element !== item?.trim()))
            }
            else {
                setAnswers(prev => [...prev, item?.trim()])
            }
        } else if (dataForSurveyQuestions?.response[counter]?.qtype == '1') {
            setAnswers([item?.trim()])
        }

    }

    const submitAnswer = async (id, ans) => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append('token', Apis.TOKEN)
        formdata.append('user_id', userId);
        formdata.append('question_id', id);
        formdata.append('answer', ans?.join(','));
        console.log('formdata=====>', formdata)
        const result = await PostApiData(formdata, 4)
        console.log(result)
    }


    const onPressNextButton = () => {
        submitAnswer(dataForSurveyQuestions?.response[counter]?.id, answers);
        setAnswers(dataForSurveyQuestions?.response[counter]?.answer == "" ? [] : breakString(dataForSurveyQuestions?.response[counter]?.answer, ','));
        if (counter < dataForSurveyQuestions?.response?.length - 1) {
            setCounter(prev => prev + 1);
        } else {
            navigation.goBack();
        }
    }

    const onPressPrevButton = () => {
        if (counter > 0) {
            setCounter(prev => prev - 1)
        }
    }

    const renderOptions = ({ item, index }) => {
        return (
            <RenderOptions
                title={item}
                onPress={() => onPressOption(item)}
                answerArray={answers}
                qType={dataForSurveyQuestions?.response[counter]?.qtype}
            //prevAnswers={breakString(dataForSurveyQuestions?.response[counter]?.answer, ',')}
            />
        )
    }

    const onPressQuestion = (t) => {
        Alert.alert('Question', t)
    }

    const getQuestions = async () => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData();
        formdata.append('token', Apis.TOKEN);
        formdata.append('userid', userId);
        formdata.append('categoryid', route?.params?.categoryId);
        console.log(formdata)
        const result = await PostApiData(formdata, 3)
        if (result?.status) {
            setDataForSurveyQuestions(result)
            if (result?.response[counter]?.answer !== "") {
                setAnswers(breakString(result?.response[counter]?.answer, ','))
            }
        }
        console.log(result)
        setLoader(false)
    }

    return (
        loader
            ?
            <CustomLoader />
            :
            <View style={styles.container}>
                <ImageBackground source={require('../../Assets/Images/navigation_bg.png')}>
                    <Text style={[styles.categoryHeading, Fonts.mediumBold]}>{route?.params?.category}</Text>
                    <TouchableOpacity
                        onPress={() => onPressQuestion(dataForSurveyQuestions?.response[counter]?.question)}
                    >
                        <Text
                            minimumFontScale={0.8}
                            numberOfLines={4}
                            adjustsFontSizeToFit
                            style={[styles.fonts, Fonts.mediumBold]}>{dataForSurveyQuestions?.response[counter]?.question}</Text>
                    </TouchableOpacity>
                    <View style={styles.listView}>
                        <FlatList
                            data={breakString(dataForSurveyQuestions?.response[counter]?.options, '~^')}
                            renderItem={renderOptions}
                            keyExtractor={(item, index) => `_key${index}`}
                        />
                    </View>
                    <View style={[styles.horizontalContainer, { flexDirection: counter !== 0 ? 'row' : 'row-reverse', }]}>
                        {
                            counter !== 0 &&
                            <ButtonMed
                                title={'Prev'}
                                onPress={onPressPrevButton}
                            />
                        }
                        <Text style={styles.counterText}>{counter + 1}/{dataForSurveyQuestions?.response?.length}</Text>

                        <ButtonMed
                            title={'Next'}
                            onPress={onPressNextButton}
                        />
                    </View>
                </ImageBackground>
            </View>
    )
}

export default SurveyQuestions

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1,
    },
    listView:
    {
        height: H * 0.63,
        marginBottom: Spaces.vsm
    },
    categoryHeading:
    {
        textAlign: 'center',
        textDecorationLine: 'underline',
        margin: Spaces.vsm,
    },
    fonts:
    {
        margin: Spaces.med,
        textAlign: 'center',
        height: H * 0.09,
    },
    horizontalContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: Spaces.med,
    },
    counterText:
    {
        position: 'absolute',
        alignSelf: 'center',
        left: W * 0.45
    }
})