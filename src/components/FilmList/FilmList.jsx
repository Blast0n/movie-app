import './FilmList.css';
import Film from '../Film/Film';

export default function FilmList({ data }) {
  const el = data.map((item, i) => {
    if (i < 6) {
      return (
        <Film key={item.id} title={item.title} date={item.release_date} about={item.overview} img={item.poster_path} />
      );
    }
    return null;
  });
  return <ul className="film_list">{el}</ul>;
}
