import React, { useState } from "react";
import s from "./AddRealEstatePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";

function AddRealEstatePopup({ player, setPlayer, setRealEstatePopup }) {
  const handleAdd = () => {
    setPlayer({
      ...player,
      realEstate: [
        ...player.realEstate,
        {
          id: Math.random(),
          rooms,
          renovated,
          inTheCenter,
          duty,
          passiveIncome: +passiveIncome,
        },
      ],
    });
    setRealEstatePopup(false);
  };
  const handleCancel = () => {
    setRealEstatePopup(false);
  };
  const [rooms, setRooms] = useState("");
  const [renovated, setRenovated] = useState(false);
  const [inTheCenter, setInTheCenter] = useState(false);
  const [duty, setDuty] = useState("");
  const [passiveIncome, setPassiveIncome] = useState("");
  return (
    <PopupTemplate
      title={"Ավելացնել բնակարան"}
      successTitle={"Ավելացնել"}
      handleCancel={handleCancel}
      handleSuccess={handleAdd}
    >
      <div className={s.addRealEstatePopupContent}>
        <div className={s.line}>
          <div>Սենյակ</div>
          <div>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </div>
        </div>
        <div className={s.line}>
          <div>Վերանորոգված</div>
          <div>
            <input
              type="checkbox"
              checked={renovated}
              onChange={(e) => setRenovated(!renovated)}
            />
          </div>
        </div>
        <div className={s.line}>
          <div>Կենտրոնում</div>
          <div>
            <input
              type="checkbox"
              checked={inTheCenter}
              onChange={(e) => setInTheCenter(!inTheCenter)}
            />
          </div>
        </div>
        <div className={s.line}>
          <div>Պարտք</div>
          <div>
            <input
              type="number"
              value={duty}
              onChange={(e) => setDuty(e.target.value)}
            />
          </div>
        </div>
        <div className={s.line}>
          <div>Եկամուտ</div>
          <div>
            <input
              type="number"
              value={passiveIncome}
              onChange={(e) => setPassiveIncome(e.target.value)}
            />
          </div>
        </div>
      </div>
    </PopupTemplate>
  );
}

export default AddRealEstatePopup;
