import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import About from './components/About';
import Features from './components/Features';
import ContactUs from './components/ContactUs';
import LoginSignup from './components/LoginSignup';
import NotFound from './components/NotFound';
import StockContext from './context/StockContext';
import { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import StockDashboard from './components/dashboard/StockDashboard';
import  { ShowOnLoginDash } from './components/hiddenLinks/hiddenLink';
import Portfolio from './components/Portfolio';
const day = new Date();
const year = day.getFullYear();

function App() {
  const [stockSymbol, setStockSymbol] = useState("FB");
  const [darkMode, setDarkMode] = useState(false);
  // const username = useSelector(selectUsername);
  return (
    
    <>
    <div className="App">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/stockmarket-simulator" element={<Home/>}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features/>}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/dashboard" element={<ShowOnLoginDash><ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
                <StockDashboard />
      </StockContext.Provider>
     </ThemeContext.Provider></ShowOnLoginDash>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          </Routes>
          <footer className='--flex-center --text-center --p footer'>
        <p className='--fw-thin --text-light'>Copyright © {year}</p>
    </footer>
      </BrowserRouter>
      
      </div>
    </>
  );
}

export default App;
