import React from "react";
// import NavigationBar from "./NavigationBar";
import Search from "./Search";

const Header = ({ name }) => {
  return (
    <>
      <div className="xl:px-20 --flex container">
        <h2 className="--text-md">{name}</h2>
        <span>
          <Search />
        </span>
        
      </div>
    </>
  );
};

export default Header;
