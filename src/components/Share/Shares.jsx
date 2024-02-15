import g from "../../globals.module.css";
import { CiShoppingCart } from "react-icons/ci";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";

function Shares({ player, setSharePopupStatus }) {
  return (
    <div>
      <h5>Բաժմետոմսեր</h5>
      <table className={g.myTable}>
        <thead>
          <tr>
            <th>Անվանում</th>
            <th>Քանակ</th>
          </tr>
        </thead>
        <tbody>
          {player.shares.map((share) => {
            return (
              <tr key={share.id}>
                <td className={g.shareTitle}>{share.title}</td>
                <td
                  className={
                    share.balance ? g.withShareBalance : g.shareBalance
                  }
                >
                  <span>
                    {share.balance ? share.balance : "Չունեք գնված ակցիաներ"}
                  </span>
                </td>
                <td className={g.noBorder}>
                  <span
                    className={g.shareBtn}
                    onClick={() =>
                      setSharePopupStatus({
                        status: true,
                        mode: true,
                        shareTitle: share.title,
                        shareId: share.id,
                      })
                    }
                  >
                    <CiShoppingCart color={"#06442D"} size={28} />
                  </span>
                </td>
                <td className={g.noBorder}>
                  <span
                    className={g.shareBtn}
                    onClick={() => {
                      setSharePopupStatus({
                        status: true,
                        mode: false,
                        shareTitle: share.title,
                        shareId: share.id,
                      });
                    }}
                  >
                    {share.balance && (
                      <LiaHandHoldingUsdSolid color={"#d53838"} size={28} />
                    )}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Shares;
