const getData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Страница не найдена');
  }
  const body = await res.json();
  return body;
};

const getGenre = async (cb) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDlhYmE5OTRhMjI5NjU2YjQzYTE3YzIyYjY4YzY1MiIsInN1YiI6IjY1OWYzZjAyZGFmNTdjMDEyYmMwZTRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zRvw619wPtgBhz-UY-yf5iIO70Jesc3rpZY0z-Pnro',
    },
  };

  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then((response) => response.json())
    .then((response) => {
      const data = {};
      response.genres.forEach((el) => {
        data[el.id] = el.name;
      });
      cb(data);
    })
    .catch((err) => console.error(err));
};

export { getData, getGenre };
