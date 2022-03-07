import { useTranslation } from "react-i18next";
import { answer } from "../../lib/generateAnswer";

const GameOver = ({ win, lose, isAnimation }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`notification container has-text-centered custom-game-over ${
        isAnimation ? "custom-flip-animation" : ""
      }`}
    >
      {win && (
        <>
          <span className="is-uppercase">{answer.name} </span>
          <span>{t("winMessage")}</span>
        </>
      )}
      {lose && (
        <>
          <span>{t("loseMessage")}</span>
          <span className="is-uppercase">{answer.name}</span>
        </>
      )}
    </div>
  );
};

export default GameOver;
