import { useEffect, useState } from 'react';

import FilmList from './components/FilmList/FilmList';
import getData from './api';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDlhYmE5OTRhMjI5NjU2YjQzYTE3YzIyYjY4YzY1MiIsInN1YiI6IjY1OWYzZjAyZGFmNTdjMDEyYmMwZTRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zRvw619wPtgBhz-UY-yf5iIO70Jesc3rpZY0z-Pnro',
    },
  };

  const url = 'https://api.themoviedb.org/3/search/movie?query=Terminator&include_adult=false&language=en-US&page=1';

  useEffect(() => {
    getData(url, options)
      .then((body) => {
        setData(body.results);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return <FilmList data={data} />;
}

export default App;
