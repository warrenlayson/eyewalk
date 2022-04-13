import { DeviceWithMetadataWithCaneUserType } from 'api/src/routes/devices/types'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import ContentLoader from 'react-native-easy-content-loader'
import MapView, { Marker } from 'react-native-maps'
import { useQuery } from 'react-query'
import { Text, View } from '../components/Themed'
import useMe from '../hooks/useMe'
import axios from '../lib/axios'
import { RootStackScreenProps } from '../types'

const getDeviceById = async (
  userId: string,
  id: string,
): Promise<DeviceWithMetadataWithCaneUserType> =>
  axios.get('/users/' + userId + '/devices/' + id).then(res => res.data)

export default function DeviceDetailScreen({
  route,
}: RootStackScreenProps<'DeviceDetail'>) {
  const meQuery = useMe()
  const { data, isLoading } = useQuery(['device', route.params.id], () =>
    getDeviceById(meQuery.data?.id ?? '', route.params.id),
  )

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
          style={styles.map}
          initialRegion={{
            latitude: data?.metadata?.latitude ?? 0,
            longitude: data?.metadata?.longitude ?? 0,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
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
