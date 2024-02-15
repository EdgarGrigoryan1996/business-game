import s from "../ShareSalePopup.module.css";
import PopupBtn from "../PopupBtn.jsx";
import { useState } from "react";

function RiskSharePopup({
  player,
  setPlayer,
  buyMode,
  riskShareTitle,
  riskShareId,
  sellCount,
  dealId,
  dealSellPrice,
  setRiskSharePopupStatus,
}) {
  const [count, setCount] = useState(null);
  const [price, setPrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const closePopup = () => {
    setRiskSharePopupStatus({
      status: false,
      buyMode: null,
      riskShareTitle: null,
      riskShareId: null,
      dealId: null,
      riskShareSellPrice: null,
    });
  };
  const buyRiskShare = () => {
    if (!count || !price || !sellPrice) {
      alert("Թերի գործարք, եղեք ուշադիր");
      return false;
    }
    if (player.cashMoney - count * price >= 0) {
      setPlayer({
        ...player,
        cashMoney: player.cashMoney - price * count,
        cashHistory: [
          ...player.cashHistory,
          {
            dealTitle: "Առք",
            riskDeal: true,
            type: `${riskShareTitle}`,
            dealCount: count,
            dealPrice: price,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: `-${count * price}`,
            moneyAfterDeal: player.cashMoney - +count * +price,
          },
        ],
        riskShares: player.riskShares.map((riskShare) => {
          if (riskShare.id === riskShareId) {
            return {
              ...riskShare,
              currentRiskDeal: [
                ...riskShare.currentRiskDeal,
                {
                  id: Math.random(),
                  count,
                  sellPrice,
                  controlsStatus: false,
                  currentCircle: player.riskDealCircleCount,
                },
              ],
            };
          } else {
            return riskShare;
          }
        }),
      });
    } else {
      alert("Անբավարար գումար");
    }
  };
  return (
    <div className={s.popupWrapper}>
      <div className={s.popupBlock}>
        <div className={s.content}>
          {buyMode ? (
            <>
              <h4>Գնել {riskShareTitle} -ի ակցիաներ</h4>

              <div className={s.riskSharePopupInputs}>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder={"Քանակ"}
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Ներկա արժեք"}
                />
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder={"Վաճառքի արժեք"}
                />
              </div>

              <div className={s.btnBlock}>
                <PopupBtn
                  title={"Գնել"}
                  color={"#fff"}
                  background={"#217821"}
                  handleFunction={() => {
                    buyRiskShare();
                    closePopup();
                  }}
                />
                <PopupBtn
                  title={"Չեղարկել"}
                  color={"#fff"}
                  background={"#d53838"}
                  handleFunction={() => closePopup()}
                />
              </div>
            </>
          ) : (
            <>
              <h4>Վաճառել {riskShareTitle} -ի ակցիաներ</h4>

              <div className={s.popupInputs}>
                <input type="number" value={sellCount} placeholder={"Քանակ"} />
                <input
                  type="number"
                  value={dealSellPrice}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Վաճառքի գին"}
                />
              </div>

              <div className={s.btnBlock}>
                <PopupBtn
                  title={"Վաճառել"}
                  color={"#fff"}
                  background={"#217821"}
                  handleFunction={() => {
                    console.log(sellCount);
                    console.log(sellPrice);
                    setPlayer({
                      ...player,
                      cashMoney:
                        player.cashMoney + +(sellCount * dealSellPrice),
                      cashHistory: [
                        ...player.cashHistory,
                        {
                          dealTitle: "Վաճ",
                          riskDeal: true,
                          type: `${riskShareTitle}`,
                          dealCount: sellCount,
                          dealPrice: dealSellPrice,
                          moneyBeforeDeal: player.cashMoney,
                          totalMoney: `+${sellCount * dealSellPrice}`,
                          moneyAfterDeal:
                            player.cashMoney + +sellCount * +dealSellPrice,
                        },
                      ],
                      riskShares: player.riskShares.map((riskShare) => {
                        if (riskShare.id === riskShareId) {
                          return {
                            ...riskShare,
                            currentRiskDeal: riskShare.currentRiskDeal.filter(
                              (deal) => {
                                return deal.id !== dealId;
                              },
                            ),
                          };
                        } else {
                          return riskShare;
                        }
                      }),
                    });
                    closePopup();
                  }}
                />
                <PopupBtn
                  title={"Չեղարկել"}
                  color={"#fff"}
                  background={"#d53838"}
                  handleFunction={() => {
                    setRiskSharePopupStatus({
                      status: false,
                      buyMode: null,
                      riskShareTitle: null,
                      riskShareId: null,
                      riskShareSellPrice: null,
                    });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskSharePopup;
