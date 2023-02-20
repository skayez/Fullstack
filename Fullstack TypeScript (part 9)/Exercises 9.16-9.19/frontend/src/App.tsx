import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios, {AxiosError} from 'axios'

interface Diary {
  id: number,
  date: string,
  visibility: string,
  weather: string
}

const NewEntry = ({ diary, setDiary }: { diary: Diary[], setDiary: Dispatch<SetStateAction<Diary[]>>}) => {
  const [error, setError] = useState('')

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const result = await axios.post('api/diaries', { date: date, visibility: visibility, weather: weather, comment: comment })
      setDiary(diary.concat(result.data))
    } catch (value) {
      const error = value as AxiosError
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input type="date" id="date" min="2000-01-01" max="2050-12-31" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          visibility
          great <input type="radio" name="visibility" onChange={() => setVisibility('great')} />
          good <input type="radio" name="visibility" onChange={() => setVisibility('good')} />
          ok <input type="radio" name="visibility" onChange={() => setVisibility('ok')} />
          poor <input type="radio" name="visibility" onChange={() => setVisibility('poor')} />
        </div>
        <div>
          weather
          sunny <input type="radio" name="weather" onChange={() => setWeather('sunny')} />
          rainy <input type="radio" name="weather" onChange={() => setWeather('rainy')} />
          cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy')} />
          stormy <input type="radio" name="weather" onChange={() => setWeather('stormy')} />
          windy <input type="radio" name="weather" onChange={() => setWeather('windy')} />
        </div>
        <div>
          comment
          <input id='comment' value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button id="add" type="submit">
          add
        </button>
      </form>
    </div>
  )
}

const DiaryEntry = ({ diary }: { diary: Diary[] }) => {
  return (
    <div>
      {diary.map((value =>
        <div key={value.id}>
          <h3>{value.date}</h3>
          visibility: {value.visibility}<br/>
          weather: {value.weather}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [diary, setDiary] = useState<Diary[]>([])

  useEffect(() => {
    const getDiaries = async () => {
      const request = await axios.get('api/diaries')
      return request.data
    }

    getDiaries()
      .then(value => setDiary(value))
  }, [])

  return (
    <div>
      <h2>Add new entry</h2>
      <NewEntry diary={diary} setDiary={setDiary}/>
      <h2>Diary entry</h2>
      <DiaryEntry diary={diary} />
    </div>
  )
};

export default App;