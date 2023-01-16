import React, { useContext, useState } from "react";
import StockContext from "../../context/StockContext";
import ThemeContext from "../../context/ThemeContext";
import { searchSymbol } from "../../utils/api/stock-api";

const Search = () => {
  const { darkMode } = useContext(ThemeContext);
  const [input, setInput] = useState("");

  // const [bestMatches, setBestMatches] = useState([]);
  const { setStockSymbol } = useContext(StockContext);

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        console.log(result[0]);
        setStockSymbol(result[0].symbol)
        // setBestMatches(result);
      }
    } catch (error) {
      // setBestMatches([]);
      console.log(error);
    }
  };

const clear = () => {
    setInput("");
    // setBestMatches([]);
  };

  return (
    <div
      className={`--flex-center relative z-50 w-96 ${
        darkMode ? "bg-white border-neutral-200" : "bg-gray-900 border-gray-800" 
      }`}
    >
      <input
        type="text"
        value={input}
        className={` --border w-full --px py-2 focus:outline-none rounded-md ${
          darkMode ? null : null
        }`}
        placeholder="Enter stock symbol"
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1 --btn --bg-dark --text-light --btn-sm">
          clear
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="--btn --btn-primary --btn-sm h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      >
        Search 
      </button>
      {/* {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null} */}
    </div>
  );
};

export default Search;
