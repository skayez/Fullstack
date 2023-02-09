import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const recommend = (props) => {
  const result_recommend = useQuery(ALL_BOOKS, { variables: { genre: props.favouriteGenre }})

  if (result_recommend.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favourite genre <b>{props.favouriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result_recommend.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default recommend