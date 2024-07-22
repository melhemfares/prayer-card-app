import React, { useState, useEffect, useCallback } from 'react'
import { 
  View, 
  TextInput, 
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native'

//Data and storage
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

//Custom components
import PrayerCard from './PrayerCard'
import PrayerCardView from './PrayerCardView'
import AddButton from './AddButton'
import Overlay from './Overlay'

//Styles
import styles from '../styles/styles'
import { COLOURS } from '../constants'

//Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { light, dark } from '../styles/theme'
import { toggleOverlay } from '../app/redux/overlay'
import { setCardCollection } from '../app/redux/cardCollection'

import { API_HOST } from '@env'
import { debounce } from 'lodash'

export default function Explore() {
  //State variables
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [cardTitle, setCardTitle] = useState('')
  const [cardPrayer, setCardPrayer] = useState('')
  const [cardImage, setCardImage] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(0)

  //Redux variables
  const { darkMode } = useSelector((state) => state.darkMode)
  const { overlay } = useSelector((state) => state.overlay)
  const { cardCollection } = useSelector((state) => state.cardCollection)
  const theme = darkMode ? dark : light

  const cardLimit = 10

  //Retrieve cards from database
  const fetchCards = async (search, page, limit) => {
    setLoading(true)
    
    try {
      const res = await axios.get(`${API_HOST}/api/card?search=${search}&page=${page}&limit=${limit}`)
      setCards(res.data.rows)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

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

  //Check to see if the card exists in the collection already
  function cardExistsInCollection (checkedCard) {
    return cardCollection.some((card) => card.id === checkedCard.id)
  }

  //Adds a new card to the redux state and local storage
  const addCard = (addedCard) => {
    if (cardExistsInCollection(addedCard)) {
      Alert.alert(
        'Hold on...',
        `${addedCard.name} card already exists in your collection.`
      )
    } else {
      const updatedCards = [...cardCollection, addedCard];
      dispatch(setCardCollection(updatedCards))
      storeCards(updatedCards)

      Alert.alert(
        'Success!',
        `${addedCard.name} card has been added!`
      )
    }
  }

  //Handles debounce (calls fetch)
  const searchCards = useCallback(debounce(fetchCards, 500), [])

  //Fetches cards from database when typing pauses for a bit
  useEffect(() => {
    searchCards(search.toLowerCase(), page, cardLimit)
  }, [search, page])

  //Handles refresh (puts it on 2 sec cooldown)
  const onRefresh = useCallback(() => {
    fetchCards(search.toLowerCase(), page, cardLimit)
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [search, page])

  return (
    <View style={[theme.container, { flex: 1 }]}>
      <Overlay visible={overlay}/>
      <TextInput 
        placeholder='Search'
        placeholderTextColor='grey'
        style={[theme.text, styles.searchBox]}
        value={search}
        autoComplete='off'
        onChangeText={query => setSearch(query)}
      />
      { loading ? (
        <ActivityIndicator 
          size="large" 
          color={darkMode ? COLOURS.darkPrimary : COLOURS.primary}
          style={{ position: 'absolute', top: '50%', left: '45%' }}
        />
      ) : ( 
        <>
          { cards.length === 0 && 
            <Text style={[theme.text, styles.grayText]}>
              No results found
            </Text>
          }
          <ScrollView 
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            } 
          >  
            {cards.map(function(card) {
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
                  <AddButton addHandler={() => addCard(card)} cardName={card.name}/>
                </Pressable>
              )
            })}
          </ScrollView>
          { overlay && <PrayerCardView title={cardTitle} prayer={cardPrayer} image={cardImage}/> }
        </> 
        )
      }
    </View>
  )
}