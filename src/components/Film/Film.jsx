import './Film.css';
import { useContext } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

// eslint-disable-next-line
import { Context } from '../../App';

export default function Film({ id, title, genre, date, about, img, rating, avgRating, addRating }) {
  const value = useContext(Context);
  const str = about.split(' ').slice(0, 20).join(' ');
  const avgRatingFixed = avgRating.toFixed(1);
  let ratingValue = 0;
  let imgSrc;
  if (rating) {
    ratingValue = rating;
  }
  if (img === null) {
    imgSrc =
      'https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg';
  } else {
    imgSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${img}`;
  }

  if (date) {
    date = format(date, 'PP');
  }
  let color = '';
  if (avgRatingFixed < 3) {
    color = 'item__vote-average red';
  } else if (avgRatingFixed < 5) {
    color = 'item__vote-average orange';
  } else if (avgRatingFixed < 7) {
    color = 'item__vote-average yellow';
  } else {
    color = 'item__vote-average green';
  }
  const genreNames = genre.map((it) => <span key={it}>{value[it]}</span>);
  return (
    <li className="film_list__item">
      <img className="item__img" src={imgSrc} alt="" />
      <div className="item__info">
        <div className={color}>{avgRatingFixed}</div>
        <div className="item__title">{title}</div>
        <div className="item__date">{date}</div>
        <div className="item__genre">{genreNames}</div>
        <div className="item__about">{`${str} ...`}</div>
        <Rate
          className="item__rate"
          allowHalf
          count={10}
          defaultValue={ratingValue}
          onChange={(num) => addRating(id, num)}
        />
      </div>
    </li>
  );
}
