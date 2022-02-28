import { render } from '@testing-library/react-native'
import App from './App'
describe('<App />', () => {
  test('should have 1 child', async () => {
    const { getByText } = render(<App />)
    const texts = getByText('Open up App.tsx to start working on your app!')

    expect(texts).toBeTruthy()
  })
})
