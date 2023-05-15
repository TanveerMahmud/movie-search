import { useEffect, useState } from 'react'

import { FilmDetailEmpty } from '../FilmDetail/FilmDetail'
import { TMDB_API_KEY } from '../../TMDB'
import FilmRow from '../FilmRow/FilmRow'

import './FilmLibrary.css'
import { Outlet } from 'react-router-dom'

function FilmLibrary() {
  const [films, setFilms] = useState([]) // no intial value causes error during map
  const [faves, setFaves] = useState([])
  const [isFaves, setIsFaves] = useState(0) //switches between 0: btn All active and 1: btn Faves active. true/false switches the button upon each click

  const currentYear = new Date().getFullYear()
  const [filmYear, setFilmYear] = useState(currentYear)
  const [page, setPage] = useState(1)

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${filmYear}&with_watch_monetization_types=flatrate`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ results }) =>
        setFilms((prevFilms) => [...prevFilms, ...results])
      ) //destructuring the data starightway
      .catch(() => alert('Something is wrong! Please try again.'))
  }, [url])

  const filmRowDisplay = (movies) =>
    movies.map((film) => (
      <FilmRow key={film.id} film={film} faves={faves} setFaves={setFaves} />
    ))

  const showYear = []
  for (let i = 1950; i <= currentYear; i++) {
    showYear.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button
            className={`film-list-filter ${isFaves === 0 ? 'is-active' : ''}`}
            onClick={() => setIsFaves(0)}
          >
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button
            className={`film-list-filter ${isFaves === 1 ? 'is-active' : ''}`}
            onClick={() => {
              setIsFaves(1)
            }}
          >
            FAVES
            <span className="section-count">{faves.length}</span>
          </button>
        </div>
        {isFaves === 0 && (
          <div className="choose-year">
            <label htmlFor="year" style={{ marginRight: '10px' }}>
              Choose movie year
            </label>
            <select
              name="year"
              id="year"
              defaultValue={filmYear}
              onChange={(e) => {
                setFilmYear(e.target.value)
                setPage(1)
                setFilms([])
              }}
            >
              {showYear}
            </select>
          </div>
        )}
        {isFaves === 0 ? (
          filmRowDisplay(films)
        ) : faves.length === 0 ? (
          <FilmDetailEmpty />
        ) : (
          filmRowDisplay(faves)
        )}

        <div className="load-more">
          {isFaves === 0 ? (
            <button
              className="load-more-btn"
              style={{ marginLeft: '5px' }}
              onClick={() => setPage((page) => page + 1)}
            >
              Load more
            </button>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default FilmLibrary
