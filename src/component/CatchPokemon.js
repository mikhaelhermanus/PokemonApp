import React from 'react'
import { View, Text, Dimensions, Modal, TouchableOpacity, Touchable } from 'react-native'
import colors from '../styles/colors'

const win = Dimensions.get('window')

const CatchPokemon = ({ modalVisible, onOpenModal,onCatchPokemon }) => {

    const onCatch = () =>{
        onCatchPokemon()
        onOpenModal()
    }

    return (
        <Modal
            visible={modalVisible}
            onRequestClose={() => onOpenModal()}
            animationType='fade'
            transparent
        >
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                flex: 1,
                justifyContent: 'flex-end'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    paddingTop: 12,
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                    paddingBottom: 20,
                    alignItems : 'center'
                }}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>Ingin Menangkap Pokemon ini ??</Text>
                    <TouchableOpacity onPress={()=>onCatch()} style={{ width: 100, height: 40, backgroundColor: colors.orangeQonstanta, borderRadius: 8, borderColor: colors.orangeQonstanta, alignItems : 'center', justifyContent : 'center' }}>
                        <Text style={{color : colors.white, fontWeight : 'bold'}}>Tangkap</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

export default CatchPokemon