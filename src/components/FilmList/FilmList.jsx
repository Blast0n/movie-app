import { Pagination } from 'antd';

// eslint-disable-next-line
import Film from '../Film/Film';
import './FilmList.css';

export default function FilmList({ data, current, userRating, totalResults, onChange, addRating }) {
  let loaded = false;
  let el = null;

  if (data.length !== 0) {
    loaded = true;
    el = data.map((item) => {
      return (
        <Film
          key={item.id}
          id={item.id}
          genre={item.genre_ids}
          rating={userRating[item.id]}
          title={item.title}
          date={item.release_date}
          about={item.overview}
          avgRating={item.vote_average}
          img={item.poster_path}
          addRating={addRating}
        />
      );
    });
  }

  return (
    <ul className="film_list">
      {el}
      {loaded ? (
        <Pagination current={current} onChange={onChange} total={totalResults} pageSize={20} showSizeChanger={false} />
      ) : null}
    </ul>
  );
}
