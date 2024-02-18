import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import s from "../AddRealEstatePopup/AddRealEstatePopup.module.css";
import { useState } from "react";
import business from "../../components/Tabs/Business/Business.jsx";

function AddBusinessPopup({
  player,
  setPlayer,
  changeMode,
  currentBusiness,
  setPopup,
}) {
  const [name, setName] = useState(changeMode ? currentBusiness.name : "");
  const [income, setIncome] = useState(
    changeMode ? currentBusiness.passiveIncome : "",
  );
  const [duty, setDuty] = useState(changeMode ? currentBusiness.duty : "");
  const [price, setPrice] = useState("");

  const handleCancel = () => {
    if (changeMode) {
      setPopup({
        status: false,
        currentBusiness: null,
      });
    } else {
      setPopup(false);
    }
  };

  const handleAddBusiness = () => {
    if (changeMode) {
      setPlayer({
        ...player,
        business: player.business.map((business) => {
          if (currentBusiness.id === business.id) {
            return {
              ...business,
              name,
              passiveIncome: income,
              duty,
            };
          } else {
            return business;
          }
        }),
      });
    } else {
      setPlayer({
        ...player,
        cashMoney: price ? player.cashMoney - +price : player.cashMoney,
        business: [
          ...player.business,
          {
            id: Math.random(),
            name,
            passiveIncome: income,
            duty,
          },
        ],
        cashHistory: [
          ...player.cashHistory,
          {
            dealTitle: "Առք",
            type: "Բիզնես",
            dealCount: null,
            dealPrice: price ? price : 0,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: price ? `-${price}` : `- 0`,
            moneyAfterDeal: price
              ? player.cashMoney - +price
              : player.cashMoney,
          },
        ],
      });
    }

    setPopup(false);
  };
  return (
    <PopupTemplate
      title={changeMode ? "Կատարել փոփոխություն" : "Ավելացնել բնակարան"}
      successTitle={changeMode ? "Փոխել" : "Ավելացնել"}
      handleCancel={handleCancel}
      handleSuccess={handleAddBusiness}
    >
      <div className={s.addBusinessContent}>
        <div className={s.line}>
          <div>Անուն</div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={s.line}>
          <div>Պասիվ</div>
          <div>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
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
        {!changeMode && (
          <div className={s.line}>
            <div>Վճարում</div>
            <div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </PopupTemplate>
  );
}

export default AddBusinessPopup;
