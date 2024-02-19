import PopupTemplate from "../PopupTemplate/PopupTemplate.jsx";
import s from "./GettingHomePopup.module.css";
import salut from "../../assets/lottieData/salut.json";
import homeIcon from "../../assets/home.png";
import MyLottie from "../../components/MyLottie/MyLottie.jsx";
function GettingHousePopup({ setPopup }) {
  return (
    <PopupTemplate
      title={"Շնորհավորում ենք"}
      successTitle={"Փակել"}
      handleSuccess={() => setPopup(false)}
    >
      <div className={s.gettingHomeContent}>
        <img src={homeIcon} alt="Home" />
        <div className={s.gettingHomeText}>Դուք ստացել եք բնակարան</div>
        <div className={s.salut1}>
          <MyLottie data={salut} width={250} height={250} />
        </div>
        <div className={s.salut2}>
          <MyLottie data={salut} width={150} height={150} />
        </div>
      </div>
    </PopupTemplate>
  );
}

export default GettingHousePopup;
