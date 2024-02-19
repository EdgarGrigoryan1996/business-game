import Shares from "../../Share/Shares.jsx";
import RiskShare from "../../RiskShare/RiskShare.jsx";

function AllShares({
  player,
  setPlayer,
  setSharePopupStatus,
  setRiskSharePopupStatus,
}) {
  return (
    <div>
      <Shares player={player} setSharePopupStatus={setSharePopupStatus} />
      <RiskShare
        player={player}
        setPlayer={setPlayer}
        setRiskSharePopupStatus={setRiskSharePopupStatus}
      />
    </div>
  );
}

export default AllShares;
