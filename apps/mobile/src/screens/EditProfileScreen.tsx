import { UserWithoutPasswordType } from 'api/src/routes/users/types'
import type { UpdateUserType } from 'api/src/routes/users/update-user'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import EditProfileForm from '../components/EditProfileForm'
import { View } from '../components/Themed'
import useMe from '../hooks/useMe'
import axios from '../lib/axios'
import { RootStackScreenProps } from '../types'

const updateUser = (
  id: string,
  data: UpdateUserType,
): Promise<UserWithoutPasswordType> =>
  axios.put(`/users/${id}`, data).then(data => data.data)

const EditProfileScreen = ({
  navigation,
}: RootStackScreenProps<'EditProfile'>) => {
  const me = useMe()

  const qc = useQueryClient()
  const mutation = useMutation(
    (data: UpdateUserType) => updateUser(me.data?.id ?? '', data),
    {
      onMutate: async data => {
        await qc.cancelQueries('me')

        const previousData = qc.getQueryData<UserWithoutPasswordType>('me')

        qc.setQueryData('me', () => ({ ...previousData, ...data }))

        return { previousData }
      },
      onError: (err, newMe, ctx) => {
        if ((ctx as any)?.previousData) {
          qc.setQueryData('me', (ctx as any).previousData)
        }
      },
      onSuccess: () => {
        qc.invalidateQueries('me')
        navigation.pop()
      },
    },
  )

  return (
    <View style={styles.container}>
      <EditProfileForm onEditProfile={mutation.mutate} />
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
