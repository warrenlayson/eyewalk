import NetInfo from '@react-native-community/netinfo'
import React from 'react'
import { Platform } from 'react-native'
import { onlineManager } from 'react-query'

export function useOnlineManager() {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener(state => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable),
        )
      })
    }
  }, [])
}
