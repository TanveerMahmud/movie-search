import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FilmLibrary from '../FilmLibrary/FilmLibrary'
import Homepage from '../Homepage/Homepage'
import Error from '../Error/Error'
import FilmDetail, { FilmDetailEmpty } from '../FilmDetail/FilmDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/films" element={<FilmLibrary />}>
          <Route path="" element={<FilmDetailEmpty />} />
          <Route path=":filmID" element={<FilmDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
