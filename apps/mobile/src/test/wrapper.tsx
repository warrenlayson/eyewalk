import { render } from '@testing-library/react-native'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TestRendererOptions } from 'react-test-renderer'

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <QueryClientProvider client={qc}>{children}</QueryClientProvider>
)

const customRender = (
  ui: React.ReactElement<any>,
  options?: TestRendererOptions,
) => render(ui, { wrapper: wrapper, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
