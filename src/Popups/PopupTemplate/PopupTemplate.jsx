import s from "../ShareSalePopup.module.css";
import PopupBtn from "../PopupBtn.jsx";

function PopupTemplate({
  title,
  successTitle,
  cancelTitle,
  bigPopup,
  handleSuccess,
  handleCancel,
  children,
}) {
  return (
    <div className={s.popupWrapper}>
      <div className={bigPopup ? s.bigPopupBlock : s.popupBlock}>
        <div className={s.content}>
          <>
            <h4>{title}</h4>

            {children}

            <div className={s.btnBlock}>
              {handleSuccess && (
                <PopupBtn
                  title={successTitle}
                  color={"#fff"}
                  background={"#457b45"}
                  handleFunction={handleSuccess}
                />
              )}

              {handleCancel && (
                <PopupBtn
                  title={cancelTitle ? cancelTitle : "Չեղարկել"}
                  color={"#fff"}
                  background={"#d85555"}
                  handleFunction={handleCancel}
                />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default PopupTemplate;
