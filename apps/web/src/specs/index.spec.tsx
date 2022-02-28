import { render } from '@testing-library/react'
import React from 'react'
import Index from '../pages/index'

describe('Index', () => {
  test('should render successfully', async () => {
    const { baseElement } = render(<Index />)

    expect(baseElement).toBeTruthy()
  })
})
