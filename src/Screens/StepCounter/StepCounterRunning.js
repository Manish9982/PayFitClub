import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { calculateDistance, formatTimer } from '../../Schemes/Utils';
import ButtonLar from '../../Components/ButtonLar';
import { Fonts } from '../../Schemes/Fonts';
import { Colors } from '../../Schemes/Colors';
import { Spaces } from '../../Schemes/Spaces';


const StepCounterRunning = ({ navigation, route }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const styles = makeStyles(H, W)

  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTracking = async () => {
    setIsRunning(true);
    try {
      const status = await Geolocation.requestAuthorization('whenInUse')
      if (status === 'granted') {
        const newSubscription = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;

            if (previousLocation) {
              const distance = calculateDistance(
                previousLocation.latitude,
                previousLocation.longitude,
                latitude,
                longitude
              );
              setDistance(prevDistance => prevDistance + distance);
            }

            setPreviousLocation({ latitude, longitude });
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 5000,
            fastestInterval: 5000,
          }
        );
        setSubscription(newSubscription);
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Failed to request location permission', error);
    }
  };

  const stopTracking = () => {
    setIsRunning(false);
    if (subscription) {
      Geolocation.clearWatch(subscription);
      setSubscription(null);
    }
  };

  const calculateAveragePace = () => {
    // Calculate average pace based on distance and timer
  };

  const calculateCaloriesBurned = () => {
    // Calculate calories burned based on distance and other factors
  };

  const startRunning = () => {

  }

  const discardRunning = () => {

  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../Assets/Images/bg_walk.png')}
        style={styles.bgImage}
      />
      <View style={styles.infoRing}>
        <Text style={[styles.fonts, Fonts.largeBold]}>{distance}/{route?.params?.footSteps} Kms</Text>
      </View>
      <Text style={styles.subheading2}>Earned Points: 10</Text>
      <View style={styles.horizontalContainer}>
        <View style={styles.subContainer}>
          <Image source={require('../../Assets/Images/avg_pace_ic.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.subheading}>
            {formatTimer(timer)}
          </Text>
          <Text style={styles.subheading3}>TIME</Text>
        </View>
        <View style={styles.subContainer}>
          <Image source={require('../../Assets/Images/activity_running_ic.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.subheading}>
            0 Km/hour
          </Text>
          <Text style={styles.subheading3}>AVG PACE</Text>
        </View>
        <View style={styles.subContainer}>
          <Image source={require('../../Assets/Images/burn_calorie_ic.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.subheading}>
            {calories.toFixed(2)} Kcal
          </Text>
          <Text style={styles.subheading3}>KCAL BURNED</Text>
        </View>
      </View>
      {
        isRunning
          ?
          <ButtonLar
            onPressButtonLar={stopTracking}
            title={`Stop`}
            style={styles.button1}
          />
          :
          <ButtonLar
            onPressButtonLar={startTracking}
            title={`Start Running`}
            style={styles.button1}
          />
      }
    </ScrollView>
  );
};

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

export default StepCounterRunning;
