import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';

import { useNavigation } from '@react-navigation/native'
const Header = props => {
    const navigation = useNavigation()

    const renderLeftHead = () => {
        if (props.back) {
            return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        source={require('../icons/arrowBack.png')}
                    />
                </TouchableOpacity>
            )
        } else if (props.home) {
            return (
                <View>
                    <Text style={{ color: colors.white }}>Home</Text>
                </View>
            )

        }
    }

    const renderMidHead = () => {
        return (
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.white }}>{props.pageName}</Text>
        )
    }

    const renderRightHead = () => {
        if (props.catch) {
            return (
                <TouchableOpacity disabled={props.disableCatch} onPress={() => props.rightAction()} style={props.disableCatch ? styles.DissablebuttonCatch : styles.buttonCatch}>
                    <Text style={{ color: colors.white }}>Catch</Text>
                </TouchableOpacity>
            )
        } else if (props.pokeBag) {
            return (
                <TouchableOpacity onPress={() => props.rightAction()} >
                    <Text style={{ color: colors.white }}>Go To PokeBag</Text>
                </TouchableOpacity>
            )

        }

    }

    return (
        <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.orangeQonstanta }}>
            {renderLeftHead()}
            {renderMidHead()}
            {renderRightHead()}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    buttonCatch: {
        width: 60,
        height: 25,
        backgroundColor: colors.blueQonstanta,
        borderColor: colors.blueQonstanta,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DissablebuttonCatch: {
        width: 60,
        height: 25,
        backgroundColor: colors.grayContact,
        borderColor: colors.grayContact,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})