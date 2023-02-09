import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [favGenre, setFavGenre] = useState(null)
  const [page, setPage] = useState('authors')
  
  const result_authors = useQuery(ALL_AUTHORS)
  const result_books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  
  if (result_authors.loading || result_books.loading ) {
    return <div>loading...</div>
  }

  if (!favGenre && token) {
    localStorage.getItem('user-favGenre')
  }

  const logout = () => {
    setToken(null)
    setFavGenre(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      {!token && <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>log in</button>
      </div>
      }

      {token && <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>log out</button>
      </div>
      }

      {page === 'authors' &&
      <Authors data={result_authors.data.allAuthors} token={token}/>
      }
      {page === 'books' &&
      <Books data={result_books.data.allBooks} />
      }
      {page === 'add' &&
      <NewBook />
      }
      {page === 'login' &&
      <LoginForm setToken={setToken} setPage={setPage} setFavGenre={setFavGenre} />
      }
      {page === 'recommend' &&
      <Recommend favouriteGenre={favGenre} />
      }
    </div>
  )
}

export default App
