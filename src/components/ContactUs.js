import React from 'react'

const ContactUs = () => {
  return (
    <>
    <section>
        <div className='--my2 --py2 --p --center-all'>
          <h1 className="--text-center --fw-bold --spacing-text --text-underline --p --my">Contact us</h1>
          <div className="card-contact --text-center --width-50">
          <div className="card-body">
            <h3 className="card-title">Reach out to us</h3>
            <p className="card-text --p --m">
              Feel free to mail us, any time of the day, <br /> Click on the
              button below to connect now!
              </p>
              <div className='--center-all --p --my'>
              <button
                  className='--btn --btn-lg --btn-primary'>
                  <a href="mailto:ketaki@tank.ooo" className='--text-light'>Send mail</a></button>
              </div>
          </div>
        </div>
          </div>
    </section>

      </>
  )
}

export default ContactUs