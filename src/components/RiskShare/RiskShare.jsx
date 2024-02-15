import React, { useEffect } from "react";
import s from "./RiskShare.module.css";
import { CiShoppingCart } from "react-icons/ci";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { SlRefresh } from "react-icons/sl";

function RiskShare({ player, setPlayer, setRiskSharePopupStatus }) {
  const changeDealCircle = (share, deal) => {
    if (deal.currentCircle !== 0) {
      setPlayer({
        ...player,
        riskShares: player.riskShares.map((riskShare) => {
          if (riskShare.id === share.id) {
            return {
              ...riskShare,
              currentRiskDeal: riskShare.currentRiskDeal.map((d) => {
                if (d.id === deal.id) {
                  return {
                    ...d,
                    currentCircle: d.currentCircle - 1,
                  };
                } else {
                  return d;
                }
              }),
            };
          } else {
            return riskShare;
          }
        }),
      });
    } else {
      setPlayer({
        ...player,
        riskShares: player.riskShares.map((riskShare) => {
          if (riskShare.id === share.id) {
            return {
              ...riskShare,
              currentRiskDeal: riskShare.currentRiskDeal.filter((d) => {
                return d.id !== deal.id;
              }),
            };
          } else {
            return riskShare;
          }
        }),
      });
    }
  };
  const toggleDealControls = (share, deal) => {
    setPlayer({
      ...player,
      riskShares: player.riskShares.map((riskShare) => {
        if (riskShare.id === share.id) {
          return {
            ...riskShare,
            currentRiskDeal: riskShare.currentRiskDeal.map((d) => {
              if (d.id === deal.id) {
                return {
                  ...d,
                  controlsStatus: !d.controlsStatus,
                };
              } else {
                return d;
              }
            }),
          };
        } else {
          return riskShare;
        }
      }),
    });
  };
  return (
    <div>
      <h5>Ռիսկային Բաժմետոմսեր</h5>
      <div>
        {player.riskShares.map((share) => {
          return (
            <div key={share.id} className={s.riskShareBlock}>
              <div className={s.riskShareTitle}>{share.title}</div>
              {!share.currentRiskDeal.length ? (
                <div className={s.noDeal}>Չունեք ռիսկային ակցիաներ</div>
              ) : (
                share.currentRiskDeal.map((deal) => {
                  return (
                    <div
                      key={deal.id}
                      className={s.dealBlock}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDealControls(share, deal);
                      }}
                    >
                      <span className={s.currentCircleCount}>
                        {deal.currentCircle}
                      </span>
                      {deal.controlsStatus && (
                        <>
                          <span
                            className={s.circleCount}
                            onClick={(e) => {
                              e.stopPropagation();
                              changeDealCircle(share, deal);
                            }}
                          >
                            <SlRefresh color={"#fff"} size={16} />
                          </span>

                          <span
                            className={s.sellBtn}
                            onClick={() => {
                              setRiskSharePopupStatus({
                                status: true,
                                buyMode: false,
                                riskShareTitle: share.title,
                                riskShareId: share.id,
                                dealId: deal.id,
                                riskShareSellPrice: deal.sellPrice,
                                count: deal.count,
                              });
                            }}
                          >
                            <LiaHandHoldingUsdSolid color={"#fff"} size={16} />
                          </span>
                        </>
                      )}

                      <span>{deal.count}</span>
                      <span>/</span>
                      <span>{deal.sellPrice}$</span>
                    </div>
                  );
                })
              )}
              <span
                className={s.buyBtn}
                onClick={() => {
                  setRiskSharePopupStatus({
                    status: true,
                    buyMode: true,
                    riskShareTitle: share.title,
                    riskShareId: share.id,
                    riskShareSellPrice: null,
                  });
                }}
              >
                <CiShoppingCart color={"#06442D"} size={28} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RiskShare;
