import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const genreList = []

  props.data.map((value) => 
  value.genres.map((value) => {
    if (!genreList.includes(value)) {
      genreList.push(value)
    }})
  )

  const result_genre = useQuery(ALL_BOOKS, { variables: { genre: genre }})

  if (result_genre.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {(!genre) &&
      <p>Currently genre <b>all genres</b> selected.</p>
      }
      {(genre) &&
      <p>Currently genre <b>{genre}</b> selected.</p>
      }
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result_genre.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button key={'allgenres'} onClick={() => setGenre('')}>all genres</button>
      {genreList.map((value) => (
        <button key={value} onClick={() => setGenre(value)}>{value}</button>
      ))}
    </div>
  )
}

export default Books
