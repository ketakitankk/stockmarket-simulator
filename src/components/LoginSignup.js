import React from 'react'
import AuthContainer from './AuthContainer';

const LoginSignup = () => {
    return (
      <>
        <section>
          <center>
          <div className='--py2 --p --flex-center container --m main-container'>
        <h2 className="--text-left --fw-bold --p --m">
                        You're one step away from <br></br>
                        building your own <span className='--text-underline'>portfolio.</span>
                    </h2>
              <AuthContainer />         
        </div>
          </center>
  
    </section>
      </>
  )
}

export default LoginSignup;