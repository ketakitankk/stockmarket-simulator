import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import StockContext from '../../context/StockContext';
import { fetchQuote, fetchStockDetails } from '../../utils/api/stock-api';
// import Chart from './Chart';
import Details from './Details'
import Header from './Header';
import Overview from "./Overview"
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const StockDashboard = () => {
    const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [coins, setCoins] = useState(10000);
    const { stockSymbol } = useContext(StockContext);
    // const username = useSelector(selectUsername);
  // console.log(username);
  const email = useSelector(selectEmail);
  const [quantity, setQuantity] = useState("");
  // const dispatch = useDispatch();
  // console.log(email);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) { 
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
  };

  updateStockDetails();
  updateStockOverview();
  }, [stockSymbol]);
  
  useEffect(() => {
    const getCoins = async () => {
      const q = query(collection(db, "user-transactions"), where("email", "==", email));
      let totalPrice = 0;
      setCoins(10000);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        totalPrice = totalPrice + doc.data().price
        // doc.data() is never undefined for query doc snapshots
      });
      // console.log(totalPrice);
      setCoins(coins - totalPrice);
    }
  
    getCoins();
  }, []);
  
  const deleteFromDB = async (stockName, quantity, currentQoute) => {
    if (stockName === undefined) {
      alert("Please enter stock name!");
    }
    else if (quantity === "") {
      alert("Please enter quantity!");
    }
    const q = query(collection(db, "user-transactions"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (d) => {
      const docRef = doc(db, "user-transactions", d.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (d.data().name === stockName) {
          console.log(d.data());
          let newAmount = 0;
          let newPrice = 0;
          // check quantity of stock
          if (parseInt(d.data().amount) >= quantity) {
            let id = d.id;
            newAmount = parseInt(d.data().amount) - quantity;
            newPrice = parseInt(d.data().price) - parseInt(currentQoute) * parseInt(quantity);
            console.log(newPrice);
            if (newAmount === 0) {
              console.log("Got to delete!" + d.id);
              await deleteDoc(doc(db, "user-transactions", d.id));
              alert("Sold and removed from portfolio!")
            } else {
              const cityRef = doc(db, 'user-transactions', id);
              setDoc(cityRef, { amount: newAmount, price: newPrice }, { merge: true });
              alert("Sold! :)");
            }
          } else if (doc.data().amount < quantity || parseInt(doc.data().amount) !== 0) {
            alert("You don't have that much quantity!");
          }
        }
      } else {
        console.log("Hello");
        alert("First buy!");
      }
    });
  }
  const addToCart = async (stockName, qoute, quantity) => {
    if (coins <= 0) {
      alert("Oops.. you cannot trade! Look at your virtual coins...");
    }
    if(quantity === ""){
      quantity = 1
    }
    const price = parseInt(qoute) * parseInt(quantity);
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    let countOfStock = 0;
    const information = {
      email,
      name: stockName,
      qoute: qoute,
      amount: quantity,
      // coins: coinsLeft,
      price,
      date,
      time
      // createdAt: Timestamp.now().toDate()
    }

    const q = query(collection(db, "user-transactions"), where("email", "==", email));
    let id = "";
    let newPrice = 0;
    let newAmount = parseInt(quantity);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().name === stockName) {
        countOfStock = countOfStock + 1;
        console.log(doc.id);
        id = doc.id;
        newAmount = newAmount + parseInt(doc.data().amount);
        newPrice = price + parseInt(doc.data().price);
        // console.log(doc.id, " => ", doc.data());
      }
    });


    if (countOfStock === 0) {
      const docRef = await addDoc(collection(db, "user-transactions"), information);
      // console.log("Document written with ID: ", docRef.id);
      alert("Bought! :)");
    }
    else {
      //update code
      // console.log(countOfStock);
      const cityRef = doc(db, 'user-transactions', id);
      setDoc(cityRef, { amount: newAmount, price: newPrice }, { merge: true });
      alert("Added quantity to portfolio! :)");
      
    }
    // dispatch(ADD_TO_CART(information));
    
    // dispatch(CLEAR_CART());
}



    
    // console.log(username);
  return (
      <>
          <div><h1 className='helloUser'>
              Welcome to your dashboard</h1></div>
          <div
          className={`dashboard --flex-center h-screen grid md:grid-cols-2 grid-rows-8 md:grid-rows-7 xl:grid-rows-3 auto-rows-fr gap-4 p-10 font-quicksand bg-neutral-100
            `}

        >
          <div className="--flex-center --text-sm col-span-2 md:col-span-2 xl:col-span-3 row-span-2 flex justify-start items-center">
            <Header name={stockDetails.name} />
        </div>

        <div class="--flex">
              <div class="input-group-text --text-sm" id="btnGroupAddon">Quantity</div>
              <input type="text" class="--form-control --text-sm" placeholder="Enter quantity"
           value={quantity} onChange={(e) => {
                setQuantity(e.target.value)
            }}
              />
          </div>
              <Card>
          <div>
              <Details details={stockDetails} />
                  </div>
        </Card>
        <p className="--text-md">Coins: {coins}</p>
          </div>
          <div className='--flex-center overview'>
              <Card>
              <Overview
                symbol={stockSymbol}
              COST={quote.pc}
              change={quote.d}
              changePercent={quote.dp}
            currency={stockDetails.currency}
                  />
                  </Card>
          </div>
          <div className='--flex-center buttons'>
              <button className='--btn --btn-success btn' onClick={() => addToCart(stockDetails.name, quote.pc, quantity)}>Buy</button>
              <button className='--btn --btn-danger btn' onClick={() => deleteFromDB(stockDetails.name, quantity, quote.pc)}>Sell</button>
          </div>

      <div>
        <center>
          <a className='link' href="https://www.google.com" target="_blank" rel='noreferrer'
            style={{ position: "relative", top: 80}}>Link to prediction</a>
          </center>
                </div>
    </>
  )
}

export default StockDashboard