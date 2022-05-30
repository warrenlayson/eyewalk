import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import ContentLoader from 'react-native-easy-content-loader'
import MapView, { Marker } from 'react-native-maps'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import useDevice from '../hooks/useDevice'
import useMe from '../hooks/useMe'
import { RootStackScreenProps } from '../types'

export default function DeviceDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<'DeviceDetail'>) {
  const meQuery = useMe()

  const [subscribed, setSubscribed] = React.useState(false)
  const [interval, setInterval] = React.useState(3000)

  const { data, isLoading, isRefetching } = useDevice(
    meQuery.data?.id ?? '',
    route.params.id,
    {
      refetchInterval: subscribed ? interval : subscribed,
    },
  )

  const map = React.useRef<MapView>(null)
  const colorScheme = useColorScheme()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.description ?? 'Device Detail',
      headerRight: () => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => setSubscribed(!subscribed)}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          >
            <View>
              <FontAwesome
                name={subscribed ? 'pause' : 'play'}
                color={Colors[colorScheme].text}
                size={20}
              />
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('EditDevice', { id: data?.id ?? '' })
            }
            style={({ pressed }) => ({
              marginLeft: 20,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View>
              <FontAwesome
                name="edit"
                color={Colors[colorScheme].text}
                size={20}
              />
            </View>
          </Pressable>
        </View>
      ),
    })

    return () => {}
  }, [navigation, data, subscribed])

  React.useEffect(() => {
    if (data) {
      setInterval(data.metadata.responseTime)

      if (map.current) {
        map.current.animateToRegion({
          latitude: data.metadata.latitude ?? 0,
          longitude: data.metadata?.longitude ?? 0,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        })
      }
    }

    return () => {}
  }, [isRefetching, data])

  return (
    <View style={styles.container}>
      <ContentLoader
        active
        loading={isLoading}
        containerStyles={{
          position: 'relative',
        }}
      >
        <MapView
          ref={map}
          style={styles.map}
          initialRegion={{
            latitude: data?.metadata?.latitude ?? 0,
            longitude: data?.metadata?.longitude ?? 0,
            longitudeDelta: 0.0001,
            latitudeDelta: 0.0001,
          }}
        >
          <Marker
            coordinate={{
              latitude: data?.metadata?.latitude ?? 0,
              longitude: data?.metadata?.longitude ?? 0,
            }}
            title={
              data?.metadata?.caneUser?.firstName +
              ' ' +
              data?.metadata?.caneUser?.lastName
            }
            description={data?.description}
          />
        </MapView>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={[
              {
                backgroundColor: '#fff',
                width: '90%',
                borderRadius: 10,
                display: 'flex',
                padding: 20,
                shadowColor: '#888',
              },
              styles.shadowProp,
            ]}
          >
            <View style={styles.detailsContainer}>
              <Text>Heart rate: {data?.metadata.pulse} bpm</Text>
              <Text>Battery Level: {data?.metadata.batteryLevel}%</Text>
            </View>
            <View style={{ padding: 10 }} />
            <View style={styles.detailsContainer}>
              <Text>{data?.description}</Text>
              <Text>System status</Text>
            </View>
          </View>
        </View>
      </ContentLoader>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shadowProp: {
    elevation: 20,
    shadowColor: '#52006A',
  },
})
