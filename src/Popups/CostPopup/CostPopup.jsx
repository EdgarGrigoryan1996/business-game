import s from "../ShareSalePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import { useState } from "react";

function CostPopup({ player, setPlayer, setCostPopup }) {
  const handleCost = () => {
    if (player.cashMoney < money) {
      alert("Անբավարար գումար");
      return false;
    } else if (!money) {
      alert("Նշեք ծախսվող գումարը");
      return false;
    }
    setPlayer({
      ...player,
      cashHistory: [
        ...player.cashHistory,
        {
          dealTitle: "Ծախս",
          type: "",
          dealCount: null,
          dealPrice: money,
          moneyBeforeDeal: player.cashMoney,
          totalMoney: `-${money}`,
          moneyAfterDeal: player.cashMoney - +money,
        },
      ],
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
