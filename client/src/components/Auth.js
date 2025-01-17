import { useState } from 'react'
import { useCookies } from 'react-cookie'
const Auth = () => {
    const [cookies, setCookies, removeCookies] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState('null')
    const [password, setPassword] = useState('null')
    const [confirmPass, setConfirmPass] = useState('null')
    const [error, setError] = useState(null)


    console.log(cookies)
    const viewLogin = (status) => {
      setError(false)
      setIsLogin(status)
    }



    const handleSubmit = async (e, endpoint) => {
      e.preventDefault()
      if (!isLogIn && password !== confirmPass) {
        setError('Make sure passwords match!')
        return
      }

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})

      })
      const data = await response.json()
      console.log(data)

      if (data.detail) {
        setError(data.detail)
      } else {
        setCookies('Email', data.email)
        setCookies("AuthToken", data.token)
        window.location.reload()
      }
    }



    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <h1>Macrosoft To Do</h1>

          <form>
            <h2> {isLogIn ? 'Log In!': 'Sign Up!'}</h2>
            <input 
              type='email' 
              placeholder='email' 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type ='password' 
              placeholder = 'password'
              onChange={(e) => setPassword(e.target.value)}
            
            />
            { !isLogIn && 
              <input 
                type ='password' 
                placeholder = 'confirm password'
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            }
            <input type='submit' className='create' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
            {error && <p>{error}</p>}
          </form>

          <div className='auth-options'>
            <button 
              onClick={() => viewLogin(false)}
              style={{backgroundColor: !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Sign Up</button>
            <button 
              onClick={() => viewLogin(true)}
              style={{backgroundColor: isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Login</button>
          </div>

        </div>
      </div>
    )
  }
  
  export default Auth;