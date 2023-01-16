import React from 'react'
import "./Features.css"
import plus from "../images/featurePlus.svg"

const Features = () => {
  return (
    <>
    <section>
        <div className='--my2 --p'>
          <h1 className="--text-center --fw-bold --spacing-text
           --text-underline --p">
            Features
          </h1>
          <div className="--flex-between">
            <img src ={plus} alt="plus" className='plus'></img>
            <p className='--flex-between --p'>stockSim provides real-time stock prices for it's users, <br></br>maintains a leaderboard <br></br> &
              promises analysis & prediction of the best stock to buy!
            </p></div>
        </div>
    </section>
    </>
  )
}

export default Features