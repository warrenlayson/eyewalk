import { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export default function useAppState(onChange: (arg0: AppStateStatus) => void) {
  useEffect(() => {
    AppState.addEventListener('change', onChange)

    return () => {
      AppState.removeEventListener('change', onChange)
    }
  }, [onChange])
}
