import React from "react";
import { Link } from "react-router-dom";
import s from "../FullCards/FullCards.module.scss";

const FullCards = (props) => {
  let briefCard = props.brief;
  let briefFlights = props.briefFlights;

  return (
    <div className={s.container}>
      <div>
        <h2 className={s.headline}>{briefCard.headline}</h2>
        <h3 className={s.location}>
          {briefCard.location.location
            ? briefCard.location.location
            : console.log("упс")}
        </h3>
        <div className={s.moreInfo}>Location: {briefCard.location.name}</div>
        <div className={s.moreInfo}>
          Timezone: {briefCard.location.timezoneName}{" "}
        </div>
        <img
          className={s.picture}
          height="200px"
          src={briefCard.dailyPhotoNode.file.httpsUrl}
        />
        <div className={s.info}>{briefCard.shortInformation}</div>
      </div>

      {briefFlights.map((i) => (
        <div className={s.flights}>
          <div className={s.airport}>
            <div>Отправление: {i.flights[0].departure.cityName}</div>
            <div>Аэропорт: {i.flights[0].departure.airportName}</div>
          </div>
          <div className={s.airport}>
            <div>Прибытие: {i.flights[0].arrival.cityName}</div>
            <div>Аэропорт: {i.flights[0].arrival.airportName}</div>
          </div>
        </div>
      ))}
      <Link to={"/brief"}>
        <button className={s.button} onClick={props.handleModal}>
          На начальную страницу
        </button>
      </Link>
    </div>
  );
};

export default FullCards;
