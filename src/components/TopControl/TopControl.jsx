
import React from "react";
import g from "../../globals.module.css";
import { LuBaby } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
function TopControl({ player, setPlayer, setCostPopup }) {
  const addChildren = () => {
    if (player.children < 4) {
      setPlayer({
        ...player,
        children: player.children + 1,
      });
    }
  };
  return (
    <div>
      {/*<div className={g.topControlGroup}>*/}
      {/*  <b>Աշխատավարձ</b>*/}
      {/*  <span>{player.salary}</span>*/}
      {/*</div>*/}
      {/*<div className={g.topControlGroup}>*/}
      {/*  <b>Պասիվ եկամուտ</b>*/}
      {/*  <span>{player.passiveIncome}</span>*/}
      {/*</div>*/}
      {/*<div className={g.topControlGroup}>*/}
      {/*  <b>Ամսական ծախսեր</b>*/}
      {/*  <span>{player.monthlyExpenses}</span>*/}
      {/*</div>*/}
      <div className={g.topControlGroup}>
        <div className={g.topControlInfo}>
          <button className={g.btn + " " + g.childrenBtn}>
            <div className={g.childrenBlock}>{player.children}</div>
            <div className={g.addChildrenBtn} onClick={addChildren}>
              <LuBaby size={24} /> +1
            </div>
          </button>
          <button className={g.btn + " " + g.loanBtn}>
            <div>Վարկեր</div> <span>{player.loans}</span>
          </button>
          <button
            className={g.btn + " " + g.costBtn}
            onClick={() => {
              console.log("test");
              setCostPopup(true);
            }}
          >
            <span>
              <GiReceiveMoney size={24} />
            </span>
            <div>Ծախսել</div>
          </button>
        </div>
      </div>
      {/*<div className={g.topControlGroup}>*/}
      {/*  <b>Ամսեկան եկամուտ</b>*/}
      {/*  <span>*/}
      {/*    <b>{player.monthlyIncome}</b>*/}
      {/*  </span>*/}
      {/*</div>*/}
    </div>
  );
}

export default TopControl;
