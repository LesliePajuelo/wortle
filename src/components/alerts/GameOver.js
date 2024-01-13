import { useTranslation } from "react-i18next";

const GameOver = ({ win, lose, isAnimation, isAnswer }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`notification container has-text-centered custom-game-over ${
        isAnimation ? "custom-flip-animation" : ""
      }`}
    >
      {win && (
        <>
          <span className="is-uppercase">{isAnswer.name} </span>
          <span>{t("winMessage")}</span>
        </>
      )}
      {lose && (
        <>
          <span>{t("loseMessage")}</span>
          <span className="is-uppercase">{isAnswer.name}</span>
        </>
      )}
    </div>
  );
};

export default GameOver;
