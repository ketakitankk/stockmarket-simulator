import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <section className='about-us'>
        <div className='--my2 --py2 --p --text-center'>
        <h1 className="--text-center --fw-bold --spacing-text --p --my">Oops... Page not found</h1>
          <Link to="/" className='--text-center --m --p'>Go back home!</Link>
        </div>
    </section>

      </>
  )
}

export default NotFound