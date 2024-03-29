import { useEffect, useState } from "react";
import g from "./globals.module.css";
import CreatePlayer from "./components/CreatePlayer/CreatePlayer.jsx";
import TopControl from "./components/TopControl/TopControl.jsx";
import Tabs from "./components/Tabs/Tabs.jsx";
import ShareSalePopup from "./Popups/ShareSalePopup.jsx";
import RiskSharePopup from "./Popups/RiskSharePopup/RiskSharePopup.jsx";
import CostPopup from "./Popups/CostPopup/CostPopup.jsx";
import CashHistoryPopup from "./Popups/CashHistoryPopup/CashHistoryPopup.jsx";
import GettingHousePopup from "./Popups/GettingHousePopup/GettingHousePopup.jsx";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState({
    riskDealCircleCount: 2,
    cashMoney: null,
    cashHistory: [],
    salary: null,
    passiveIncome: 0,
    monthlyIncome: null,
    monthlyExpenses: null,
    children: 0,
    loans: 0,
    shares: [
      {
        id: 1,
        title: "Adidas",
        balance: 0,
      },
      {
        id: 2,
        title: "Busy.am",
        balance: 0,
      },
      {
        id: 3,
        title: "Pepsi",
        balance: 0,
      },
      {
        id: 4,
        title: "ElitShin",
        balance: 0,
      },
    ],
    riskShares: [
      {
        id: 1,
        title: "Adidas",
        currentRiskDeal: [],
      },
      {
        id: 2,
        title: "Busy.am",
        currentRiskDeal: [],
      },
      {
        id: 3,
        title: "Pepsi",
        currentRiskDeal: [],
      },
      {
        id: 4,
        title: "ElitShin",
        currentRiskDeal: [],
      },
    ],
    realEstate: [
      {
        id: Math.random(),
        rooms: 2,
        renovated: true,
        inTheCenter: true,
        duty: 0,
        passiveIncome: 300,
      },
    ],
    business: [
      {
        id: Math.random(),
        name: "Business Name",
        passiveIncome: 500,
        duty: 5000,
      },
      {
        id: Math.random(),
        name: "Business Name",
        passiveIncome: 500,
        duty: 5000,
      },
      {
        id: Math.random(),
        name: "Business Name",
        passiveIncome: 500,
        duty: 500000,
      },
    ],
  });
  const [sharePopupStatus, setSharePopupStatus] = useState({
    status: false,
    mode: null,
    shareTitle: null,
    shareId: null,
  });
  const [riskSharePopupStatus, setRiskSharePopupStatus] = useState({
    status: false,
    buyMode: null,
    riskShareTitle: null,
    count: null,
    dealId: null,
    riskShareId: null,
    riskShareSellPrice: null,
  });
  const [costPopup, setCostPopup] = useState({
    status: false,
    costMode: null,
  });
  const [historyPopup, setHistoryPopup] = useState(false);
  const [gettingHomePopup, setGettingHomePopup] = useState(false);

  useEffect(() => {
    const loanPercent = (player.loans / 100) * 10;

    setPlayer({
      ...player,
      monthlyIncome:
        +player.salary +
        +player.passiveIncome -
        +player.monthlyExpenses -
        +(player.children * 200) -
        loanPercent,
    });
  }, [player.children, player.loans, player.passiveIncome]);

  useEffect(() => {
    if (player.children === 4) {
      setGettingHomePopup(true);
      setPlayer({
        ...player,
        realEstate: [
          ...player.realEstate,
          {
            id: Math.random(),
            rooms: 3,
            renovated: true,
            inTheCenter: true,
            duty: 0,
            passiveIncome: 600,
          },
        ],
      });
    }
  }, [player.children]);

  useEffect(() => {
    const realEstatesIncome = player.realEstate.reduce((aggr, val) => {
      return aggr + val.passiveIncome;
    }, 0);
    const businessIncome = player.business.reduce((aggr, val) => {
      return aggr + +val.passiveIncome;
    }, 0);
    setPlayer({
      ...player,
      passiveIncome: +realEstatesIncome + +businessIncome,
    });
  }, [player.realEstate, player.business, gameStarted]);
  if (!gameStarted) {
    return (
      <CreatePlayer
        player={player}
        setPlayer={setPlayer}
        setGameStarted={setGameStarted}
      />
    );
  }

  return (
    <div>
      <div className={g.topInfo}>
        <div className={g.topInfoItemBlock}>
          <button className={g.btn + " " + g.cashBtn}>
            <div
              onClick={() => {
                setHistoryPopup(true);
              }}
            >
              Կանխիկ
            </div>{" "}
            <span>{player.cashMoney}</span>
          </button>
        </div>
        <div className={g.topInfoItemBlock}>
          <button className={g.btn + " " + g.passiveBtn}>
            <div>Պասիվ</div> <span>{player.passiveIncome}</span>
          </button>
        </div>
        <div className={g.topInfoItemBlock}>
          <button
            className={g.btn + " " + g.salaryBtn}
            onClick={() => {
              setPlayer({
                ...player,
                cashMoney: +player.cashMoney + +player.monthlyIncome,
                cashHistory: [
                  ...player.cashHistory,
                  {
                    dealTitle: "Աշխ",
                    type: null,
                    dealCount: null,
                    dealPrice: null,
                    moneyBeforeDeal: player.cashMoney,
                    totalMoney: `+${+player.monthlyIncome}`,
                    moneyAfterDeal: player.cashMoney + +player.monthlyIncome,
                  },
                ],
              });
            }}
          >
            <div>Աշխատավարձ</div>
            <span>+ {player.monthlyIncome}</span>
          </button>
        </div>
      </div>

      <TopControl
        player={player}
        setPlayer={setPlayer}
        setCostPopup={setCostPopup}
      />
      <Tabs
        player={player}
        setPlayer={setPlayer}
        setSharePopupStatus={setSharePopupStatus}
        setRiskSharePopupStatus={setRiskSharePopupStatus}
      />

      {sharePopupStatus.status && (
        <ShareSalePopup
          player={player}
          setPlayer={setPlayer}
          buyMode={sharePopupStatus.mode}
          shareTitle={sharePopupStatus.shareTitle}
          shareId={sharePopupStatus.shareId}
          setSharePopupStatus={setSharePopupStatus}
        />
      )}
      {riskSharePopupStatus.status && (
        <RiskSharePopup
          player={player}
          setPlayer={setPlayer}
          buyMode={riskSharePopupStatus.buyMode}
          riskShareTitle={riskSharePopupStatus.riskShareTitle}
          riskShareId={riskSharePopupStatus.riskShareId}
          sellCount={riskSharePopupStatus.count}
          dealId={riskSharePopupStatus.dealId}
          dealSellPrice={riskSharePopupStatus.riskShareSellPrice}
          setRiskSharePopupStatus={setRiskSharePopupStatus}
        />
      )}
      {costPopup.status && (
        <CostPopup
          player={player}
          setPlayer={setPlayer}
          setCostPopup={setCostPopup}
          costMode={costPopup.costMode}
        />
      )}
      {historyPopup && (
        <CashHistoryPopup player={player} setPopup={setHistoryPopup} />
      )}
      {gettingHomePopup && <GettingHousePopup setPopup={setGettingHomePopup} />}
    </div>
  );
}
