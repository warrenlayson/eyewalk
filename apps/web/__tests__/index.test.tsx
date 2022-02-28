import { render } from '@testing-library/react'
import React from 'react'
import Index from '../src/pages/index'

test('should render page successfully', async () => {
  const { baseElement } = render(<Index />)

  expect(baseElement).toBeTruthy()
})
