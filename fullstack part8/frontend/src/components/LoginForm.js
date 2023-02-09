import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setPage, setFavGenre }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [ login, result ]  = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = (result.data.login.value)
      const favGenre = (result.data.login.favouriteGenre)
      setToken(token)
      setFavGenre(favGenre)
      localStorage.setItem('user-token', token)
      localStorage.setItem('user-favGenre', favGenre)
      setPage('authors')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input 
          type="text" 
          value={username} 
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input 
          type="text" 
          value={password} 
          name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm