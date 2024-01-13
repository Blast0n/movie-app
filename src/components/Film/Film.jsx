import './Film.css';
import { format } from 'date-fns';

export default function Film({ title, date, about, img }) {
  const str = about.split(' ').slice(0, 30).join(' ');
  const imgSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${img}`;
  return (
    <li className="film_list__item">
      <img className="item__img" src={imgSrc} alt="" />
      <div className="item__info">
        <div className="item__title">{title}</div>
        <div className="item__date">{format(date, 'PP')}</div>
        <div className="item__genre">
          <span>Action</span>
          <span>Drama</span>
        </div>
        <div className="item__about">{`${str} ...`}</div>
      </div>
    </li>
  );
}
