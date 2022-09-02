import React, { useState } from "react";
import SearchContext from "./SearchContext";
const SearchProvider = (props) => {
  const [InputValue, setInputValue] = useState("");
  
  const SearchValueHandler = (Value) => {
    setInputValue(() => {
      return (Value);
    });
  };

  const searchContext = {
    InputValue: InputValue,
    SearchValueHandler: SearchValueHandler,
  };
  return (
    <SearchContext.Provider value={searchContext}>
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
