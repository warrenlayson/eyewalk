import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
export default function useRefreshOnFocus(refetch: Function) {
  const enbaledRef = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      if (enbaledRef.current) {
        refetch()
      } else {
        enbaledRef.current = true
      }
    }, [refetch]),
  )
}
