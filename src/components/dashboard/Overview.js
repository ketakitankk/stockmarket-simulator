import React from "react";
import Card from "./Card";

const Overview = ({ symbol, COST, change, changePercent }) => {
  // const [coins, setCoins] = useState(10000);

  return (
    <Card>
      <span className="--text-md absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className="w-full h-full flex items-center justify-around">
        <span className="--text-lg flex items-center">
          {COST}
          <span className="text-2l xl: --text-2xl 2xl:text-2xl text-neutral-400 m-2">
            {/* {currency} */} coins
          </span>
        </span>
        <span
          className={`--text-sm xl:text-md 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change} change <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
