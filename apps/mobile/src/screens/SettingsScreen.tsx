import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { SectionList, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { RootStackParamList, RootStackScreenProps } from '../types'

type ListItemDataBasics = {
  title: string
  type: 'Navigation' | 'Toggle'
}

type ListItemDataNavigation = ListItemDataBasics & {
  name: React.ComponentProps<typeof FontAwesome>['name']
  type: 'Navigation'
  navigateTo: keyof RootStackParamList
}

type ListItemDataToggle = ListItemDataBasics & {
  type: 'Toggle'
  value: boolean
}

type ListItemData = ListItemDataNavigation | ListItemDataToggle

type ListItem = {
  title: string
  name: React.ComponentProps<typeof FontAwesome>['name']
  data: ListItemData[]
}

const SettingsScreen = ({ navigation }: RootStackScreenProps<'Settings'>) => {
  const colorScheme = useColorScheme()
  const [sections, setSections] = React.useState<ListItem[]>([
    {
      title: 'Account',
      data: [
        {
          title: 'Edit Profile',
          name: 'chevron-right',
          type: 'Navigation',
          navigateTo: 'EditProfile',
        },
        {
          title: 'Change Password',
          name: 'chevron-right',
          type: 'Navigation',
          navigateTo: 'SettingsChangePassword',
        },
      ],
      name: 'user-o',
    },
    {
      title: 'Notifications',
      data: [
        {
          title: 'Notifications',
          value: true,
          type: 'Toggle',
        },
        {
          title: 'App Notifications',
          value: true,
          type: 'Toggle',
        },
      ],
      name: 'bell-o',
    },
  ])

  const toggleSwitch = (index: number, value: boolean) => {
    const previousSections = [...sections]
    // notifications
    let data = previousSections[1].data[index] as ListItemDataToggle
    data.value = value

    previousSections[1].data[index] = data

    setSections(previousSections)
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({ item, index }) =>
          item.type === 'Navigation' ? (
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() => navigation.navigate(item.navigateTo)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.item}>{item.title}</Text>
                <FontAwesome
                  name={item.name}
                  size={14}
                  color={Colors[colorScheme].text}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{item.title}</Text>
              <Switch
                value={item.value}
                onValueChange={value => toggleSwitch(index, value)}
                thumbColor={item.value ? '#f5dd4b' : '#f4f3f4'}
                trackColor={{ false: '#ddd', true: '#81b0ff' }}
              />
            </View>
          )
        }
        renderSectionHeader={({ section }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              borderBottomColor: '#ccc',
            }}
          >
            <FontAwesome
              name={section.name}
              size={20}
              style={{ marginRight: 5 }}
              color={Colors[colorScheme].text}
            />
            <Text style={styles.sectionHeader}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index + ''}
      />

      <Button title="Logout" onPress={() => {}} />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  item: {
    fontSize: 14,
  },
})
