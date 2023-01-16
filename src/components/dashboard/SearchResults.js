import React, { useContext } from "react";
import StockContext from "../../context/StockContext";
// import ThemeContext from "../../context/ThemeContext";
import "./results.css";

const SearchResults = ({ results }) => {
  // const { darkMode } = useContext(ThemeContext);

  const { setStockSymbol } = useContext(StockContext);

  return (
    <ul
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            onClick={() => { setStockSymbol(item.symbol)}}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
            </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
