import React, { useState } from "react";
import s from "../ShareSalePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";



function CostPopup({ player, setPlayer, setCostPopup }) {
  const handleCost = () => {
    setPlayer({
      ...player,
      cashMoney: player.cashMoney - money,
    });
    setCostPopup(false);
  };
  const handleCancel = () => {
    setCostPopup(false);
  };
  const [money, setMoney] = useState("");
  return (
    <PopupTemplate
      title={"Ծախս"}
      successTitle={"Ծախսել"}
      handleSuccess={handleCost}
      handleCancel={handleCancel}
    >
      <div className={s.popupInputs}>
        <input
          type="number"
          value={money}
          onChange={(e) => setMoney(+e.target.value)}
          placeholder={"Գումար"}
        />
      </div>
    </PopupTemplate>
  );
}

export default CostPopup;
