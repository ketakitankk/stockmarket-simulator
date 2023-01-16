import React from "react";
// import ThemeContext from "../../context/ThemeContext";

const Card = ({ children }) => {
  // const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={` --m --p w-full h-full rounded-md relative p-8 border-2 bg-gray-900 text-gray-300`}
    >
      {children}
    </div>
  );
};

export default Card;
