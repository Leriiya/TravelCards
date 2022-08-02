import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import s from "./Cards.module.scss";
import cn from "classnames";
import FullCards from "../FullCards/FullCards";

const Cards = () => {
  const baseURL = "https://live.vamoos.com/api/itineraries/VMD-VL1234";
  const [cards, setCards] = useState([]);
  const [newInfo, setNewInfo] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setCards(res.data.brief);
      setNewInfo(res.data.flightAlerts);
    });
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currentBriefIndex, setCurrentBriefIndex] = useState(0);
  useEffect(() => {
    const url2 = window.location.pathname.split("/");
    const index = parseInt(url2[url2.indexOf("brief") + 1]);
    if (index) {
      setCurrentBriefIndex(index);
      setIsOpenModal(true);
    }
  }, []);
  const OpenModal = (index) => {
    setIsOpenModal(true);
    setCurrentBriefIndex(index);
  };

  const handleModal = () => setIsOpenModal((prev) => !prev);

  let briefFlights = cards.map((brief) => {
    return newInfo
      .map((i) => {
        return brief.flightIds.includes(i.id) ? i : false;
      })
      .filter((i) => {
        return i ? true : false;
      });
  });
  return (
    <div className={s.form} type="outline">
      {cards.map((item, index) => (
        <div>
          <div className={s.container} key={item.id + item.dailyPhotoNode.id}>
            <h2 className={s.headline}>{item.headline}</h2>
            <h3 className={s.location}>
              {item.location.location
                ? item.location.location
                : console.log("упс")}
            </h3>
            <img
              className={s.picture}
              height="130px"
              src={item.dailyPhotoNode.file.httpsUrl}
            />
            <div>
              <div className={cn(s.info)}>{item.shortInformation}</div>
            </div>
            <Link to={"/brief/" + index} className={s.cont}>
              <button
                className={s.button}
                onClick={() => {
                  OpenModal(index);
                }}
              >
                Подробнее
              </button>
            </Link>
          </div>
        </div>
      ))}
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal((prev) => !prev)}
        closeButton
      >
        {cards.length != 0 ? (
          <FullCards
            brief={cards[currentBriefIndex]}
            handleModal={handleModal}
            briefFlights={briefFlights[currentBriefIndex]}
          />
        ) : (
          console.log("упс")
        )}
      </Modal>
    </div>
  );
};

export default Cards;
