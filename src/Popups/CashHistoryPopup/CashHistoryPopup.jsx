import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import s from "./CashHistoryPopup.module.css";
import setCashHistoryTitleBackground from "../../utils/setCashHistoryTitleBackground.js";

function CashHistoryPopup({ player, setPopup }) {
  const handleCancel = () => {
    setPopup(false);
  };
  return (
    <PopupTemplate
      title={"Գործարքներ"}
      handleCancel={handleCancel}
      bigPopup={true}
    >
      <div className={s.historyBlock}>
        {player.cashHistory.map((deal) => {
          const titleColor = setCashHistoryTitleBackground(deal.dealTitle);
          return (
            <div
              key={Math.random()}
              className={
                (deal.dealTitle === "Առք" || deal.dealTitle === "Ծախս"
                  ? s.historyBuyBlock
                  : s.historySellBlock) +
                " " +
                s.historyDealBlock
              }
            >
              <div>
                <span
                  style={{
                    backgroundColor: titleColor,
                    color: "#fff",
                    padding: "5px",
                  }}
                >
                  {deal.dealTitle}
                </span>
              </div>
              <div className={deal.riskDeal && s.riskDeal}>
                <span>{deal.type}</span>
              </div>
              <div>{deal.dealCount}</div>
              <div>{deal.dealPrice}</div>
              <div>{deal.moneyBeforeDeal}</div>
              <div>{deal.totalMoney}</div>
              <div>{deal.moneyAfterDeal}</div>
            </div>
          );
        })}
      </div>
    </PopupTemplate>
  );
}

export default CashHistoryPopup;
