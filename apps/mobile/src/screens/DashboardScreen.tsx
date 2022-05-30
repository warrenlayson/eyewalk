import {
  DeviceWithMetadataWithCaneUserType,
  GetDevicesResponseType,
} from 'api/src/routes/devices/types'
import React from 'react'
import {
  FlatList,
  Pressable,
  PressableProps,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import ContentLoader from 'react-native-easy-content-loader'
import { useQuery } from 'react-query'
import Button from '../components/Button'
import { Text, View } from '../components/Themed'
import useMe from '../hooks/useMe'
import useRefreshByUser from '../hooks/useRefreshByUser'
import axios from '../lib/axios'
import { RootTabScreenProps } from '../types'

const getUserDevices = async (id: string): Promise<GetDevicesResponseType> =>
  axios.get(`/users/${id}/devices`).then(res => res.data)

export type ItemProps = {
  item: DeviceWithMetadataWithCaneUserType
} & PressableProps

const Item = ({ item, ...rest }: ItemProps) => (
  <Pressable
    {...rest}
    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
  >
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View style={styles.itemDetail}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {item.metadata.caneUser?.firstName +
            ' ' +
            item.metadata.caneUser?.lastName}
        </Text>
        <Text>Battery Level: {item.metadata.batteryLevel}%</Text>
      </View>
      <View style={styles.itemDetail}>
        <Text style={{ fontSize: 12 }}>
          Heart Rate: {item.metadata.pulse}bpm
        </Text>
        <Text style={{ fontSize: 12 }}>System Status: OK</Text>
      </View>
    </View>
  </Pressable>
)

export default function DashboardScreen({
  navigation,
}: RootTabScreenProps<'Dashboard'>) {
  const meQuery = useMe()

  const devicesQuery = useQuery('devices', () =>
    getUserDevices(meQuery.data?.id ?? ''),
  )

  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(
    devicesQuery.refetch,
  )

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text>Devices</Text>
        <Button
          title="Add new device"
          onPress={() => navigation.navigate('AddDevice')}
        />
      </View>

      <ContentLoader
        active
        loading={devicesQuery.isLoading}
        listSize={3}
        title={false}
        aShape="square"
        pRows={1}
        pHeight={60}
        pWidth={'100%'}
      >
        <FlatList
          data={devicesQuery.data}
          renderItem={({ item }) => (
            <Item
              item={item as DeviceWithMetadataWithCaneUserType}
              onPress={() =>
                navigation.navigate('DeviceDetail', { id: item.id })
              }
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          }
          keyExtractor={item => item.id}
        />
      </ContentLoader>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  headerButtons: {
    padding: 10,
    borderColor: '#121212',
    borderWidth: 1,
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
