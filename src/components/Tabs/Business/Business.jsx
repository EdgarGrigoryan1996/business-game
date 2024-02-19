import s from "./Business.module.css";
import { FaDollarSign, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import AddBusinessPopup from "../../../Popups/AddBusinessPopup/AddBusinessPopup.jsx";
import PopupTemplate from "../../../Popups/PopupTemplate/PopupTemplate.jsx";
import MyLottie from "../../MyLottie/MyLottie.jsx";
import notFound from "../../../assets/lottieData/notFound.json";

function Business({ player, setPlayer }) {
  const [sellPrice, setSellPrice] = useState("");
  const [addBusinessPopup, setAddBusinessPopup] = useState(false);
  const [changeBusinessPopup, setChangeBusinessPopup] = useState({
    status: false,
    currentBusiness: null,
  });
  const [sellBusinessPopup, setSellBusinessPopup] = useState({
    status: false,
    id: null,
  });
  const [deleteBusinessPopup, setDeleteBusinessPopup] = useState({
    status: false,
    id: null,
  });
  const handleSellBusiness = (id) => {
    if (sellPrice) {
      setPlayer({
        ...player,
        cashMoney: player.cashMoney + +sellPrice,
        cashHistory: [
          ...player.cashHistory,
          {
            dealTitle: "Վաճ",
            type: "Բիզնես",
            dealCount: null,
            dealPrice: sellPrice,
            moneyBeforeDeal: player.cashMoney,
            totalMoney: `+${sellPrice}`,
            moneyAfterDeal: player.cashMoney + +sellPrice,
          },
        ],
        business: player.business.filter((business) => {
          return business.id !== id;
        }),
      });
      setSellPrice("");
      setSellBusinessPopup({
        status: false,
        id: null,
      });
    } else {
      alert("Նշեք բիզնեսի արժեքը");
      return false;
    }
  };
  const handleDeleteBusiness = (id) => {
    setPlayer({
      ...player,
      business: player.business.filter((business) => {
        return business.id !== id;
      }),
    });
    setDeleteBusinessPopup({
      status: false,
      id: null,
    });
  };
  return (
    <div>
      <div>
        {player.business.length > 0 ? (
          <>
            <div className={s.businessBlock}>
              <div>Անուն</div>
              <div>Պասիվ</div>
              <div>Պարտք</div>
            </div>
            {player.business.map((business) => {
              return (
                <div className={s.businessBlock} key={business.id}>
                  <div className={s.name}>{business.name}</div>
                  <div className={s.income}>{business.passiveIncome}</div>
                  <div className={s.duty}>{business.duty}</div>
                  <div className={s.controls}>
                    <span
                      onClick={() =>
                        setChangeBusinessPopup({
                          status: true,
                          currentBusiness: business,
                        })
                      }
                    >
                      <FaPen color={"#006AE8"} />
                    </span>
                    <span
                      onClick={() =>
                        setSellBusinessPopup({
                          status: true,
                          id: business.id,
                        })
                      }
                    >
                      <FaDollarSign color={"#06442D"} />
                    </span>
                    <span
                      onClick={() =>
                        setDeleteBusinessPopup({
                          status: true,
                          id: business.id,
                        })
                      }
                    >
                      <MdDelete color={"#C53434"} />
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <MyLottie data={notFound} />
          </div>
        )}
      </div>
      <div className={s.addBusinessBtnBlock}>
        <button onClick={() => setAddBusinessPopup(true)}>Ավելացնել</button>
      </div>

      {addBusinessPopup && (
        <AddBusinessPopup
          player={player}
          setPlayer={setPlayer}
          setPopup={setAddBusinessPopup}
        />
      )}
      {changeBusinessPopup.status && (
        <AddBusinessPopup
          player={player}
          setPlayer={setPlayer}
          setPopup={setChangeBusinessPopup}
          changeMode={true}
          currentBusiness={changeBusinessPopup.currentBusiness}
        />
      )}
      {deleteBusinessPopup.status && (
        <PopupTemplate
          title={"Ջնջել բիզնեսը?"}
          successTitle={"Այո"}
          handleSuccess={() => handleDeleteBusiness(deleteBusinessPopup.id)}
          handleCancel={() =>
            setDeleteBusinessPopup({
              status: false,
              id: null,
            })
          }
        />
      )}
      {sellBusinessPopup.status && (
        <PopupTemplate
          title={"Վաճառել բիզնեսը?"}
          successTitle={"Այո"}
          handleSuccess={() => handleSellBusiness(sellBusinessPopup.id)}
          handleCancel={() => {
            setSellBusinessPopup({
              status: false,
              id: null,
            });
            setSellPrice("");
          }}
        >
          <div>
            <input
              type="number"
              className={s.sellPrice}
              placeholder={"Արժեք"}
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </div>
        </PopupTemplate>
      )}
    </div>
  );
}

export default Business;
