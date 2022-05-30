import renderer from 'react-test-renderer'
import SignInForm from '../SignInForm'
describe('Sign in form', () => {
  test('should render correctly', async () => {
    const onSignIn = jest.fn()
    const onForgotPassword = jest.fn()
    const tree = renderer.create(
      <SignInForm onSignIn={onSignIn} onForgotPassword={onForgotPassword} />,
    )

    expect(tree).toMatchSnapshot()
  })
})
