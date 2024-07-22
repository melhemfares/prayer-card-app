import React, { useState, useEffect } from 'react'
import { 
  View, 
  TextInput, 
  Text,
  ScrollView,
  Pressable,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import PrayerCard from './PrayerCard'
import PrayerCardView from './PrayerCardView'
import DeleteButton from './DeleteButton'

import { useSelector, useDispatch } from 'react-redux'
import { light, dark } from '../styles/theme'

import styles from '../styles/styles'
import Overlay from './Overlay'
import { toggleOverlay } from '../app/redux/overlay'
import { setCardCollection } from '../app/redux/cardCollection'

//Settings
import { setDarkMode } from '../app/redux/darkMode';
import { setConfirmAdd } from '../app/redux/confirmAdd';
import { setConfirmDelete } from '../app/redux/confirmDelete';

export default function Collection() {
  const dispatch = useDispatch()

  //State variables
  const [search, setSearch] = useState('')
  const [cardTitle, setCardTitle] = useState('')
  const [cardPrayer, setCardPrayer] = useState('')
  const [cardImage, setCardImage] = useState('')

  //Redux variables
  const { darkMode } = useSelector((state) => state.darkMode)
  const { overlay } = useSelector((state) => state.overlay)
  const { cardCollection } = useSelector((state) => state.cardCollection)
  const theme = darkMode ? dark : light;

  //Displays a selected card
  const showCard = (card) => {
    setCardImage(card.image)
    setCardTitle(card.name)
    setCardPrayer(card.prayer)
    dispatch(toggleOverlay())
  }

  //Updates the local storage
  const storeCards = async (cards) => {
    try {
      await AsyncStorage.setItem('cards', JSON.stringify({ cards }))
    } catch (err) {
      console.log(err)
    }
  }

  //Loads the local storage into redux state
  const retrieveCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('cards')
      if (storedCards !== null) {
        dispatch(setCardCollection(JSON.parse(storedCards).cards))
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Same thing but for the settings
  const retrieveSettings = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('Dark mode')
      const confirmAdd = await AsyncStorage.getItem('Confirm adding a card')
      const confirmDelete = await AsyncStorage.getItem('Confirm deleting a card')
      
      dispatch(setDarkMode(darkMode == 1))
      dispatch(setConfirmAdd(confirmAdd == 1))
      dispatch(setConfirmDelete(confirmDelete == 1))
    } catch (err) {
      console.log(err)
    }
  }

  //Retrieves local storage on app startup
  useEffect(() => {
    retrieveCards()
    retrieveSettings()
  }, [])

  //Deletes a card from the redux state and local storage
  const deleteCard = (id) => {
    const updatedCards = cardCollection.filter(card => card.id !== id);
    dispatch(setCardCollection(updatedCards))
    storeCards(updatedCards)
  }

  return (
    <View style={[theme.container, { flex: 1 }]}>
      <TextInput 
        placeholder='Search'
        placeholderTextColor='grey'
        style={[theme.text, styles.searchBox]}
        value={search}
        autoComplete='off'
        onChangeText={query => setSearch(query)}
      />
      <Overlay visible={overlay}/>
      { cardCollection.length == 0 && 
        <Text style={[theme.text, styles.grayText]}>
          Your collection is empty
        </Text>
      }
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Array.isArray(cardCollection) && cardCollection.filter((card) => {
          return card.name.toLowerCase().includes(search)
        }).map(function(card) {
          return (
            <Pressable 
              style={{alignItems: 'center', width: '45%', padding: '2%', margin: '2%'}} 
              key={card.id}
              onPress={() => showCard(card)}
            >
              <PrayerCard 
                name={card.name} 
                image={card.image}
              />
              <DeleteButton deleteHandler={() => deleteCard(card.id)} cardName={card.name}/>
            </Pressable>
          )
        })}
      </ScrollView>
      { overlay && <PrayerCardView title={cardTitle} prayer={cardPrayer} image={cardImage}/> }
    </View>
  )
}