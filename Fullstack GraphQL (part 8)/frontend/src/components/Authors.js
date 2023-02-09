import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { UPDATE_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ authorEdit ] = useMutation(UPDATE_BIRTHYEAR, { 
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const authors = props.data

  const submit = async (event) => {
    event.preventDefault()
    authorEdit({ variables: { name, born }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {props.token && <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => (<option key={a.id} value={a.name}>{a.name}</option>))}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors
