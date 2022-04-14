import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../component/Header'
import colors from '../styles/colors'
import PokemonCard from '../component/PokemonCard'
import { useQuery } from 'react-query'
import { useNavigation } from '@react-navigation/native'
import TrackButton from '../analytics';
import analytics from '@react-native-firebase/analytics';


const PokemonList = props => {
    const navigation = useNavigation()
    const [nextPage, setNextpage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const fetchPokemon = (nextPage) => fetch(`https://pokeapi.co/api/v2/pokemon?offset=${nextPage}&limit=20`).then((res) => res.json())
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery(['pokemon', nextPage], () => fetchPokemon(nextPage), { keepPreviousData: true })

    const onHandleNext = () => {
        setNextpage(nextPage + 10)
        setCurrentPage(currentPage + 1)
    }

    const onHandlePrevious = () => {
        setNextpage(nextPage - 10),
            setCurrentPage(currentPage - 1)
    }

    const onLogScreenView = async () =>{
        try {
            await  analytics().logScreenView({
                screen_name: 'Home',
                screen_class: 'Home',
            })
        } catch (error) {
            console.log(error)
        }
      
    }

    const onLogUserProperties = async () =>{
        try {
            await  analytics().setUserProperties
        } catch (error) {
            console.log(error)
        }
      
    }

    useEffect(()=>{
        onLogScreenView()
    })

    const Footer = () => {
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                <TouchableOpacity disabled={currentPage === 1} onPress={() => onHandlePrevious()} style={{ width: '45%', height: 50, borderRadius: 10, borderColor: colors.orangeQonstanta, backgroundColor: colors.orangeQonstanta, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.white }}>Sebelumnya</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{currentPage}</Text>
                </View>
                <TouchableOpacity disabled={data?.hasMore} onPress={() => onHandleNext()} style={{ width: '45%', height: 50, borderRadius: 10, borderColor: colors.blueQonstanta, backgroundColor: colors.blueQonstanta, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        isLoading ?
                            <ActivityIndicator />
                            :
                            <Text style={{ color: colors.white }}>Berikutnya</Text>
                    }

                </TouchableOpacity>
            </View>
        )
    }

    const renderListPokemon = () => {
        return (
            <FlatList
                style={{ margin: 8 }}
                numColumns={2}
                data={data?.results}
                renderItem={({ item, index }) => <PokemonCard name={item.name} item={item} />}
                columnWrapperStyle={{
                    margin: 5
                }}
                ListFooterComponent={Footer}
                listKey={(item, index) => `_key${index.toString()}`}
            />

        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.grayMedium }}>
            <Header home pageName={'PokeDex'} pokeBag rightAction={()=>navigation.navigate('PokeBag')} />
            <TouchableOpacity onPress={()=>navigation.navigate('Map')} style={{ margin: 10 }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Pokedex</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('CameraScan')} style={{ margin: 10 }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Goto Camera Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('FingerPrint')} style={{ margin: 10 }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Goto FingerPrint Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{ margin: 10 }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Login Screen</Text>
            </TouchableOpacity>
            <TrackButton/>
            {
                isError ? <Text>{error}</Text>
                    :
                    isLoading ? <ActivityIndicator size={30} color={colors.blueQonstanta} />
                        :
                        renderListPokemon()}
        </View>
    )
}

export default PokemonList