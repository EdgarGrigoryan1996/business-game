import s from "./ShareSalePopup.module.css";
import PopupBtn from "./PopupBtn";
import { useState } from "react";
function ShareSalePopup({
  player,
  setPlayer,
  buyMode,
  shareTitle,
  shareId,
  setSharePopupStatus,
}) {
  const [count, setCount] = useState(null);
  const [price, setPrice] = useState(null);
  const sellShareCount = player.shares.filter((share) => {
    return share.id === shareId;
  })[0].balance;

  const [sellCount, setSellCount] = useState(sellShareCount);
  const handleBuy = () => {
    const newShare = count * price;
    const newCashMoney = player.cashMoney - newShare;
    if (!count || !price) {
      alert("Թերի գործարք, եղեք ուշադիր");
      return false;
    }
    if (newCashMoney >= 0) {
      setPlayer({
        ...player,
        cashMoney: newCashMoney,
        cashHistory: [
          ...player.cashHistory,
          {
            dealTitle: "Առք",
            type: `${shareTitle}`,
            dealCount: count,
            dealPrice: price,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: `-${newShare}`,
            moneyAfterDeal: player.cashMoney - +newShare,
          },
        ],
        shares: player.shares.map((share) => {
          if (share.id === shareId) {
            console.log("test");
            return {
              ...share,
              balance: +share.balance + +count,
            };
          } else {
            return share;
          }
        }),
      });
      setSharePopupStatus({
        status: false,
        mode: null,
        shareTitle: null,
      });
    } else {
      alert("Անբավարար գումար");
    }
  };

  const handleSell = () => {
    const newShare = sellCount * price;
    const newCashMoney = player.cashMoney + newShare;
    if (!sellCount || !price) {
      alert("Թերի գործարք, եղեք ուշադիր");
      return false;
    } else if (sellCount > sellShareCount) {
      alert("Դուք չունեք նշվաժ քանակի ակցիաներ");
      return false;
    }
    setPlayer({
      ...player,
      cashMoney: newCashMoney,
      cashHistory: [
        ...player.cashHistory,
        {
          dealTitle: "Վաճ",
          type: `${shareTitle}`,
          dealCount: sellCount,
          dealPrice: price,
          moneyBeforeDeal: player.cashMoney,
          totalMoney: `+${newShare}`,
          moneyAfterDeal: player.cashMoney + +newShare,
        },
      ],
      shares: player.shares.map((share) => {
        if (share.id === shareId) {
          return {
            ...share,
            balance: +share.balance - +sellCount,
          };
        } else {
          return share;
        }
      }),
    });
    setSharePopupStatus({
      status: false,
      mode: null,
      shareTitle: null,
    });
  };

  return (
    <div className={s.popupWrapper}>
      <div className={s.popupBlock}>
        <div className={s.content}>
          {buyMode ? (
            <>
              <h4>Գնել {shareTitle} -ի ակցիաներ</h4>

              <div className={s.popupInputs}>
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
              </div>

              <div className={s.btnBlock}>
                <PopupBtn
                  title={"Գնել"}
                  color={"#fff"}
                  background={"#457b45"}
                  handleFunction={handleBuy}
                />
                <PopupBtn
                  title={"Չեղարկել"}
                  color={"#fff"}
                  background={"#d85555"}
                  handleFunction={() =>
                    setSharePopupStatus({
                      status: false,
                      mode: null,
                      shareTitle: null,
                    })
                  }
                />
              </div>
            </>
          ) : (
            <>
              <h4>Վաճառել {shareTitle} -ի ակցիաներ</h4>

              <div className={s.popupInputs}>
                <input
                  type="number"
                  value={sellCount}
                  onChange={(e) => setSellCount(e.target.value)}
                  placeholder={"Քանակ"}
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Ներկա արժեք"}
                />
              </div>

              <div className={s.btnBlock}>
                <PopupBtn
                  title={"Վաճառել"}
                  color={"#fff"}
                  background={"#457b45"}
                  handleFunction={handleSell}
                />
                <PopupBtn
                  title={"Չեղարկել"}
                  color={"#fff"}
                  background={"#d85555"}
                  handleFunction={() =>
                    setSharePopupStatus({
                      status: false,
                      mode: null,
                      shareTitle: null,
                    })
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareSalePopup;
