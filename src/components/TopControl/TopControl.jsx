import g from "../../globals.module.css";
import { LuBaby } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { PiCurrencyDollarThin } from "react-icons/pi";
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
              setCostPopup({
                status: true,
                costMode: true,
              });
            }}
          >
            <span>
              <GiReceiveMoney size={24} />
            </span>
            <div>Ծախսել</div>
          </button>
          <button
            className={g.btn + " " + g.getMoneyBtn}
            onClick={() => {
              setCostPopup({
                status: true,
                costMode: false,
              });
            }}
          >
            <span>
              <PiCurrencyDollarThin size={24} />
            </span>
            <div>Ստանալ</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopControl;
