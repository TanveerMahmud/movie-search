import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FilmRow.css'

const FilmRow = ({ film, faves, setFaves }) => {
  const { id, title, poster_path, release_date } = film
  const posterURL = `https://image.tmdb.org/t/p/w780${poster_path}`
  const filmYear = new Date(release_date).getFullYear()
  const [isAddActive, setIsAddActive] = useState(
    !faves.some((fave) => fave === film)
  ) //state for showing either add_to_queue or remove_from queue btn. When the component renders, it checks for every film if it is in the faves or not. If it is, it return true and if not returns false. This way, the add_to_queue button does not replace remove_from_queue button when film year is changed or load more is clicked.

  const handleFaves = () => {
    const index = faves.indexOf(film)
    if (index === -1) {
      setFaves([...faves, film])
    } else {
      const updatedFaves = [...faves]
      updatedFaves.splice(index, 1)
      setFaves(updatedFaves)
    }
    setIsAddActive(!isAddActive)
  }

  return (
    <>
      <div className="FilmRow">
        <img src={posterURL} alt={`${title} film poster`} />
        <div className="film-summary">
          <h3>{title}</h3>
          <p>{filmYear}</p>
          <div className="actions">
            {isAddActive ? (
              <button className="action">
                <span
                  className="material-icons"
                  title="add to faves"
                  onClick={handleFaves}
                >
                  add_to_queue
                </span>
              </button>
            ) : (
              <button className="action">
                <span
                  className="material-icons"
                  title="remove from faves"
                  onClick={handleFaves}
                >
                  remove_from_queue
                </span>
              </button>
            )}

            <Link to={`/films/${id}`} className="action">
              <span className="material-icons" title="read more">
                read_more
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default FilmRow
