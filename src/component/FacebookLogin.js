import React from 'react';
import { Button, Text, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next'
function LoginFacebook(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Facebook Login React Native Example</Text>
            <Button title={'Login with Facebook'} onPress={() => {
                LoginManager.logInWithPermissions(["public_profile", "email"]).then(
                    function (result) {
                        if (result.isCancelled) {
                            alert("Login Cancelled " + JSON.stringify(result))
                        } else {
                            alert("Login success with  permisssions: " + result.grantedPermissions.toString());
                            alert("Login Success " + result.toString());
                        }
                    },
                    function (error) {
                        alert("Login failed with error: " + error);
                    }
                )
            }} />
        </View>
    );
}
export default LoginFacebook;