import React from "react";
import s from "../ShareSalePopup.module.css";
import PopupBtn from "../PopupBtn.jsx";


function PopupTemplate({
  title,
  successTitle,
  handleSuccess,
  handleCancel,
  children,
}) {
  return (
    <div className={s.popupWrapper}>
      <div className={s.popupBlock}>
        <div className={s.content}>
          <>
            <h4>{title}</h4>

            {children}

            <div className={s.btnBlock}>
              <PopupBtn
                title={successTitle}
                color={"#fff"}
                background={"#217821"}
                handleFunction={handleSuccess}
              />
              <PopupBtn
                title={"Չեղարկել"}
                color={"#fff"}
                background={"#d53838"}
                handleFunction={handleCancel}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default PopupTemplate;
