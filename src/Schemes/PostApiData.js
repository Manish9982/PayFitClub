import { err } from 'react-native-svg/lib/typescript/xml';
import { Apis } from './Constants';
import { Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';

export const PostApiData = async (fd, alt = 1) => {

    const throwBaseUrl = (a) => {
        if (a == 1) {
            return Apis.BASE_URL
        }
        else if (a == 2) {
            return Apis.categories_Url
        }
        else if (a == 3) {
            return Apis.questions_Url
        }
        else if (a == 4) {
            return Apis.submit_answer_Url
        }
    }

    var requestOptions = {
        method: 'POST',
        body: fd,
        redirect: 'follow'
    };
    try {
        const response = await fetch(throwBaseUrl(alt), requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        Alert.alert('Error', error.message)
    }

}
