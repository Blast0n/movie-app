import './SearchBar.css';
import { useState, useEffect } from 'react';

export default function SearchBar({ debounceData, setCurrent }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      debounceData(value, 1);
      setCurrent(1);
    }
  }, [value]);

  const newValue = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Type to search..."
        value={value}
        onChange={(event) => newValue(event)}
      />
    </div>
  );
}
