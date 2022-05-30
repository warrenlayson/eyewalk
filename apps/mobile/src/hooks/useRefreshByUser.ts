import React from 'react'

export default function useRefreshByUser(refetch: Function) {
  const [isRefetchingByUser, setIsRefetchByUser] = React.useState(false)

  const refetchByUser = React.useCallback(async () => {
    setIsRefetchByUser(true)
    try {
      await refetch()
    } finally {
      setIsRefetchByUser(false)
    }
  }, [])

  return {
    isRefetchingByUser,
    refetchByUser,
  }
}
