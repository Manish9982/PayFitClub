import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveValueToLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
       // console.log(e)
    }
}

export const getValueFromLocalStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
       // console.log(e)
    }
}

export const clearAllStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log(e)
    }

}