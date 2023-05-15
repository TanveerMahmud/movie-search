import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TMDB_API_KEY } from '../../TMDB'
import './FilmDetail.css'

const FilmDetail = () => {
  const params = useParams()
  const [film, setFilm] = useState([])

  const url = `https://api.themoviedb.org/3/movie/${params.filmID}?api_key=${TMDB_API_KEY}&language=en-US`
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((details) => setFilm(details))
      .catch(() => alert('Something is wrong! Please try again.'))
  }, [url])

  const { title, overview, poster_path, backdrop_path } = film
  const posterURL = `https://image.tmdb.org/t/p/w780${poster_path}`
  const backdropURL = `https://image.tmdb.org/t/p/w1280${backdrop_path}`

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={backdropURL} alt={`${title} backdrop`} />
        <h1 className="film-title">{title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={posterURL}
            className="film-detail-poster"
            alt={`${title} poster`}
          />
          {overview}
        </p>
      </div>
    </div>
  )
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export default FilmDetail

// -------------film project 2---------------
// function FilmDetail({ selectedFilm }) {
//   const { title, overview, poster_path, backdrop_path } = selectedFilm
//   const posterURL = `https://image.tmdb.org/t/p/w780${poster_path}`
//   const backdropURL = `https://image.tmdb.org/t/p/w1280${backdrop_path}`
//   return (
//     <div className="FilmDetail is-hydrated">
//       <figure className="film-backdrop">
//         <img src={backdropURL} alt={`${title} backdrop`} />
//         <h1 className="film-title">{title}</h1>
//       </figure>

//       <div className="film-meta">
//         <p className="film-detail-overview">
//           <img
//             src={posterURL}
//             className="film-detail-poster"
//             alt={`${title} poster`}
//           />
//           {overview}
//         </p>
//       </div>
//     </div>
//   )
// }
