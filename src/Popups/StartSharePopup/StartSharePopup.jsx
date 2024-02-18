import s from "./StartSharePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import { useState } from "react";

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
          <input
            type="number"
            placeholder={adidas.title}
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
          <input
            type="number"
            placeholder={busy.title}
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
          <input
            type="number"
            placeholder={pepsi.title}
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
          <input
            type="number"
            placeholder={elit.title}
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
