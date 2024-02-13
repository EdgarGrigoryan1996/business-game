import React, { useState } from "react";
import g from "../../globals.module.css"
import s from "../../Popups/StartSharePopup/StartSharePopup.module.css"
import StartSharePopup from "../../Popups/StartSharePopup/StartSharePopup.jsx";
import AddRealEstatePopup from "../../Popups/AddRealEstatePopup/AddRealEstatePopup.jsx";

function CreatePlayer({ player, setPlayer, setGameStarted }) {
  const [startSharePopup, setStartSharePopup] = useState(false);
  const [realEstatePopup, setRealEstatePopup] = useState(false);
  const [startPlayer, setStartPlayer] = useState({
    salary: null,
    cashMoney: null,
    passiveIncome: null,
    monthlyExpenses: null,
    startShares: [],
  });
  return (
    <div>
      <div>
        <div className={g.topControlGroup}>
          <b>Կանխիկ գումար</b>
          <input
            type="text"
            className={g.underlineInput}
            value={startPlayer.cashMoney}
            onChange={(e) =>
              setStartPlayer({ ...startPlayer, cashMoney: e.target.value })
            }
          />
        </div>
        <div className={g.topControlGroup}>
          <b>Աշխատավարձ</b>
          <input
            type="text"
            className={g.underlineInput}
            value={startPlayer.salary}
            onChange={(e) =>
              setStartPlayer({ ...startPlayer, salary: e.target.value })
            }
          />
        </div>

        <div className={g.topControlGroup}>
          <b>Ամսական ծախսեր</b>
          <input
            type="text"
            className={g.underlineInput}
            value={startPlayer.monthlyExpenses}
            onChange={(e) =>
              setStartPlayer({
                ...startPlayer,
                monthlyExpenses: e.target.value,
              })
            }
          />
        </div>
        {startPlayer.startShares.map((startShare) => {
          if (startShare.balance > 0) {
            return (
              <div className={s.shareLine} key={startShare.id}>
                <div>{startShare.title}</div>
                <div>{startShare.balance}</div>
              </div>
            );
          }
        })}
        <div className={g.topControlGroup}>
          <button onClick={() => setStartSharePopup(true)}>+Բաժնետոմս</button>
        </div>
        <div className={g.topControlGroup}>
          <button onClick={() => setRealEstatePopup(true)}>
            +Ժառանգություն
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          const loanPercent = (player.loans / 100) * 10;
          setPlayer({
            ...player,
            ...startPlayer,
            cashMoney: +startPlayer.cashMoney,
            shares: startPlayer.startShares.length
              ? startPlayer.startShares
              : player.shares,
            monthlyIncome:
              +startPlayer.salary +
              +(+startPlayer.passiveIncome - +startPlayer.monthlyExpenses) -
              loanPercent,
          });
          setGameStarted(true);
        }}
      >
        Սկսել
      </button>
      {startSharePopup && (
        <StartSharePopup
          startPlayer={startPlayer}
          setStartPlayer={setStartPlayer}
          setStartSharePopup={setStartSharePopup}
        />
      )}
      {realEstatePopup && (
        <AddRealEstatePopup
          player={player}
          setPlayer={setPlayer}
          setRealEstatePopup={setRealEstatePopup}
        />
      )}
    </div>
  );
}

export default CreatePlayer;
