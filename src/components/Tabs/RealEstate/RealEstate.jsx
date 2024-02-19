import s from "./RealEstate.module.css";
import { MdCancel, MdDelete, MdDone } from "react-icons/md";
import { FaDollarSign, FaPen } from "react-icons/fa";
import AddRealEstatePopup from "../../../Popups/AddRealEstatePopup/AddRealEstatePopup.jsx";
import { useState } from "react";
import PopupTemplate from "../../../Popups/PopupTemplate/PopupTemplate.jsx";
import Lottie from "react-lottie";
import notFound from "../../../assets/lottieData/notFound.json";
import MyLottie from "../../MyLottie/MyLottie.jsx";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: notFound,
};
function RealEstate({ player, setPlayer }) {
  const [realEstatePopup, setRealEstatePopup] = useState(false);
  const [changeEstatePopup, setChangeEstatePopup] = useState({
    status: false,
    currentEstate: null,
  });
  const [sellEstatePopup, setSellEstatePopup] = useState({
    status: null,
    currentEstateId: null,
  });
  const [deleteEstatePopup, setDeleteEstatePopup] = useState({
    status: false,
    currentEstateId: null,
  });
  const [sellPrice, setSellPrice] = useState("");
  const handleSellEstate = () => {
    setPlayer({
      ...player,
      cashMoney: player.cashMoney + +sellPrice,
      cashHistory: [
        ...player.cashHistory,
        {
          dealTitle: "Վաճ",
          type: "Բնակարան",
          dealCount: null,
          dealPrice: +sellPrice,
          moneyBeforeDeal: player.cashMoney,
          totalMoney: `+${sellPrice}`,
          moneyAfterDeal: player.cashMoney + +sellPrice,
        },
      ],
      realEstate: player.realEstate.filter((estate) => {
        return estate.id !== sellEstatePopup.currentEstateId;
      }),
    });
    setSellEstatePopup({
      status: false,
      currentEstateId: null,
    });
  };
  const handleDeleteEstate = () => {
    setPlayer({
      ...player,
      realEstate: player.realEstate.filter((estate) => {
        return estate.id !== deleteEstatePopup.currentEstateId;
      }),
    });
    setDeleteEstatePopup({
      status: false,
      currentEstateId: null,
    });
  };
  return (
    <div>
      {player.realEstate.length ? (
        <table className={s.realEstateTable}>
          <thead>
            <tr className={s.realEstateTitles}>
              <th>Սենյակ</th>
              <th>Վերանորոգվաժ</th>
              <th>Կենտրոն</th>
              <th>Պարտք</th>
              <th>Եկամուտ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {player.realEstate.map((estate) => {
              return (
                <tr key={estate.id} className={s.estateLine}>
                  <td>{estate.rooms}</td>
                  <td>
                    {estate.renovated ? (
                      <MdDone color={"#06442D"} />
                    ) : (
                      <MdCancel color={"#c53434"} />
                    )}
                  </td>
                  <td>
                    {estate.inTheCenter ? (
                      <MdDone color={"#06442D"} />
                    ) : (
                      <MdCancel color={"#c53434"} />
                    )}
                  </td>
                  <td>{estate.duty}</td>
                  <td>{estate.passiveIncome}</td>
                  <td>
                    <div className={s.estateControls}>
                      <span
                        onClick={() => {
                          setChangeEstatePopup({
                            status: true,
                            currentEstate: estate,
                          });
                        }}
                      >
                        <FaPen color={"#006AE8"} />
                      </span>
                      <span>
                        <FaDollarSign
                          color={"#06442D"}
                          onClick={() => {
                            setSellEstatePopup({
                              status: true,
                              currentEstateId: estate.id,
                            });
                          }}
                        />
                      </span>
                      <span>
                        <MdDelete
                          color={"#C53434"}
                          onClick={() => {
                            setDeleteEstatePopup({
                              status: true,
                              currentEstateId: estate.id,
                            });
                          }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <MyLottie data={notFound} />
        </>
      )}
      <div className={s.addEstateBtnBlock}>
        <button
          className={s.addEstateBtn}
          onClick={() => setRealEstatePopup(true)}
        >
          Ավելացնել
        </button>
      </div>
      {realEstatePopup && (
        <AddRealEstatePopup
          player={player}
          setPlayer={setPlayer}
          setPopup={setRealEstatePopup}
        />
      )}
      {changeEstatePopup.status && (
        <AddRealEstatePopup
          changeMode={true}
          currentEstate={changeEstatePopup.currentEstate}
          player={player}
          setPlayer={setPlayer}
          setPopup={setChangeEstatePopup}
        />
      )}
      {sellEstatePopup.status && (
        <PopupTemplate
          title={"Վաճառել բնակարանը?"}
          successTitle={"Այո"}
          handleCancel={() =>
            setSellEstatePopup({
              status: false,
              currentEstateId: null,
            })
          }
          handleSuccess={handleSellEstate}
        >
          <input
            className={s.sellEstatePopupInout}
            type="number"
            placeholder="Արժեք"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />
        </PopupTemplate>
      )}
      {deleteEstatePopup.status && (
        <PopupTemplate
          title={"Վառել բնակարանը?"}
          successTitle={"Այո"}
          handleCancel={() =>
            setDeleteEstatePopup({ status: false, currentEstateId: null })
          }
          handleSuccess={handleDeleteEstate}
        />
      )}
    </div>
  );
}

export default RealEstate;
