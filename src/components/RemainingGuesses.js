import pokeball from "../img/pokeball.png";
import { useTranslation } from "react-i18next";

const RemainingGuesses = ({ num }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="custom-input mb-1">
        <input className="input" type="text" placeholder={`${t("guessPlaceholderText")}${num}`} disabled />
        <button className={`button is-flex is-justify-content-center custom-start-btn`} disabled>
          <img className="custom-pokeball" src={pokeball} />
        </button>
      </div>
    </>
  );
};

export default RemainingGuesses;
