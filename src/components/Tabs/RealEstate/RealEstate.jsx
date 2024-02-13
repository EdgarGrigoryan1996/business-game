import React, { useState } from "react";
import s from "./RealEstate.module.css";
import { MdCancel, MdDelete, MdDone } from "react-icons/md";

import { FaDollarSign, FaPen } from "react-icons/fa";
import AddRealEstatePopup from "../../../Popups/AddRealEstatePopup/AddRealEstatePopup.jsx";

function RealEstate({ player, setPlayer }) {
  const [realEstatePopup, setRealEstatePopup] = useState(false);
  return (
    <div>
      <h5>Ժառանգություն</h5>
      {player.realEstate.length ? (
        <table className={s.realEstateTable}>
          <thead>
            <tr className={s.realEstateTitles}>
              <th>Սենյակ</th>
              <th>Վերանորոգվաժ</th>
              <th>Կենտրոն</th>
              <th>Պարտք</th>
              <th>Եկամուտ</th>
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
                      <FaPen />
                      <FaDollarSign />
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No Real Estate</div>
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
          setRealEstatePopup={setRealEstatePopup}
        />
      )}
    </div>
  );
}

export default RealEstate;
