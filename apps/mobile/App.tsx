import { StatusBar } from 'expo-status-bar'
import { AppStateStatus, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { focusManager, QueryClient, QueryClientProvider } from 'react-query'
import useAppState from './src/hooks/useAppState'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import { useOnlineManager } from './src/hooks/useOnlineManager'
import Navigation from './src/navigation'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  useOnlineManager()

  useAppState(onAppStateChange)

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    )
  }
}
