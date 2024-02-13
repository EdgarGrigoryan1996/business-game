import React from 'react';
import s from "./ShareSalePopup.module.css"
function PopupBtn({title,handleFunction,color,background}) {
    const styles = {
        color,
        background
    }
    return (
        <button
            className={s.popupBtn}
            style={styles}
            onClick={handleFunction}
        >
            {title}
        </button>
    );
}

export default PopupBtn;