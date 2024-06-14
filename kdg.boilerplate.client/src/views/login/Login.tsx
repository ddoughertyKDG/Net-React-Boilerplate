import { Row, Col, AsyncButton, useAppNavigation } from 'kdg-react'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { ROUTE_PATH } from '../../routing/AppRouter'

export const Login = () => {

  const [loading,setLoading] = useState(false)

  const {login,user} = useAuthContext()
  const navigate = useAppNavigation()

  useEffect(() => {
    if (user){
      navigate(ROUTE_PATH.Home)
    }
  },[user])

  const handleLogin = async () => {
    setLoading(true)
    try {
      // add your custom login functionality here
      await new Promise(resolve => resolve(
        login({
          id:'example-id',
          jwt:'example-jwt',
        })
      ))
    } catch (e) {
      console.error('unable to login:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // in case your form isnt wrapped, this will alos submission via the enter key
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keydown', handleEnterKey)

    return () => {
      window.removeEventListener('keydown', handleEnterKey)
    }
  }, [handleLogin])

  return (
    <>
      <div>
        <Row>
          <Col>
            <AsyncButton
              loading={loading}
              onClick={handleLogin}
            >
              Login
            </AsyncButton>  
          </Col>
        </Row>
      </div>
    </>
  )
}