import React from 'react'
import "./Home.css"
import arrow from "../images/upwardArrow.svg"
import {Link} from 'react-router-dom'
import  { ShowOnLogout } from './hiddenLinks/hiddenLink'

const Home = () => {
  return (
    <>
    <section className='heading'>
      <div className='--my2 --py2'>
        <h1 className="--text-center --fw-bold --spacing-text">Grab your chance</h1>
        <p className="--text-center --fw-med">to improve your <span className='--text-underline'>portfolio</span> now!</p>
      </div>
      <div className='arrow-button'>
        <center>
            <img src={arrow} alt="arrow" className='arrow'></img>
            <ShowOnLogout>
              <Link to="/login" className='--btn --btn-lg --btn-signup'>Sign up</Link>         
              </ShowOnLogout>  
            <h3 className='--p --text-center --fw-bold'>StockSim<span className='--color-red'>.</span></h3>
        </center>
      </div>
    </section>
      </>
  )
}

export default Home;