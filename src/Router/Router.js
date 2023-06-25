import React, { useContext } from 'react'
import Login from '../Screens/Auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash/Splash';
import SliderIntro from '../Screens/SliderIntro/SliderIntro';
import CreateAccount from '../Screens/Auth/CreateAccount';
import { Colors } from '../Schemes/Colors';
import DataContext from '../Context/DataContext';
import Dashboard from '../Screens/Dashboard/Dashboard';
import SetGoals from '../Screens/SetGoals/SetGoals';
import Walking from '../Screens/Walking/Walking';
import WalkingDuration from '../Screens/WalkingDuration/WalkingDuration';
import Steps from '../Screens/Steps/Steps';
import StepCounter from '../Screens/StepCounter/StepCounterWalking';
import Status from '../Screens/Status/Status';
import Surveys from '../Screens/Surveys/Surveys';
import MyProfile from '../Screens/MyProfile.js/MyProfile';
import Blogs from '../Screens/Blogs/Blogs';
import Wallet from '../Screens/Wallet/Wallet';
import EarningHistory from '../Screens/EarningHistory/EarningHistory';
import AboutUs from '../Screens/AboutUs/AboutUs';
import SurveysHistory from '../Screens/SurveysHistory/SurveysHistory';
import TermsOfUse from '../Screens/TermsOfUse/TermsOfUse';
import PrivacyPolicy from '../Screens/PrivacyPolicy/PrivacyPolicy';
import HowItWorks from '../Screens/HowItWorks/HowItWorks';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import SurveyQuestions from '../Screens/SurveyQuestions/SurveyQuestions';
import StepCounterWalking from '../Screens/StepCounter/StepCounterWalking';
import Running from '../Screens/Running.js/Running';
import Cycling from '../Screens/Cycling/Cycling';
import RunningDuration from '../Screens/RunningDuration/RunningDuration';
import CyclingDuration from '../Screens/CyclingDuration/CyclingDuration';
import DistanceCycling from '../Screens/DistanceCycling/DistanceCycling';
import DistanceRunning from '../Screens/DistanceRunning/DistanceRunning';
import Notifications from '../Screens/Notifications/Notifications';
import StepCounterRunning from '../Screens/StepCounter/StepCounterRunning';
import StepCounterCycling from '../Screens/StepCounter/StepCounterCycling';
import PayFitSurveys from '../Screens/PayFitSurveys/PayFitSurveys';
import GMO from '../Screens/GMO/GMO';

const Stack = createNativeStackNavigator();


const Router = () => {
    const { NisSignedIn } = useContext(DataContext)
    const [isSignedIn, setIsSignedIn] = NisSignedIn

    if (isSignedIn == 'loggedIn') {
        return (
            <Stack.Navigator screenOptions={{
                headerTintColor: Colors.primary,
                //headerTransparent: true,
            }}>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, headerTitle: 'Dashboard' }} />
                <Stack.Screen name="SetGoals" component={SetGoals} options={{ headerTitle: 'Set Goals' }} />
                <Stack.Screen name="Walking" component={Walking} options={{ headerTitle: 'Walking' }} />
                <Stack.Screen name="Running" component={Running} options={{ headerTitle: 'Running' }} />
                <Stack.Screen name="Cycling" component={Cycling} options={{ headerTitle: 'Cycling' }} />
                <Stack.Screen name="WalkingDuration" component={WalkingDuration} options={{ headerTitle: 'Duration' }} />
                <Stack.Screen name="RunningDuration" component={RunningDuration} options={{ headerTitle: 'Duration' }} />
                <Stack.Screen name="CyclingDuration" component={CyclingDuration} options={{ headerTitle: 'Duration' }} />
                <Stack.Screen name="Steps" component={Steps} options={{ headerTitle: 'Steps' }} />
                <Stack.Screen name="StepCounterWalking" component={StepCounterWalking} options={{ headerTitle: 'Walking' }} />
                <Stack.Screen name="StepCounterRunning" component={StepCounterRunning} options={{ headerTitle: 'Running' }} />
                <Stack.Screen name="StepCounterCycling" component={StepCounterCycling} options={{ headerTitle: 'Cycling' }} />
                <Stack.Screen name="Status" component={Status} options={{ headerTitle: 'Status' }} />
                <Stack.Screen name="Surveys" component={Surveys} options={{ headerTitle: 'Surveys' }} />
                <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerTitle: 'My Profile' }} />
                <Stack.Screen name="Blogs" component={Blogs} options={{ headerTitle: 'Blogs' }} />
                <Stack.Screen name="Wallet" component={Wallet} options={{ headerTitle: 'Wallet' }} />
                <Stack.Screen name="EarningHistory" component={EarningHistory} options={{ headerTitle: 'Earning History' }} />
                <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerTitle: 'About Us' }} />
                <Stack.Screen name="SurveysHistory" component={SurveysHistory} options={{ headerTitle: 'Surveys History' }} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} options={{ headerTitle: 'Terms Of Use' }} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerTitle: 'Privacy Policy' }} />
                <Stack.Screen name="HowItWorks" component={HowItWorks} options={{ headerTitle: 'How It Works' }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: 'Change Password' }} />
                <Stack.Screen name="SurveyQuestions" component={SurveyQuestions} options={{ headerTitle: 'Questions' }} />
                <Stack.Screen name="DistanceCycling" component={DistanceCycling} options={{ headerTitle: 'Distance' }} />
                <Stack.Screen name="DistanceRunning" component={DistanceRunning} options={{ headerTitle: 'Distance' }} />
                <Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: 'Notifications' }} />
                <Stack.Screen name="PayFitSurveys" component={PayFitSurveys} options={{ headerTitle: 'PayFit Surveys' }} />
                <Stack.Screen name="GMO" component={GMO} options={{ headerTitle: 'GMO' }} />
            </Stack.Navigator>
        )
    }
    else {
        return (
            <Stack.Navigator screenOptions={{
                headerTintColor: Colors.primary,
            }}>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="SliderIntro" component={SliderIntro} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerTitle: 'Create Account' }} />
            </Stack.Navigator>

        )
    }

}

export default Router