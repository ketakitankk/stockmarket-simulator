import React from 'react'
import "./Portfolio.css"
import PortfolioTable from './PortfolioTable'

const Portfolio = () => {
    return (
        <div className='--flex-center'>
                    <center>
                {/* <p className='data'>{JSON.stringify(commodity, undefined, 2)}</p> */}
               
                        <PortfolioTable/>
                    </center>   
                </div>
               
        )
 
                      
       
}

export default Portfolio