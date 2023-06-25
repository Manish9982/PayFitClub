import React from 'react';
import { StyleSheet, View, ImageBackground, Image, useWindowDimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors } from '../../Schemes/Colors';
import { Spaces } from '../../Schemes/Spaces';
import { Fonts } from '../../Schemes/Fonts';
import { Text } from 'react-native-paper';
import ButtonMed from '../../Components/ButtonMed';
import LinearGradient from 'react-native-linear-gradient';

const slides = [
    {
        key: 1,
        title: 'Goals',
        backgroundColor: '#59b2ab',
        image: require('../../Assets/Images/intro_goal_ic.png')
    },
    {
        key: 2,
        title: 'Surveys',
        image: require('../../Assets/Images/intro_surveys_ic.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rewards',
        image: require('../../Assets/Images/intro_rewards_ic.png'),
        backgroundColor: '#22bcb5',
    }
];

const SliderIntro = ({ navigation }) => {
    //Hooks Start
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    //Hooks end
    const styles = StyleSheet.create({
        slide:
        {
            zIndex: -1,
            flex: 1,
            resizeMode: 'contain'
        },
        introImages:
        {
            alignSelf: 'center',
            height: H * 0.13,
            width: H * 0.13,
            resizeMode: 'contain'
        },
        circularView:
        {
            alignSelf: "center",
            height: H * 0.24,
            width: H * 0.24,
            borderRadius: H * 0.24 / 2,
            borderColor: Colors.primary,
            borderWidth: 1,
            backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: 'center',
            marginTop: H * 0.07
        },
        title:
        {
            color: Colors.text,
            textAlign: 'center',
            padding: Spaces.med,
            textDecorationLine: 'underline',
        },
        desc:
        {
            margin: Spaces.med
        },
        dotStyle:
        {
            backgroundColor: Colors.primary
        },
        activeDotStyle:
        {
            backgroundColor: Colors.tertiary
        },
        linearGradient: {
            flex: 1,
            borderRadius: 8,
            width: W * 0.2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonText: {
            padding: Spaces.med,
            color: '#ffffff',
        },
    })

    const renderItem = ({ item }) => {
        if (item.key == 1)
            return (

                <ImageBackground
                    source={require('../../Assets/Images/bg_slider.png')}
                    style={styles.slide}>
                    <View style={styles.circularView}>
                        <Image source={item.image}
                            style={[styles.introImages,]}
                        />
                    </View>

                    <Text style={[styles.title, Fonts.large,]}>{item.title}</Text>
                    <Text style={[styles.desc, Fonts.medium]}>• Define your goals</Text>
                    <Text style={[styles.desc, Fonts.medium]}>• Test your limits</Text>
                    <Text style={[styles.desc, Fonts.medium]}>• Push Your Boundaries</Text>
                    <Text style={[styles.desc, Fonts.medium]}>• Pursue your grail</Text>
                    <Text style={[styles.desc, Fonts.medium]}>• Achieve your goals and earn rewards!</Text>
                    <Text style={[styles.desc, Fonts.medium]}>PAYFITCLUB - Your ultimate one stop destination to track, stay motivated, achieve your fitness goals and earn rewards.</Text>


                </ImageBackground>

            );
        if (item.key == 2)
            return (

                <ImageBackground
                    source={require('../../Assets/Images/bg_slider.png')}
                    style={styles.slide}>
                    <View style={styles.circularView}>
                        <Image source={item.image}
                            style={[styles.introImages,]}
                        />
                    </View>

                    <Text style={[styles.title, Fonts.large,]}>{item.title}</Text>
                    <Text style={[styles.desc, Fonts.mediumBold]}>Sounds boring?</Text>
                    {/* <Text style={[styles.desc, Fonts.medium]}>They might but aren't. They will take you a step closer to earn the rewards. It's simple, complete short & simple surveys which are carefully curated keeping in mind your interest and earn more points</Text> */}
                    <Text style={[styles.desc, Fonts.medium]}>Completing short and simple surveys can bring you one step closer to earning exciting rewards. These surveys are thoughtfully curated to align with your interests, ensuring that you earn more points effortlessly. So why wait? Start taking surveys now and unlock incredible rewards!</Text>


                </ImageBackground>

            );
        if (item.key == 3)
            return (

                <ImageBackground
                    source={require('../../Assets/Images/bg_slider.png')}
                    style={styles.slide}>
                    <View style={styles.circularView}>
                        <Image source={item.image}
                            style={[styles.introImages,]}
                        />
                    </View>

                    <Text style={[styles.title, Fonts.large,]}>{item.title}</Text>
                    <Text style={[styles.desc, Fonts.mediumBold]}>'After the battles, comes the reward'</Text>
                    <Text style={[styles.desc, Fonts.medium]}>As fruitful your fitness journey is, it is equally cubersome. See the result of your hardwork not only in your improving health but also in terms of your rewards. Yes folks, you read it right. For every goal you set and achieve, you'll be rewarded in points which you can redeem in cash*. Isn't it cherry on the (sugar free) cake? What's stopping you now? </Text>

                </ImageBackground>

            );
    }

    const renderNextButton = () => {
        return (
            <LinearGradient colors={[Colors.primary, Colors.secondary, Colors.tertiary]}
                style={styles.linearGradient}>
                <Text style={[styles.buttonText, Fonts.small]}>
                    Next
                </Text>
            </LinearGradient>
        )
    }
    const renderDoneButton = () => {
        return (
            <ButtonMed
                onPress={onDone}
                title={'Done'} />
        )
    }

    const onDone = () => {
        navigation.navigate('Login')
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            renderNextButton={renderNextButton}
            renderDoneButton={renderDoneButton}
            onDone={onDone}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
        />
    )
}



export default SliderIntro