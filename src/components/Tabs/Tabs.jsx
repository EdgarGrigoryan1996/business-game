import s from "./Tabs.module.css";
import AllShares from "./AllShares/AllShares.jsx";
import RealEstate from "./RealEstate/RealEstate.jsx";
import Business from "./Business/Business.jsx";
import { useState } from "react";

function Tabs({
  player,
  setPlayer,
  setSharePopupStatus,
  setRiskSharePopupStatus,
}) {
  const tabs = [
    {
      label: "Բաժնետոմսեր",
      content: (
        <AllShares
          player={player}
          setPlayer={setPlayer}
          setSharePopupStatus={setSharePopupStatus}
          setRiskSharePopupStatus={setRiskSharePopupStatus}
        />
      ),
    },
    {
      label: "Անշարժ գույք",
      content: <RealEstate player={player} setPlayer={setPlayer} />,
    },
    { label: "Բիզնեսներ", content: <Business /> },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className={s.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={s.tab + " " + `${index === activeTab ? s.active : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
}

export default Tabs;
