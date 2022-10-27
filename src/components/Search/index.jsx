import React from "react";
import AppContext from "../../context";
import debounce from'lodash.debounce';
import styles from "./Search.module.scss";

const testDebounce = debounce(() => {
  console.log("HELLO")
}, 500);

const Search = () => {
    
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    // document.querySelector('input').focus();
    inputRef.current.focus();
  };
  const onChangeInput = (e) => {
    setSearchValue(e.target.value)
    testDebounce()
  };
  
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
          fill="#6563ff"
        />
      </svg>
      <input
        ref={inputRef}
        // onChange={(e) => setSearchValue(e.target.value)}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchValue}
      />

      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          color="#2329D6"
          fill="none"
          stroke="#2329D6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="closeIconTitle" />
          <path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575" />
        </svg>
      )}
    </div>
  );
};

export default Search;
