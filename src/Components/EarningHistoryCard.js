import { StyleSheet, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import { Colors } from '../Schemes/Colors'
import { Spaces } from '../Schemes/Spaces'
import { Text } from 'react-native-paper'

const EarningHistoryCard = ({ title, category, points, date }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <View style={styles.card}>
            <View style={styles.flexBox}>
                <Image
                    source={require('../Assets/Images/rewards_green_icon.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.flexBox}>
                {/* <Text style={styles.font}>{title}</Text> */}
                <Text style={styles.font}>{category}</Text>
            </View>
            <View style={[styles.horizontalContainer, styles.flexBox]}>
                <Image
                    source={require('../Assets/Images/rewards_green_icon.png')}
                    style={styles.imageWithText}
                />
                <Text style={styles.font2}>{points}</Text>
            </View>
            <View style={styles.flexBox}>
                <Text style={styles.font}>{date || '--'}</Text>
            </View>

        </View>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    card: {
        width: W*0.42,
        margin: Spaces.sm,
        borderColor: Colors.primary,
        borderWidth: 0.5,
        backgroundColor: Colors.primaryTransparent,
        borderRadius: 8,
        padding: Spaces.med
    },
    image:
    {
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    font:
    {
        textAlign: 'center',
        margin: Spaces.vsm
    },
    font2:
    {
        color: Colors.tertiary,
        margin: Spaces.vsm
    },
    imageWithText:
    {
        width: 20,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexBox:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EarningHistoryCard
