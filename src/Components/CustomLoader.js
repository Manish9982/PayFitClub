import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Colors } from '../Schemes/Colors'

const CustomLoader = () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator
                color={Colors.primary}
                size={'large'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CustomLoader
