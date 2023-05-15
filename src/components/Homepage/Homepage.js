import { Link } from 'react-router-dom'
import './Homepage.css'

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to movie world</h1>
      <button className="homepage-btn">
        <Link to="/films" className="homepage-btn-link">
          Enter
        </Link>
      </button>
    </div>
  )
}

export default Homepage
