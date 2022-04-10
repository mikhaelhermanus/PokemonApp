import React from 'react';
import {
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import TouchID from 'react-native-touch-id'
const FingerPrint = () => {
    const optionalConfigObject = {
        title: "Authentication Required", // Android
        color: "#e00606", // Android,
        fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
    }

    const pressHandler = () => {
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
            .then(success => {
                alert(success)
                // alert('Authenticated Successfully');
            })
            .catch(error => {
                alert('Authentication Failed');
            });
    }

    const clickHandler = () => {
        TouchID.isSupported()
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                   alert('FaceID is supported.');
                } else if (biometryType === 'TouchID') {
                   alert('TouchID is supported.');
                } else if (biometryType === true) {
                    // Touch ID is supported on Android
                    alert('Supported TouchId for android')
                }
            })
            .catch(error => {
                // Failure code if the user's device does not have touchID or faceID enabled
                console.log(error);
            });
    }


    return (
        isFocused ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableHighlight onPress={() => pressHandler()}>
                    <Text>
                        Authenticate with Touch ID
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>clickHandler()}>
                    <Text>Check is supported for biometryType</Text>
                </TouchableHighlight>
            </View>
            : null
    )
}

export default FingerPrint