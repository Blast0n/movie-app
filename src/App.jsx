import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Spin, Alert, Space } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Offline, Online } from 'react-detect-offline';

// eslint-disable-next-line
import FilmList from './components/FilmList/FilmList';
import SearchBar from './components/SearchBar/SearchBar';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { getData, getGenre } from './api';

export const Context = React.createContext();

function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [mainPage, setMainPage] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [guestSession, setGuestSession] = useState('');
  const [userRating, setUserRating] = useState({});
  const [genre, setGenre] = useState({});
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    if (!guestSession) {
      fetch(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a49aba994a229656b43a17c22b68c652',
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setGuestSession(response.guest_session_id);
          getGenre(setGenre);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const addRating = (id, rating) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${rating}}`,
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=a49aba994a229656b43a17c22b68c652&guest_session_id=${guestSession}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          const newRating = {};
          newRating[id] = rating;
          setUserRating({ ...userRating, ...newRating });
        }
      })
      .catch((err) => console.error(err));
  };

  const getRatedFilms = (page) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    setLoad(true);
    setError(false);
    fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?api_key=a49aba994a229656b43a17c22b68c652&language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
        setLoad(false);
        setTotalResults(response.total_results);
        if (response.total_results === 0) {
          setError(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const debounceData = debounce((value, page) => {
    if (!value) {
      setData([]);
      setError(false);
    } else {
      setLoad(true);
      setError(false);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=a49aba994a229656b43a17c22b68c652&query=${value}&include_adult=false&language=en-US&page=${page}`;
      getData(url)
        .then((body) => {
          setSearchValue(value);
          setData(body.results);
          setTotalResults(body.total_results);
          setLoad(false);
          if (body.total_results === 0) {
            setError(true);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, 500);

  const onChange = (page) => {
    if (mainPage) {
      debounceData(searchValue, page);
    } else {
      getRatedFilms(page);
    }
    setCurrent(page);
  };

  const onChangeNav = (key) => {
    setMainPage((prev) => !prev);
    setData([]);
    setCurrent(1);
    if (key === '2') {
      getRatedFilms(1);
    } else {
      setError(false);
    }
  };

  let tabContent = null;

  if (mainPage) {
    tabContent = (
      <>
        <SearchBar debounceData={debounceData} setCurrent={setCurrent} />
        {load ? (
          <Spin className="spin" size="large" />
        ) : (
          <FilmList
            data={data}
            current={current}
            userRating={userRating}
            onChange={onChange}
            totalResults={totalResults}
            addRating={addRating}
          />
        )}
        {error && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert message="Film not found" type="error" />
          </Space>
        )}
      </>
    );
  } else {
    tabContent = (
      <>
        {load ? (
          <Spin className="spin" size="large" />
        ) : (
          <FilmList
            data={data}
            current={current}
            userRating={userRating}
            onChange={onChange}
            totalResults={totalResults}
            addRating={addRating}
          />
        )}
        {error && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert message="Oops, it seems like you haven't left any ratings yet" type="error" />
          </Space>
        )}
      </>
    );
  }

  return (
    <>
      <Online>
        <Navbar onChangeNav={onChangeNav} />
        <Context.Provider value={genre}>{tabContent}</Context.Provider>
      </Online>
      <Offline>
        <h1>You are offline right now. Check your connection</h1>
      </Offline>
    </>
  );
}

export default App;
