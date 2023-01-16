import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { selectEmail } from '../redux/slice/authSlice';
import "./Portfolio.css"

const PortfolioTable = () => {
    const email = useSelector(selectEmail);
    const [isLoading, setIsLoading] = useState(true);
    // const commodity = [];
    const [commodity] = useState([]);

    const fetchPost = async () => {
        const q = query(collection(db, "user-transactions"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data());
            commodity.push(doc.data());
        });
        setIsLoading(false);
        // console.log(commodity);
    }

    fetchPost();
    if (!isLoading) {
        // console.log(commodity);
        return (
            <div>
                <h1 className='portfolio-heading head --text-underline'>Portfolio
                </h1>
                <div className='table'>
                <Table striped bordered responsive hover size="lg">
                    <thead>
                        <tr>
                            <th>Stock Name</th>
                            <th>Quantity</th>
                            <th>Earnings</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commodity.map((c) => {
                            return (
                                <tr>
                                    <td>{ c.name }</td>
                                    <td>{ c.amount }</td>
                                    <td>{ c.price }</td>
                                    <td>{ c.date }</td>
                        </tr>
                            )
                        })}
                    </tbody>
                    </Table>
                    </div>
                
            </div>
        )
    } else {
        return (
            <div>
                <h1 className='portfolio-heading head --text-underline'>Portfolio
                </h1>
                <h1 className='loader head'>Loading....</h1>
            </div>
        )
    }
}

export default PortfolioTable