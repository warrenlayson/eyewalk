import { fireEvent } from '@testing-library/react-native'
import { render } from '../../test/wrapper'
import SignInScreen from '../SignInScreen'
const createTestProps = (props: Object) => ({
  navigation: {
    push: jest.fn(),
    navigate: jest.fn(),
  },
  ...props,
})

describe('Sign In Screen', () => {
  let props: any
  beforeEach(() => {
    props = createTestProps({})
  })
  test('should navigate to sign up', async () => {
    const { getByText } = render(<SignInScreen {...props} />)

    fireEvent.press(getByText('Sign up'))
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp')
  })

  test('should navigate to forgot password', async () => {
    const { getByText } = render(<SignInScreen {...props} />)

    fireEvent.press(getByText('Forgot your Password?'))
    expect(props.navigation.navigate).toHaveBeenCalledWith('ForgotPassword')
  })
})
