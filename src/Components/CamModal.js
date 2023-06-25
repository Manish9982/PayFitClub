import { StyleSheet, View, useWindowDimensions, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { Text } from 'react-native-paper'
import { Spaces } from '../Schemes/Spaces'

const CamModal = ({ visible, onCancelPress, launchCam, launchGallery }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.mainContainer}>
                <View style={styles.secondaryContainer}>
                    <Text>Pick Image From:</Text>
                    <View style={styles.horizontalContainer}>
                        <TouchableOpacity
                            style={styles.boxCenter}
                            onPress={launchCam}>
                            <AntDesign name="camera" size={50} color={"silver"} />
                            <Text style={{
                            }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.boxCenter}
                            onPress={launchGallery}>
                            <AntDesign name="picture" size={50} color={"silver"} />
                            <Text style={styles.fonts}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onCancelPress}
                    >
                        <Text style={styles.cancelButton}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    mainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'

    },
    horizontalContainer:
    {
        flexDirection: "row",
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        margin: Spaces.med
    },
    cancelButton:
    {
        color: 'red',
        textAlign: 'right'
    },
    secondaryContainer:
    {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        width: W * 0.85,
        padding: Spaces.med,
    },
    boxCenter:
    {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CamModal
