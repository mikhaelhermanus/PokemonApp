import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const Login = () => {

    useEffect(() => {
        try {
            GoogleSignin.configure({
                webClientId: '796240935597-sodgoqbs2ersvgaq05f1c0q98btsrpoh.apps.googleusercontent.com',
            })
        } catch (error) {
            alert(error)
        }
       ;
    }, [])

    const onGoogleButtonPress = async () => {
        try {
            // Get the users ID token
            // const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            // return auth().signInWithCredential(googleCredential);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
        } catch (error) {
            alert(error)
        }

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress()}
            />
        </View>

    );
}

export default Login