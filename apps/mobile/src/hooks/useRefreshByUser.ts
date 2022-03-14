import React from 'react'

export default function useRefreshByUser(refetch: Function) {
  const [isRefetchingByUser, setIsRefetchByUser] = React.useState(false)

  async function refetchByUser() {
    setIsRefetchByUser(true)

    try {
      await refetch()
    } finally {
      setIsRefetchByUser(false)
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  }
}
