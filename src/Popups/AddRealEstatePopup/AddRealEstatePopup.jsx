import s from "./AddRealEstatePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import { useState } from "react";

function AddRealEstatePopup({
  changeMode,
  player,
  setPlayer,
  currentEstate,
  setPopup,
}) {
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

    setPopup(false);
  };
  const handleChangeEstate = () => {
    setPlayer({
      ...player,
      realEstate: player.realEstate.map((estate) => {
        if (estate.id === currentEstate.id) {
          return {
            ...estate,
            rooms,
            renovated,
            inTheCenter,
            duty,
            passiveIncome: +passiveIncome,
          };
        } else {
          return estate;
        }
      }),
    });
    setPopup({
      status: false,
      currentEstate: null,
    });
  };
  const handleCancel = () => {
    if (changeMode) {
      setPopup({
        status: false,
        currentEstate: null,
      });
    } else {
      setPopup(false);
    }
  };
  const [rooms, setRooms] = useState(changeMode ? currentEstate.rooms : "");
  const [renovated, setRenovated] = useState(
    changeMode ? currentEstate.renovated : false,
  );
  const [inTheCenter, setInTheCenter] = useState(
    changeMode ? currentEstate.inTheCenter : false,
  );
  const [duty, setDuty] = useState(changeMode ? currentEstate.duty : "");
  const [passiveIncome, setPassiveIncome] = useState(
    changeMode ? currentEstate.passiveIncome : "",
  );
  return (
    <PopupTemplate
      title={changeMode ? "Կատարել փոփոխություն" : "Ավելացնել բնակարան"}
      successTitle={changeMode ? "Փոխել" : "Ավելացնել"}
      handleCancel={handleCancel}
      handleSuccess={changeMode ? handleChangeEstate : handleAdd}
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
