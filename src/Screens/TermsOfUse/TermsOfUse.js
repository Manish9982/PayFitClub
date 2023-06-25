import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'
import { Apis } from '../../Schemes/Constants'

const TermsOfUse = () => {
    const styles = StyleSheet.create({})
    return (
        <WebView source={{ uri: Apis.TERMS_OF_USE }} />
    )
}

export default TermsOfUse
