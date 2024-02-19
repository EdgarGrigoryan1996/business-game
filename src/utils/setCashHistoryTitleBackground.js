const setCashHistoryTitleBackground = (title) => {
  if (title === "Աշխ") {
    return "#FFA500";
  } else if (title === "Ծախս") {
    return "#191919";
  } else if (title === "Վաճ") {
    return "#20B734";
  } else if (title === "Առք") {
    return "#C53434";
  } else if (title === "Մուտք") {
    return "#ed8147";
  }
};

export default setCashHistoryTitleBackground;
