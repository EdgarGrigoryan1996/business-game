import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import s from "./CashHistoryPopup.module.css";
import setCashHistoryTitleBackground from "../../utils/setCashHistoryTitleBackground.js";
import MyLottie from "../../components/MyLottie/MyLottie.jsx";
import historyEmpty from "../../assets/lottieData/historyEmpty.json";
function CashHistoryPopup({ player, setPopup }) {
  const handleCancel = () => {
    setPopup(false);
  };
  return (
    <PopupTemplate
      title={"Գործարքներ"}
      cancelTitle={"Փակել"}
      handleCancel={handleCancel}
      bigPopup={true}
    >
      {player.cashHistory.length ? (
        <div className={s.historyBlock}>
          <div className={s.historyDealBlock + " " + s.historyDealBlockTitles}>
            <div>Գործարք</div>
            <div>Տեսակ</div>
            <div>Քանակ</div>
            <div>Արժեք</div>
            <div>Մինչ․ գործարք</div>
            <div>Ընդ․ Գումար</div>
            <div>Գործարքից հետո</div>
          </div>

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
                      display: "inline-block",
                      padding: "5px",
                      width: "20px",
                      textAlign: "center",
                      fontSize: "6px",
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
      ) : (
        <MyLottie data={historyEmpty} height={"70%"} />
      )}
    </PopupTemplate>
  );
}

export default CashHistoryPopup;
