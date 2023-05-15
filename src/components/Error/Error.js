import { Link } from 'react-router-dom'

import '../Homepage/Homepage.css'

const Error = () => {
  return (
    <div className="homepage">
      <h1>Sorry, page not found</h1>
      <button className="homepage-btn">
        <Link to="/" className="homepage-btn-link">
          Back to Homepage
        </Link>
      </button>
    </div>
  )
}
export default Error
