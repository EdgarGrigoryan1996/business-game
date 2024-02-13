import React, { useState } from "react";
import s from "./StartSharePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";

function StartSharePopup({ startPlayer, setStartPlayer, setStartSharePopup }) {
  const [adidas, setAdidas] = useState({
    id: 1,
    title: "Adidas",
    balance: "",
  });
  const [busy, setBusy] = useState({
    id: 2,
    title: "Busy.am",
    balance: "",
  });
  const [pepsi, setPepsi] = useState({
    id: 3,
    title: "Pepsi",
    balance: "",
  });
  const [elit, setElit] = useState({
    id: 4,
    title: "ElitSHin",
    balance: "",
  });
  const handleAddShares = () => {
    setStartPlayer({
      ...startPlayer,
      startShares: [adidas, busy, pepsi, elit],
    });
    setStartSharePopup(false);
  };
  const handleCancel = () => {
    setStartSharePopup(false);
  };
  return (
    <PopupTemplate
      title={"Սկզբնական բաժնետոմսեր"}
      successTitle={"Ընդունել"}
      handleSuccess={handleAddShares}
      handleCancel={handleCancel}
    >
      <div className={s.sharesBlock}>
        <div className={s.shareLine}>
          <div>{adidas.title}</div>
          <input
            type="number"
            value={adidas.balance}
            onChange={(e) => {
              setAdidas({
                ...adidas,
                balance: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className={s.sharesBlock}>
        <div className={s.shareLine}>
          <div>{busy.title}</div>
          <input
            type="number"
            value={busy.balance}
            onChange={(e) => {
              setBusy({
                ...busy,
                balance: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className={s.sharesBlock}>
        <div className={s.shareLine}>
          <div>{pepsi.title}</div>
          <input
            type="number"
            value={pepsi.balance}
            onChange={(e) => {
              setPepsi({
                ...pepsi,
                balance: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className={s.sharesBlock}>
        <div className={s.shareLine}>
          <div>{elit.title}</div>
          <input
            type="number"
            value={elit.balance}
            onChange={(e) => {
              setElit({
                ...elit,
                balance: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </PopupTemplate>
  );
}

export default StartSharePopup;
