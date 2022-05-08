import { MAPBOX_TOKEN } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import axios from 'axios'
import React, { useCallback, useMemo, useRef } from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native'
import MapView from 'react-native-maps'
import Button from '../components/Button'
import { Text, View } from '../components/Themed'
import { Feature, MapboxSearchResponse, RootStackScreenProps } from '../types'

export default function SetAddressScreen({
  route,
}: RootStackScreenProps<'SetAddress'>) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ['75%', '25%', '75%'], [])

  const [isExpanded, setExpanded] = React.useState(false)

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const [q, setQ] = React.useState('')

  const [results, setResults] = React.useState<Feature[]>([])

  console.log(results)

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])

  const onSearch = (value: string) => {
    setQ(value)

    if (value.length > 0) {
      axios
        .get<MapboxSearchResponse>(
          'https://api.mapbox.com/geocoding/v5/mapbox.places/' + q + '.json',
          {
            params: {
              access_token: MAPBOX_TOKEN,
              country: 'PH',
            },
          },
        )
        .then(res => {
          const data = res.data

          console.log(res.headers)

          setResults(data.features)
        })
    }
  }

  const renderItem: ListRenderItem<Feature> = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name="map-marker"
            size={20}
            style={{ marginRight: 20 }}
          />
          <View>
            <Text>{item.place_name}</Text>
            <Text></Text>
          </View>
        </View>
      </Pressable>
    ),
    [],
  )

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={1}
      >
        <View style={styles.contentContainer}>
          {isExpanded ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    handleSnapPress(1)
                    setExpanded(false)
                    setQ('')
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    paddingRight: 20,
                  })}
                >
                  <View>
                    <FontAwesome name="arrow-left" size={20} />
                  </View>
                </Pressable>
                <TextInput
                  value={q}
                  onChangeText={onSearch}
                  autoCompleteType="street-address"
                  placeholder="Search for address"
                  returnKeyType="search"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    flex: 1,
                    height: 40,
                    padding: 8,
                    borderRadius: 4,

                    backgroundColor: '#f7f7f7',
                  }}
                />
              </View>
              <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
            </>
          ) : (
            <>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Edit Base Address
              </Text>
              <Pressable
                onPress={() => {
                  handleSnapPress(0)
                  setExpanded(true)
                }}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                  }}
                >
                  <FontAwesome
                    name="map-marker"
                    size={20}
                    style={{ marginHorizontal: 20 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      Street
                    </Text>
                    <Text>City</Text>
                  </View>
                  <FontAwesome name="pencil" size={20} />
                </View>
              </Pressable>
            </>
          )}
        </View>
      </BottomSheet>
      {!isExpanded ? (
        <View
          style={{
            padding: 20,
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          }}
        >
          <Button title="Save and continue" onPress={() => {}} />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
})
