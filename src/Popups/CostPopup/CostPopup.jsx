import s from "../ShareSalePopup.module.css";
import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import { useState } from "react";

function CostPopup({ player, setPlayer, setCostPopup, costMode }) {
  const handleCost = () => {
    if (costMode) {
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
            dealPrice: null,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: `-${money}`,
            moneyAfterDeal: player.cashMoney - +money,
          },
        ],
        cashMoney: player.cashMoney - money,
      });
    } else {
      if (!money) {
        alert("Նշեք գումարի չափը");
        return false;
      }
      setPlayer({
        ...player,
        cashHistory: [
          ...player.cashHistory,
          {
            dealTitle: "Մուտք",
            type: "",
            dealCount: null,
            dealPrice: null,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: `-${money}`,
            moneyAfterDeal: player.cashMoney + +money,
          },
        ],
        cashMoney: player.cashMoney + +money,
      });
    }

    setCostPopup({
      status: false,
      costMode: null,
    });
  };
  const handleCancel = () => {
    setCostPopup({
      status: false,
      costMode: null,
    });
  };
  const [money, setMoney] = useState("");
  return (
    <PopupTemplate
      title={costMode ? "Ծախս" : "Ստանալ"}
      successTitle={costMode ? "Ծախսել" : "Ստանալ"}
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
